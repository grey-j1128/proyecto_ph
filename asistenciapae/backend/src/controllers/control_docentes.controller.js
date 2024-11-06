import executeQuery from "../db/dbHelper.js";

/**
 * Función para obtener todos los registros de control_docentes
 * @returns {Array} - Lista de registros
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const getControlDocentes = async () => {
  const query =
    "SELECT * FROM control_docentes ORDER BY id_control_docentes ASC";
  return await executeQuery(query);
};

/**
 * Función para obtener un registro de control_docentes por su ID
 * @param {number} idControlDocente - ID del registro
 * @returns {Array} - Detalles del registro
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const getControlDocente = async (idControlDocente) => {
  const query = "SELECT * FROM control_docentes WHERE id_control_docentes = $1";
  const result = await executeQuery(query, [idControlDocente]);
  if (result.length === 0)
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Registro con ID ${idControlDocente} no encontrado.`,
    };
  return result;
};

/**
 * Función para insertar un nuevo registro en control_docentes
 * @param {string} hora - Hora del registro
 * @param {string} fecha - Fecha del registro
 * @param {number} id_docentes - ID del docente asociado
 * @returns {Array} - ID del registro insertado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const insertControlDocente = async (hora, fecha, id_docentes) => {
  const query = `INSERT INTO control_docentes (hora, fecha, id_docentes) 
                   VALUES ($1, $2, $3) RETURNING id_control_docentes;`;
  try {
    return await executeQuery(query, [hora, fecha, id_docentes]);
  } catch (error) {
    if (error.message.search("control_docentes_docentes_fk") > -1) {
      throw {
        name: "Custom error",
        statusCode: 422,
        message: `El id_docentes=${id_docentes} no existe.`,
      };
    }
    throw error;
  }
};

/**
 * Función para actualizar un registro en control_docentes por su ID
 * @param {number} idControlDocente - ID del registro
 * @param {string} hora - Nueva hora del registro
 * @param {string} fecha - Nueva fecha del registro
 * @param {number} id_docentes - Nuevo ID del docente asociado
 * @returns {Array} - Datos del registro actualizado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const updateControlDocente = async (
  idControlDocente,
  hora,
  fecha,
  id_docentes
) => {
  const query = `UPDATE control_docentes 
                   SET hora = $2, fecha = $3, id_docentes = $4 
                   WHERE id_control_docentes = $1 RETURNING *;`;
  try {
    const result = await executeQuery(query, [
      idControlDocente,
      hora,
      fecha,
      id_docentes,
    ]);
    if (result.length === 0)
      throw {
        name: "Custom error",
        statusCode: 404,
        message: `Registro con ID ${idControlDocente} no encontrado.`,
      };
    return result;
  } catch (error) {
    if (error.message.search("control_docentes_docentes_fk") > -1) {
      throw {
        name: "Custom error",
        statusCode: 422,
        message: `El id_docentes=${id_docentes} no existe.`,
      };
    }
    throw error;
  }
};

/**
 * Función para eliminar un registro en control_docentes por su ID
 * @param {number} idControlDocente - ID del registro
 * @returns {Array} - Datos del registro eliminado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const deleteControlDocente = async (idControlDocente) => {
  const query =
    "DELETE FROM control_docentes WHERE id_control_docentes = $1 RETURNING *;";
  const result = await executeQuery(query, [idControlDocente]);
  if (result.length === 0)
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Registro con ID ${idControlDocente} no encontrado.`,
    };
  return result;
};
