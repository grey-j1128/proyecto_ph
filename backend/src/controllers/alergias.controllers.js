import executeQuery from "../db/dbHelper.js";

/**
 * Función para obtener todas las alergias
 * @returns {Array} - Lista de alergias
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const getAlergias = async () => {
    const query = "SELECT id_alergia, Nombre_alergia FROM alergias ORDER BY id_alergia ASC";
    try {
        return await executeQuery(query);
    } catch (error) {
        throw new Error(`Error al ejecutar consulta de alergias: ${error.stack}`);
    }
};

/**
 * Función para obtener una alergia por su ID
 * @param {number} idAlergia - ID de la alergia
 * @returns {Array} - Detalles de la alergia
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const getAlergia = async (idAlergia) => {
    const query = "SELECT id_alergia, Nombre_alergia FROM alergias WHERE id_alergia = $1";
    try {
        return await executeQuery(query, [idAlergia]);
    } catch (error) {
        throw new Error(`Error al ejecutar consulta de alergia con idAlergia=${idAlergia}: ${error.stack}`);
    }
};

/**
 * Función para insertar una nueva alergia
 * @param {string} NombreAlergia - Nombre de la alergia
 * @returns {Array} - ID de la alergia insertada
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const insertAlergia = async (NombreAlergia) => {
    const query = "INSERT INTO alergias (nombre_alergia) VALUES ($1) RETURNING id_alergia;";
    try {
        return await executeQuery(query, [NombreAlergia]);
    } catch (error) {
        throw new Error(`Error al ejecutar inserción de alergia con NombreAlergia=${NombreAlergia}: ${error.stack}`);
    }
};

/**
 * Función para actualizar una alergia por su ID
 * @param {number} idAlergia - ID de la alergia
 * @param {string} NombreAlergia - Nuevo nombre de la alergia
 * @returns {Array} - Datos de la alergia actualizada
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const updateAlergia = async (idAlergia, NombreAlergia) => {
    const query = "UPDATE alergias SET nombre_alergia = $2 WHERE id_alergia = $1 RETURNING *;";
    try {
        return await executeQuery(query, [idAlergia, NombreAlergia]);
    } catch (error) {
        throw new Error(`Error al ejecutar actualización de alergia con idAlergia=${idAlergia}: ${error.stack}`);
    }
};

/**
 * Función para eliminar una alergia por su ID
 * @param {number} idAlergia - ID de la alergia
 * @returns {Array} - Datos de la alergia eliminada
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const deleteAlergia = async (idAlergia) => {
    const query = "DELETE FROM alergias WHERE id_alergia = $1 RETURNING *;";
    try {
        return await executeQuery(query, [idAlergia]);
    } catch (error) {
        throw new Error(`Error al ejecutar borrado de alergia con idAlergia=${idAlergia}: ${error.stack}`);
    }
};
