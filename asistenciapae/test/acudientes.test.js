const BASE_URL = 'http://localhost:9000';

let authToken = '';

async function makeRequest(method, path, data = null) {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'token': authToken
    }
  };

  let url = `${BASE_URL}${path}`;
  if (method === 'GET' && data) {
    const params = new URLSearchParams(data);
    url += `?${params.toString()}`;
  } else if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  return {
    statusCode: response.status,
    body: await response.json(),
  };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function login() {
  const loginData = {
    usuario: "Administrador",
    pass: "123"
  };
  const response = await makeRequest('POST', '/login', loginData);
  assert(response.statusCode === 200, 'El login debería ser exitoso');
  assert(response.body.token, 'La respuesta debería contener un token');
  
  authToken = response.body.token;
}

async function testGetAcudientes() {
  const response = await makeRequest('GET', '/acudientes');
  assert(response.body.success === true, 'La petición debería ser exitosa');
  assert(Array.isArray(response.body.message), 'La respuesta debería ser un array');
}

async function testGetAcudiente() {
  const response = await makeRequest('GET', '/acudiente/1');
  assert(response.body.success === true, `La petición debería ser exitosa. El error recibido es '${response.body.message}' `);
  assert(response.body.message.id === 1, 'El ID del acudiente debería ser 1');
}

async function testInsertAcudiente() {
  const acudienteData = {
    TipoDoc_Acudiente: 'CC',
    Numero_Doc_Acudiente: '1234567890',
    Nombre_Completo: 'Juan Pérez',
    Direccion: 'Calle 123',
    Telefono: '1234567',
    Email: 'juan@example.com',
    id_Parentesco: 2
  };
  
  const response = await makeRequest('POST', '/acudiente', acudienteData);
  assert(response.body.success === true, `La inserción debería ser exitosa. El error recibido es '${response.body.message}' `);
  assert(response.body.message.Nombre_Completo === 'Juan Pérez', 'El nombre del acudiente insertado debería ser Juan Pérez');
}

async function testUpdateAcudiente() {
  const acudienteData = {
    TipoDoc_Acudiente: 'CC',
    Numero_Doc_Acudiente: '1234567890',
    Nombre_Completo: 'Juan Pérez Actualizado',
    Direccion: 'Calle 456',
    Telefono: '7654321',
    Email: 'juan_actualizado@example.com',
    id_Parentesco: 2
  };
  
  const response = await makeRequest('PUT', '/acudiente/1', acudienteData);
  assert(response.body.success === true, `La actualización debería ser exitosa. El error recibido es '${response.body.message}' `);
  assert(response.body.message === 'Update OK', 'El mensaje debería ser "Update OK"');
}

async function testDeleteAcudiente() {
  const response = await makeRequest('DELETE', '/acudiente/1');
  assert(response.body.success === true, `El borrado debería ser exitoso. El error recibido es '${response.body.message}' `);
  assert(response.body.message === 'Delete OK', 'El mensaje debería ser "Delete OK"');
}

async function runTests() {
  const tests = [
    login,
    testGetAcudientes,
    testGetAcudiente,
    testInsertAcudiente,
    testUpdateAcudiente,
    testDeleteAcudiente
  ];

  let passedTests = 0;
  let failedTests = 0;

  for (const test of tests) {
    try {
      await test();
      console.log(`✅ Prueba ${test.name} pasó exitosamente`);
      passedTests++;
    } catch (error) {
      console.error(`❌ Error en ${test.name}:`, error.message);
      failedTests++;
    }
  }

  console.log(`\nResumen de pruebas:`);
  console.log(`Pruebas pasadas: ${passedTests}`);
  console.log(`Pruebas fallidas: ${failedTests}`);
}

runTests();