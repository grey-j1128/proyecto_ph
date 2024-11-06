import executeQuery from "../db/dbHelper.js";

/**
 * Función para obtener todos los tipos de resultados
 * @returns {Array} - Lista de tipos de resultados
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const getTipoResultados = async () => {
    const query = "SELECT id_tipo_resultados, nombre, puntuancion_real FROM tipo_resultados ORDER BY id_tipo_resultados ASC";
    try {
        return await executeQuery(query);
    } catch (error) {
        throw new Error(`Error al ejecutar consulta de Tipo Resultado: ${error.stack}`);
    }
};

/**
 * Función para obtener un tipo de resultado por su ID
 * @param {number} idTipoResultado - ID del tipo de resultado
 * @returns {Array} - Detalles del tipo de resultado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const getTipoResultado = async (idTipoResultado) => {
    const query = "SELECT id_tipo_resultados, nombre, puntuancion_real FROM tipo_resultados WHERE id_tipo_resultados = $1";
    try {
        return await executeQuery(query, [idTipoResultado]);
    } catch (error) {
        throw new Error(`Error al ejecutar consulta de Tipo Resultado con idTipoResultado=${idTipoResultado}: ${error.stack}`);
    }
};

/**
 * Función para insertar un nuevo tipo de resultado
 * @param {string} Nombre - Nombre del tipo de resultado
 * @param {number} PuntuancionReal - Puntuación real del tipo de resultado
 * @returns {Array} - ID del tipo de resultado insertado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const insertTipoResultado = async (Nombre, PuntuancionReal) => {
    const query = "INSERT INTO tipo_resultados (nombre, puntuancion_real) VALUES ($1, $2) RETURNING id_tipo_resultados;";
    try {
        return await executeQuery(query, [Nombre, PuntuancionReal]);
    } catch (error) {
        throw new Error(`Error al ejecutar inserción de Tipo Resultado con Nombre=${Nombre} y PuntuancionReal=${PuntuancionReal}: ${error.stack}`);
    }
};

/**
 * Función para actualizar un tipo de resultado por su ID
 * @param {number} idTipoResultado - ID del tipo de resultado
 * @param {string} Nombre - Nuevo nombre del tipo de resultado
 * @param {number} PuntuancionReal - Nueva puntuación real del tipo de resultado
 * @returns {Array} - Datos del tipo de resultado actualizado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const updateTipoResultado = async (idTipoResultado, Nombre, PuntuancionReal) => {
    const query = "UPDATE tipo_resultados SET nombre = $2, puntuancion_real = $3 WHERE id_tipo_resultados = $1 RETURNING *;";
    try {
        return await executeQuery(query, [idTipoResultado, Nombre, PuntuancionReal]);
    } catch (error) {
        throw new Error(`Error al ejecutar actualización de Tipo Resultado con idTipoResultado=${idTipoResultado}, Nombre=${Nombre} y PuntuancionReal=${PuntuancionReal}: ${error.stack}`);
    }
};

/**
 * Función para eliminar un tipo de resultado por su ID
 * @param {number} idTipoResultado - ID del tipo de resultado a eliminar
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const deleteTipoResultado = async (idTipoResultado) => {
    const query = "DELETE FROM tipo_resultados WHERE id_tipo_resultados = $1";
    try {
        await executeQuery(query, [idTipoResultado]);
    } catch (error) {
        throw new Error(`Error al eliminar Tipo Resultado con idTipoResultado=${idTipoResultado}: ${error.stack}`);
    }
};