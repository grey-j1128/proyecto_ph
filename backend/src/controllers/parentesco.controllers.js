import executeQuery from "../db/dbHelper.js";

/**
 * Función para obtener todos los parentescos
 * @returns {Array} - Lista de parentescos
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const getParentescos = async () => {
    const query = "SELECT id_parentesco, nombre FROM parentesco ORDER BY id_parentesco ASC";
    try {
        return await executeQuery(query);
    } catch (error) {
        throw new Error(`Error al ejecutar consulta de Parentesco: ${error.stack}`);
    }
};

/**
 * Función para obtener un parentesco por su ID
 * @param {number} idParentesco - ID del parentesco
 * @returns {Array} - Detalles del parentesco
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const getParentesco = async (idParentesco) => {
    const query = "SELECT id_parentesco, nombre FROM parentesco WHERE id_parentesco = $1";
    try {
        return await executeQuery(query, [idParentesco]);
    } catch (error) {
        throw new Error(`Error al ejecutar consulta de Parentesco con idParentesco=${idParentesco}: ${error.stack}`);
    }
};

/**
 * Función para insertar un nuevo parentesco
 * @param {string} NombreParentesco - Nombre del parentesco
 * @returns {Array} - ID del parentesco insertado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const insertParentesco = async (NombreParentesco) => {
    const query = "INSERT INTO parentesco (nombre) VALUES ($1) RETURNING id_parentesco;";
    try {
        return await executeQuery(query, [NombreParentesco]);
    } catch (error) {
        throw new Error(`Error al ejecutar inserción de Parentesco con NombreParentesco=${NombreParentesco}: ${error.stack}`);
    }
};

/**
 * Función para actualizar un parentesco por su ID
 * @param {number} idParentesco - ID del parentesco
 * @param {string} NombreParentesco - Nuevo nombre del parentesco
 * @returns {Array} - Datos del parentesco actualizado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const updateParentesco = async (idParentesco, NombreParentesco) => {
    const query = "UPDATE parentesco SET nombre = $2 WHERE id_parentesco = $1 RETURNING *;";
    try {
        return await executeQuery(query, [idParentesco, NombreParentesco]);
    } catch (error) {
        throw new Error(`Error al ejecutar actualización de Parentesco con idParentesco=${idParentesco}: ${error.stack}`);
    }
};

/**
 * Función para eliminar un parentesco por su ID
 * @param {number} idParentesco - ID del parentesco
 * @returns {Array} - Datos del parentesco eliminado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const deleteParentesco = async (idParentesco) => {
    const query = "DELETE FROM parentesco WHERE id_parentesco = $1 RETURNING *;";
    try {
        return await executeQuery(query, [idParentesco]);
    } catch (error) {
        throw new Error(`Error al ejecutar borrado de Parentesco con idParentesco=${idParentesco}: ${error.stack}`);
    }
};
