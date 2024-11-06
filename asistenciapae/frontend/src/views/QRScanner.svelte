<script>
  import { API_URL } from '../config.js';
  import { onMount, onDestroy } from 'svelte';
  import { Html5QrcodeScanner } from "html5-qrcode"; // Asegúrate de tener instalada la librería: npm install html5-qrcode

  let scanner; // Referencia al escáner
  let qrCodeMessage = '';
  let colorAsistencia = "";
  let ultimoEstudiante = "";

  async function consultarEstudiante(numDocumento) {
    try {
            const token = localStorage.getItem('token');
            const payload = {
            numDocumento: numDocumento
            };
            const response = await fetch(`${API_URL}/registrarAsistencia`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token ? `${token}` : ''
                },
                body: JSON.stringify(payload)
            });

            if (response.status == 200) {
                const data = await response.json();
                qrCodeMessage = `${data.message}`;
                colorAsistencia = "green"
            } else if (response.status == 404) {
                const errorData = await response.json();
                qrCodeMessage = `${errorData.message}`;
                colorAsistencia = "red";
            } else if (response.status == 401) {
                const errorData = await response.json();
                qrCodeMessage = `${errorData.message}`;
                colorAsistencia = "yellow";
            }
        } catch (error) {
            console.error('Error en la petición de asistencia:', error);
            alert('Error al conectar con el servidor. Intenta de nuevo más tarde.');
        }
  }

  // Función para manejar el éxito de la lectura del QR
  async function onScanSuccess(qrCodeValue) {
    if (ultimoEstudiante !== qrCodeValue) {
        console.log('Código QR escaneado:', qrCodeValue);        
        consultarEstudiante(qrCodeValue)
        ultimoEstudiante = qrCodeValue
    }
  }
  onMount(() => {
      // Configuración del escáner QR
      scanner = new Html5QrcodeScanner(
          "qr-reader", // ID del contenedor donde se mostrará el escáner
          { 
              fps: 10, // Frames por segundo
              qrbox: { width: 250, height: 250 } // Tamaño del área de escaneo
          }, 
          false // No abrir el selector de cámara automáticamente
      );

      // Iniciar el escaneo con la función de éxito 
      scanner.render(onScanSuccess);
  });

  onDestroy(() => {
      // Limpiar el escáner cuando se destruya el componente
      if (scanner) {
          scanner.clear().catch(error => console.error('Error al limpiar el escáner:', error));
      }
  });
</script>

<style>
  .qr-scanner-container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 20px;
  }

  #qr-reader {
      width: 100%;
      max-width: 400px;
  }

  #qr-reader__dashboard_section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }

  .qr-scanner-container button {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
  }

  .qr-scanner-container button:hover {
      background-color: #0056b3;
  }
</style>

<div class="qr-scanner-container">
  Número de documento: <input id="numdoc"><button on:click={() => consultarEstudiante(document.getElementById("numdoc").value)}>Consultar Estudiante</button>
  <div id="qr-reader"></div> <!-- Aquí se muestra el escáner QR -->
  {#if qrCodeMessage}
      <p style="color: {colorAsistencia};">{qrCodeMessage}</p>
  {/if}
</div>