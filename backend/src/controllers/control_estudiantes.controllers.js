import executeQuery from "../db/dbHelper.js";

export const getControlEstudiantes = async () => {
  const query =
    "SELECT id_control_estudiantes, TO_CHAR(fecha, 'YYYY-MM-DD') AS fecha, TO_CHAR(hora, 'HH24:MI:SS') AS hora, id_estudiante FROM control_estudiantes ORDER BY id_control_estudiantes ASC";
  return await executeQuery(query);
};

export const getControlEstudiante = async (idControlEstudiantes) => {
  const query =
    "SELECT * FROM control_estudiantes WHERE id_control_estudiantes = $1";
  const result = await executeQuery(query, [idControlEstudiantes]);
  if (result.length === 0)
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Control de estudiante con ID ${idControlEstudiantes} no encontrado.`,
    };
  return result;
};

export const insertControlEstudiante = async (hora, fecha, id_estudiante) => {
  const query = `INSERT INTO control_estudiantes
                   (hora, fecha, id_estudiante)
                   VALUES ($1, $2, $3) RETURNING id_control_estudiantes;`;

  try {
    return await executeQuery(query, [hora, fecha, id_estudiante]);
  } catch (error) {
    if (error.message.search("control_estudiantes_estudiantes_fk") > -1) {
      throw {
        name: "Custom error",
        statusCode: 422,
        message: `El id_estudiante=${id_estudiante} no existe.`,
      };
    }
    throw error;
  }
};

export const updateControlEstudiante = async (
  idControlEstudiantes,
  hora,
  fecha,
  id_estudiante
) => {
  const query = `UPDATE control_estudiantes
                   SET hora=$2, fecha=$3, id_estudiante=$4
                   WHERE id_control_estudiantes=$1 RETURNING *;`;

  try {
    const result = await executeQuery(query, [
      idControlEstudiantes,
      hora,
      fecha,
      id_estudiante,
    ]);
    if (result.length === 0)
      throw {
        name: "Custom error",
        statusCode: 404,
        message: `Control de estudiante con ID ${idControlEstudiantes} no encontrado.`,
      };
    return result;
  } catch (error) {
    if (error.message.search("control_estudiantes_estudiantes_fk") > -1) {
      throw {
        name: "Custom error",
        statusCode: 422,
        message: `El id_estudiante=${id_estudiante} no existe.`,
      };
    }
    throw error;
  }
};

export const deleteControlEstudiante = async (idControlEstudiantes) => {
  const query =
    "DELETE FROM control_estudiantes WHERE id_control_estudiantes=$1 RETURNING *;";
  const result = await executeQuery(query, [idControlEstudiantes]);
  if (result.length === 0)
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Control de estudiante con ID ${idControlEstudiantes} no encontrado.`,
    };
  return result;
};
