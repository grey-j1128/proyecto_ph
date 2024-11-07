import executeQuery from "../db/dbHelper.js"; 

export const getAcudientes = async () => {
    const query = "SELECT * FROM acudientes ORDER BY id_acudiente ASC";
    return await executeQuery(query);
}

export const getAcudiente = async (idAcudiente) => {
    const query = "SELECT * FROM acudientes WHERE id_acudiente = $1";
    const result = await executeQuery(query, [idAcudiente]);
    if (result.length === 0) 
        throw { name: "Custom error", statusCode: 404, message: `Acudiente con ID ${idAcudiente} no encontrado.`};
    return result;
}

export const insertAcudiente = async (TipoDoc_Acudiente, Numero_Doc_Acudiente, Nombre_Completo, Direccion, Telefono, Email, id_Parentesco) => {
    const query = `INSERT INTO acudientes 
                   (TipoDoc_Acudiente, Numero_Doc_Acudiente, Nombre_Completo, Direccion, Telefono, Email, id_Parentesco) 
                   VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_acudiente;`;

    try {
        return await executeQuery(query, [TipoDoc_Acudiente, Numero_Doc_Acudiente, Nombre_Completo, Direccion, Telefono, Email, id_Parentesco]);
    } catch (error) {
        if (error.message.search("uk_acudiente")>-1) {
            throw { name: "Custom error", statusCode: 409, message: `Acudiente con Documento ${TipoDoc_Acudiente}-${Numero_Doc_Acudiente} ya existe.` };
        }
        if (error.message.search("ref_acudientes_to_parentesco")>-1) {
            throw { name: "Custom error", statusCode: 422, message: `El id_Parentesco=${id_Parentesco} no existe.` };
        }
        throw error;
    }
}

export const updateAcudiente = async (idAcudiente, TipoDoc_Acudiente, Numero_Doc_Acudiente, Nombre_Completo, Direccion, Telefono, Email, id_Parentesco) => {
    const query = `UPDATE acudientes 
                   SET TipoDoc_Acudiente=$2, Numero_Doc_Acudiente=$3, Nombre_Completo=$4, Direccion=$5, Telefono=$6, Email=$7, id_Parentesco=$8 
                   WHERE id_acudiente=$1 RETURNING *;`;
    try{
        const result = await executeQuery(query, [idAcudiente, TipoDoc_Acudiente, Numero_Doc_Acudiente, Nombre_Completo, Direccion, Telefono, Email, id_Parentesco]);
        if (result.length === 0) 
            throw { name: "Custom error", statusCode: 404, message: `Acudiente con ID ${idAcudiente} no encontrado.`};    
        return result;
    } catch (error) {
        if (error.message.search("uk_acudiente")>-1) {
            throw { name: "Custom error", statusCode: 409, message: `Acudiente con Documento ${TipoDoc_Acudiente}-${Numero_Doc_Acudiente} ya existe.` };
        }
        if (error.message.search("ref_acudientes_to_parentesco")>-1) {
            throw { name: "Custom error", statusCode: 422, message: `El id_Parentesco=${id_Parentesco} no existe.` };
        }
        throw error;
    }
}

export const deleteAcudiente = async (idAcudiente) => {
    const query = "DELETE FROM acudientes WHERE id_acudiente=$1 RETURNING *;";
    const result = await executeQuery(query, [idAcudiente]);
    if (result.length === 0) 
        throw { name: "Custom error", statusCode: 404, message: `Acudiente con ID ${idAcudiente} no encontrado.`};
    return result;
}
