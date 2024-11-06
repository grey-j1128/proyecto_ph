import pool from "../db/db.js";

export const getEstudiantes = async () => {
  try {
    const result = await pool.query(
      "SELECT id_estudiante, Tipodoc_Estudiante, Numerodoc_Estudiante, Nombre_Completo, fecha_nacimiento, sexo, Curso_Actual, Fechaingresoiuc, fechaegresoiuc, fechaingresopae, fechaegresopae, id_acudiente FROM Estudiantes ORDER BY id_estudiante ASC"
    );
    return result.rows;
  } catch (error) {
    let msj = `Error al ejecutar consulta de Estudiantes:${error.errors}`;
    throw new Error(msj);
  }
};

export const getEstudiante = async (idEstudiantes) => {
  try {
    const result = await pool.query(
      "SELECT Tipodoc_Estudiante, Numerodoc_Estudiante, Nombre_Completo, fecha_nacimiento, sexo, Curso_Actual, Fechaingresoiuc, fechaegresoiuc, fechaingresopae, fechaegresopae, id_acudiente FROM Estudiantes where id_estudiante = $1",
      [idEstudiantes]
    );
    return result.rows;
  } catch (error) {
    let msj = `Error al ejecutar consulta de Estudiantes con idEstudiantes=${idEstudiantes} :${error}`;
    throw new Error(msj);
  }
};

export const insertEstudiante = async (
  TipoDoc_Estudiante,
  NumeroDoc_Estudiante,
  Nombre_completo,
  Fecha_nacimiento,
  Sexo,
  Curso_actual,
  FechaIngresoIUC,
  FechaEgresoIUC,
  FechaIngresoPAE,
  FechaEgresoPAE,
  idAcudiente
) => {
  try {
    FechaEgresoIUC = !FechaEgresoIUC ? null : FechaEgresoIUC;
    FechaEgresoPAE = !FechaEgresoPAE ? null : FechaEgresoPAE;

    const result = await pool.query(
      "INSERT INTO Estudiantes (Tipodoc_Estudiante, Numerodoc_Estudiante, Nombre_Completo, fecha_nacimiento, sexo, Curso_Actual, Fechaingresoiuc, fechaegresoiuc, fechaingresopae, fechaegresopae, id_acudiente) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id_estudiante;",
      [
        TipoDoc_Estudiante,
        NumeroDoc_Estudiante,
        Nombre_completo,
        Fecha_nacimiento,
        Sexo,
        Curso_actual,
        FechaIngresoIUC,
        FechaEgresoIUC,
        FechaIngresoPAE,
        FechaEgresoPAE,
        idAcudiente,
      ]
    );
    return result.rows;
  } catch (error) {
    let msj = `Error al ejecutar inserción de Estudiantes con NombreEstudiantes:${error}`;
    throw new Error(msj);
  }
};

export const updateEstudiante = async (
  idEstudiantes,
  Tipodoc_Estudiante,
  Numerodoc_Estudiante,
  Nombre_Completo,
  fecha_nacimiento,
  sexo,
  Curso_Actual,
  Fecha_ingreso_iuc,
  fecha_egreso_iuc,
  fecha_ingreso_pae,
  fecha_egreso_pae,
  id_acudiente
) => {
  try {
    const result = await pool.query(
      "UPDATE idEstudiantes=$1, Tipodoc_Estudiante=$2, Numerodoc_Estudiante=$3, Nombre_Completo=$4, fecha_nacimiento=$5, sexo=$6, Curso_Actual=$7, Fechaingresoiuc=$8, fechaegresoiuc=$9, fechaingresopae=$10, fechaegresopae=$11, id_acudiente=$12 RETURNING *;",
      [idEstudiantes, NombreEstudiante]
    );
    return result.rows;
  } catch (error) {
    let msj = `Error al ejecutar actualización de Estudiantes con idEstudiantes=${idEstudiante} :${error}`;
    throw new Error(msj);
  }
};

export const deleteEstudiante = async (idEstudiante) => {
  try {
    const result = await pool.query(
      "DELETE FROM Estudiantes where id_Estudiantes = $1 RETURNING *;",
      [idEstudiante]
    );
    return result.rows;
  } catch (error) {
    let msj = `Error al ejecutar borrado de Estudiantes con id_Estudiantes=${id_Estudiante} :${error}`;
    throw new Error(msj);
  }
};
