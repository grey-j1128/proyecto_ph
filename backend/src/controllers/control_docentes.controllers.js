import executeQuery from "../db/dbHelper.js";

export const getControlDocentes = async () => {
  const query =
    "SELECT id_control_docentes, TO_CHAR(fecha, 'YYYY-MM-DD') AS fecha, TO_CHAR(hora, 'HH24:MI:SS') AS hora, id_docentes FROM control_docentes ORDER BY id_control_docentes ASC;";
  return await executeQuery(query);
};

export const getControlDocente = async (idControlDocentes) => {
  const query = "SELECT * FROM control_docentes WHERE id_control_docentes = $1";
  const result = await executeQuery(query, [idControlDocentes]);
  if (result.length === 0)
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Control de docente con ID ${idControlDocentes} no encontrado.`,
    };
  return result;
};

export const insertControlDocente = async (hora, fecha, id_docentes) => {
  const query = `INSERT INTO control_docentes
                   (hora, fecha, id_docentes)
                   VALUES ($1, $2, $3) RETURNING id_control_docentes;`;

  try {
    return await executeQuery(query, [hora, fecha, id_docentes]);
  } catch (error) {
    if (error.message.search("control_docentes_docentes_fk") > -1) {
      throw {
        name: "Custom error",
        statusCode: 422,
        message: `El id_docentes=${id_docentes} no existe.`,
      };
    }
    throw error;
  }
};

export const updateControlDocente = async (
  idControlDocentes,
  hora,
  fecha,
  id_docentes
) => {
  const query = `UPDATE control_docentes
                   SET hora=$2, fecha=$3, id_docentes=$4
                   WHERE id_control_docentes=$1 RETURNING *;`;

  try {
    const result = await executeQuery(query, [
      idControlDocentes,
      hora,
      fecha,
      id_docentes,
    ]);
    if (result.length === 0)
      throw {
        name: "Custom error",
        statusCode: 404,
        message: `Control de docente con ID ${idControlDocentes} no encontrado.`,
      };
    return result;
  } catch (error) {
    if (error.message.search("control_docentes_docentes_fk") > -1) {
      throw {
        name: "Custom error",
        statusCode: 422,
        message: `El id_docentes=${id_docentes} no existe.`,
      };
    }
    throw error;
  }
};

export const deleteControlDocente = async (idControlDocentes) => {
  const query =
    "DELETE FROM control_docentes WHERE id_control_docentes=$1 RETURNING *;";
  const result = await executeQuery(query, [idControlDocentes]);
  if (result.length === 0)
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Control de docente con ID ${idControlDocentes} no encontrado.`,
    };
  return result;
};
