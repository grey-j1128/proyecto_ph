import executeQuery from "../db/dbHelper.js";

/**
 * Función para obtener todos los parámetros
 */
export const getParametros = async () => {
    const query = "SELECT id_parametro, nombre_parametro, descripcion_parametro, valor_parametro FROM parametro ORDER BY id_parametro ASC";
    try {
        return await executeQuery(query);
    } catch (error) {
        throw new Error(`Error al ejecutar consulta de Parametro: ${error.stack}`);
    }
};

/**
 * Función para obtener un parámetro por su ID
 */
export const getParametro = async (idParametro) => {
    const query = "SELECT id_parametro, nombre_parametro, descripcion_parametro, valor_parametro FROM parametro WHERE id_parametro = $1";
    try {
        return await executeQuery(query, [idParametro]);
    } catch (error) {
        throw new Error(`Error al ejecutar consulta de Parametro con idParametro=${idParametro}: ${error.stack}`);
    }
};

/**
 * Función para insertar un nuevo parámetro
 */
export const insertParametro = async (nombre, descripcion, valor) => {
    const query = "INSERT INTO parametro (nombre_parametro, descripcion_parametro, valor_parametro) VALUES ($1, $2, $3) RETURNING id_parametro;";
    try {
        return await executeQuery(query, [nombre, descripcion, valor]);
    } catch (error) {
        throw new Error(`Error al ejecutar inserción de Parametro: ${error.stack}`);
    }
};

/**
 * Función para actualizar un parámetro por su ID
 */
export const updateParametro = async (idParametro, nombre, descripcion, valor) => {
    const query = "UPDATE parametro SET nombre_parametro = $2, descripcion_parametro = $3, valor_parametro = $4 WHERE id_parametro = $1 RETURNING *;";
    try {
        return await executeQuery(query, [idParametro, nombre, descripcion, valor]);
    } catch (error) {
        throw new Error(`Error al ejecutar actualización de Parametro: ${error.stack}`);
    }
};

/**
 * Función para eliminar un parámetro por su ID
 */
export const deleteParametro = async (idParametro) => {
    const query = "DELETE FROM parametro WHERE id_parametro = $1 RETURNING *;";
    try {
        return await executeQuery(query, [idParametro]);
    } catch (error) {
        throw new Error(`Error al ejecutar borrado de Parametro con idParametro=${idParametro}: ${error.stack}`);
    }
};
