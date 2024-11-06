import executeQuery from "../db/dbHelper.js";

/**
 * Función para obtener todos los tipos de funcionario
 * @returns {Array} - Lista de tipos de funcionario
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const getTiposFuncionarios = async () => {
    const query = "SELECT id_tipo_funcionario, nombre FROM tipo_funcionario ORDER BY id_tipo_funcionario ASC";
    try {
        return await executeQuery(query);
    } catch (error) {
        throw new Error(`Error al ejecutar consulta de TipoFuncionario: ${error.stack}`);
    }
};

/**
 * Función para obtener un tipo de funcionario por su ID
 * @param {number} idTipoFuncionario - ID del tipo de funcionario
 * @returns {Array} - Detalles del tipo de funcionario
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const getTipoFuncionario = async (idTipoFuncionario) => {
    const query = "SELECT id_tipo_funcionario, nombre FROM tipo_funcionario WHERE id_tipo_funcionario = $1";
    try {
        return await executeQuery(query, [idTipoFuncionario]);
    } catch (error) {
        throw new Error(`Error al ejecutar consulta de TipoFuncionario con idTipoFuncionario=${idTipoFuncionario}: ${error.stack}`);
    }
};

/**
 * Función para insertar un nuevo tipo de funcionario
 * @param {string} NombreTipoFuncionario - Nombre del tipo de funcionario
 * @returns {Array} - ID del tipo de funcionario insertado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const insertTipoFuncionario = async (NombreTipoFuncionario) => {
    const query = "INSERT INTO tipo_funcionario (nombre) VALUES ($1) RETURNING id_tipo_funcionario;";
    try {
        return await executeQuery(query, [NombreTipoFuncionario]);
    } catch (error) {
        throw new Error(`Error al ejecutar inserción de TipoFuncionario con NombreTipoFuncionario=${NombreTipoFuncionario}: ${error.stack}`);
    }
};

/**
 * Función para actualizar un tipo de funcionario por su ID
 * @param {number} idTipoFuncionario - ID del tipo de funcionario
 * @param {string} NombreTipoFuncionario - Nuevo nombre del tipo de funcionario
 * @returns {Array} - Datos del tipo de funcionario actualizado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const updateTipoFuncionario = async (idTipoFuncionario, NombreTipoFuncionario) => {
    const query = "UPDATE tipo_funcionario SET nombre = $2 WHERE id_tipo_funcionario = $1 RETURNING *;";
    try {
        return await executeQuery(query, [idTipoFuncionario, NombreTipoFuncionario]);
    } catch (error) {
        throw new Error(`Error al ejecutar actualización de TipoFuncionario con idTipoFuncionario=${idTipoFuncionario}: ${error.stack}`);
    }
};

/**
 * Función para eliminar un tipo de funcionario por su ID
 * @param {number} idTipoFuncionario - ID del tipo de funcionario
 * @returns {Array} - Datos del tipo de funcionario eliminado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const deleteTipoFuncionario = async (idTipoFuncionario) => {
    const query = "DELETE FROM tipo_funcionario WHERE id_tipo_funcionario = $1 RETURNING *;";
    try {
        return await executeQuery(query, [idTipoFuncionario]);
    } catch (error) {
        throw new Error(`Error al ejecutar borrado de TipoFuncionario con idTipoFuncionario=${idTipoFuncionario}: ${error.stack}`);
    }
};
