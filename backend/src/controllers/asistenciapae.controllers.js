import executeQuery from "../db/dbHelper.js"; 
import { asyncHandler, DatabaseError } from "../middlewares/errorHandler.js";

export const recibirReportePAE = async (id_estudiante) => {
    const query = `select 
                   fecha_asistencia,
                   hora_asistencia,
                   e.tipodoc_estudiante,
                   e.numerodoc_estudiante,
                   e.nombre_completo,
                   e.fechaingresopae,
                   e.fechaegresopae,
                   e.fechaingresoiuc
                   from
                   asistencia_pae ap join estudiantes e
                   on e.id_estudiante = ap.id_estudiante 
                   where e.tipodoc_estudiante = $1 and e.numerodoc_estudiante = $2`;
    const result = await executeQuery(query, [id_estudiante]);
    if (result.length === 0) 
        throw new DatabaseError(404, `Estudiante con numero de documento ${numerodoc_estudiante} no agregado al sistema de asistencia PAE`);
    return result[0]
}

export const validarAlmuerzoHoyEstudiantePAE = async (id_estudiante) => {
    const query = `select 
                     e.id_estudiante,
                     e.tipodoc_estudiante, e.numerodoc_estudiante ,
                     e.nombre_completo, e.fechaingresopae, e.fechaegresopae, e.fechaegresoiuc 
                     from 
                     estudiantes e join asistencia_pae ap 
                     on ap.id_estudiante = e.id_estudiante
                     where
                     e.fechaingresopae is not null 
                     and (e.fechaegresopae > current_date or e.fechaegresopae is null)
                     and e.fechaegresoiuc is null 
                     and e.id_estudiante = $1
                     and ap.fecha_asistencia = current_date`;
    const result = await executeQuery(query, [id_estudiante]);
    if (result.length > 0) 
        throw new DatabaseError(401, `Estudiante con número de documento ${result[0].numerodoc_estudiante} ya fue registrado hoy`);
    return true;
}

export const validarEstudiantePAE = async (numerodoc_estudiante) => {
     const query = `select 
                     e.id_estudiante,
                     e.tipodoc_estudiante, e.numerodoc_estudiante ,
                     e.nombre_completo, e.fechaingresopae, e.fechaegresopae, e.fechaegresoiuc 
                     from 
                     estudiantes e 
                     where
                     e.fechaingresopae is not null 
                     and (e.fechaegresopae > current_date or e.fechaegresopae is null)
                     and e.fechaegresoiuc is null 
                     and e.numerodoc_estudiante = $1`;
     const result = await executeQuery(query, [numerodoc_estudiante]);
     if (result.length === 0) 
         throw new DatabaseError(404, `Estudiante con numero de documento ${numerodoc_estudiante} no agregado al sistema de asistencia PAE`);
     return result[0];
}

export const insertAsistenciaPAE = async (id_estudiante) => {
    const query = `INSERT INTO asistencia_pae 
                   (fecha_asistencia,hora_asistencia,id_estudiante) 
                   VALUES (current_date, current_time , $1) RETURNING id_asistencia_pae;`;

    try {
        return await executeQuery(query, [id_estudiante]);
    } catch (error) {
        /*if (error.message.search("uk_acudiente")>-1) {
            throw { name: "Custom error", statusCode: 409, message: `Acudiente con Documento ${TipoDoc_Acudiente}-${Numero_Doc_Acudiente} ya existe.` };
        }*/
        if (error.message.search("ref_asistencia_pae_to_estudiantes")>-1) {
            throw new DatabaseError(422, `El id_estudiante = ${id_estudiante} no existe.` );
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
            throw new DatabaseError(404, `Acudiente con ID ${idAcudiente} no encontrado.`);    
        return result;
    } catch (error) {
        if (error.message.search("uk_acudiente")>-1) {
            throw new DatabaseError(409, `Acudiente con Documento ${TipoDoc_Acudiente}-${Numero_Doc_Acudiente} ya existe.` );
        }
        if (error.message.search("ref_acudientes_to_parentesco")>-1) {
            throw new DatabaseError(422, `El id_Parentesco=${id_Parentesco} no existe.` );
        }
        throw error;
    }
}

export const deleteAcudiente = async (idAcudiente) => {
    const query = "DELETE FROM acudientes WHERE id_acudiente=$1 RETURNING *;";
    const result = await executeQuery(query, [idAcudiente]);
    if (result.length === 0) 
        throw new DatabaseError(404, `Acudiente con ID ${idAcudiente} no encontrado.`);
    return result;
}
