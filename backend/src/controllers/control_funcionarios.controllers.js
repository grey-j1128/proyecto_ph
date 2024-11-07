import executeQuery from "../db/dbHelper.js";

export const getControlFuncionarios = async () => {
  const query =
    "SELECT id_control_funcionario, TO_CHAR(fecha, 'YYYY-MM-DD') AS fecha, TO_CHAR(hora, 'HH24:MI:SS') AS hora, id_funcionario FROM control_funcionarios ORDER BY id_control_funcionario ASC;";
  return await executeQuery(query);
};

export const getControlFuncionario = async (idControlFuncionario) => {
  const query =
    "SELECT * FROM control_funcionarios WHERE id_control_funcionario = $1";
  const result = await executeQuery(query, [idControlFuncionario]);
  if (result.length === 0)
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Control de funcionario con ID ${idControlFuncionario} no encontrado.`,
    };
  return result;
};

export const insertControlFuncionario = async (hora, fecha, id_funcionario) => {
  const query = `INSERT INTO control_funcionarios
                   (hora, fecha, id_funcionario)
                   VALUES ($1, $2, $3) RETURNING id_control_funcionario;`;

  try {
    return await executeQuery(query, [hora, fecha, id_funcionario]);
  } catch (error) {
    if (error.message.search("control_funcionarios_funcionarios_fk") > -1) {
      throw {
        name: "Custom error",
        statusCode: 422,
        message: `El id_funcionario=${id_funcionario} no existe.`,
      };
    }
    throw error;
  }
};

export const updateControlFuncionario = async (
  idControlFuncionario,
  hora,
  fecha,
  id_funcionario
) => {
  const query = `UPDATE control_funcionarios
                   SET hora=$2, fecha=$3, id_funcionario=$4
                   WHERE id_control_funcionario=$1 RETURNING *;`;

  try {
    const result = await executeQuery(query, [
      idControlFuncionario,
      hora,
      fecha,
      id_funcionario,
    ]);
    if (result.length === 0)
      throw {
        name: "Custom error",
        statusCode: 404,
        message: `Control de funcionario con ID ${idControlFuncionario} no encontrado.`,
      };
    return result;
  } catch (error) {
    if (error.message.search("control_funcionarios_funcionarios_fk") > -1) {
      throw {
        name: "Custom error",
        statusCode: 422,
        message: `El id_funcionario=${id_funcionario} no existe.`,
      };
    }
    throw error;
  }
};

export const deleteControlFuncionario = async (idControlFuncionario) => {
  const query =
    "DELETE FROM control_funcionarios WHERE id_control_funcionario=$1 RETURNING *;";
  const result = await executeQuery(query, [idControlFuncionario]);
  if (result.length === 0)
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Control de funcionario con ID ${idControlFuncionario} no encontrado.`,
    };
  return result;
};
