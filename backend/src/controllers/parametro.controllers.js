import executeQuery from "../db/dbHelper.js";

/**
 * Función para obtener todos los parámetros
 * @returns {Array} - Lista de parámetros
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const getParametros = async () => {
  const query =
    "SELECT id_parametro, nombre_parametro, descripcion_parametro, valor_parametro FROM parametro ORDER BY id_parametro ASC";
  try {
    return await executeQuery(query);
  } catch (error) {
    throw new Error(`Error al ejecutar consulta de Parámetro: ${error.stack}`);
  }
};

/**
 * Función para obtener un parámetro por su ID
 * @param {number} idParametro - ID del parámetro
 * @returns {Array} - Detalles del parámetro
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const getParametro = async (idParametro) => {
  const query =
    "SELECT id_parametro, nombre_parametro, descripcion_parametro, valor_parametro FROM parametro WHERE id_parametro = $1";
  try {
    return await executeQuery(query, [idParametro]);
  } catch (error) {
    throw new Error(
      `Error al ejecutar consulta de Parámetro con idParametro=${idParametro}: ${error.stack}`
    );
  }
};

/**
 * Función para insertar un nuevo parámetro
 * @param {string} nombre_parametro - Nombre del parámetro
 * @param {string} descripcion_parametro - Descripción del parámetro
 * @param {number} valor_parametro - Valor del parámetro
 * @returns {Array} - ID del parámetro insertado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const insertParametro = async (
  nombre_parametro,
  descripcion_parametro,
  valor_parametro
) => {
  const query =
    "INSERT INTO parametro (nombre_parametro, descripcion_parametro, valor_parametro) VALUES ($1, $2, $3) RETURNING id_parametro;";
  try {
    return await executeQuery(query, [
      nombre_parametro,
      descripcion_parametro,
      valor_parametro,
    ]);
  } catch (error) {
    throw new Error(`Error al ejecutar inserción de Parámetro: ${error.stack}`);
  }
};

/**
 * Función para actualizar un parámetro por su ID
 * @param {number} idParametro - ID del parámetro
 * @param {string} nombre_parametro - Nuevo nombre del parámetro
 * @param {string} descripcion_parametro - Nueva descripción del parámetro
 * @param {number} valor_parametro - Nuevo valor del parámetro
 * @returns {Array} - Datos del parámetro actualizado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const updateParametro = async (
  idParametro,
  nombre_parametro,
  descripcion_parametro,
  valor_parametro
) => {
  const query =
    "UPDATE parametro SET nombre_parametro = $2, descripcion_parametro = $3, valor_parametro = $4 WHERE id_parametro = $1 RETURNING *;";
  try {
    return await executeQuery(query, [
      idParametro,
      nombre_parametro,
      descripcion_parametro,
      valor_parametro,
    ]);
  } catch (error) {
    throw new Error(
      `Error al ejecutar actualización de Parámetro: ${error.stack}`
    );
  }
};

/**
 * Función para eliminar un parámetro por su ID
 * @param {number} idParametro - ID del parámetro
 * @returns {Array} - Datos del parámetro eliminado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const deleteParametro = async (idParametro) => {
  const query = "DELETE FROM parametro WHERE id_parametro = $1 RETURNING *;";
  try {
    return await executeQuery(query, [idParametro]);
  } catch (error) {
    throw new Error(`Error al ejecutar borrado de Parámetro: ${error.stack}`);
  }
};
