import { Router } from "express";
import {
  getControlDocente,
  getControlDocentes,
  insertControlDocente,
  updateControlDocente,
  deleteControlDocente,
} from "../controllers/control_docentes.controllers.js";
import { errorHandler, asyncHandler } from "../middlewares/errorHandler.js";
import { respuestaError, respuestaOK } from "../lib/responseModels.js";

const routerControlDocente = Router();

routerControlDocente.get(
  "/control_docentes",
  asyncHandler(async (req, res) => {
    let rows = await getControlDocentes();
    res.json(respuestaOK(rows));
  })
);

routerControlDocente.get(
  "/control_docente/:id",
  asyncHandler(async (req, res) => {
    let idControlDocentes = parseInt(req.params["id"]);
    if (isNaN(idControlDocentes)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }
    let rows = await getControlDocente(idControlDocentes);
    res.json(respuestaOK(rows));
  })
);

routerControlDocente.post(
  "/control_docente",
  asyncHandler(async (req, res) => {
    const { hora, fecha, id_docentes } = req.body;

    if (!hora || !fecha || !id_docentes) {
      return res
        .status(400)
        .json(respuestaError("Todos los campos son obligatorios."));
    }

    try {
      let row = await insertControlDocente(hora, fecha, id_docentes);
      res.json(respuestaOK(row));
    } catch (error) {
      if (error?.name == "Custom error")
        return res.status(error.statusCode).json(respuestaError(error.message));
      else errorHandler({ status: 500, message: error.message }, req, res);
    }
  })
);

routerControlDocente.put(
  "/control_docente/:id",
  asyncHandler(async (req, res) => {
    let idControlDocentes = parseInt(req.params["id"]);
    const { hora, fecha, id_docentes } = req.body;

    if (isNaN(idControlDocentes)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }

    if (!hora || !fecha || !id_docentes) {
      return res
        .status(400)
        .json(respuestaError("Todos los campos son obligatorios."));
    }
    try {
      let row = await updateControlDocente(
        idControlDocentes,
        hora,
        fecha,
        id_docentes
      );
      res.json(respuestaOK("Update OK"));
    } catch (error) {
      if (error?.name == "Custom error")
        return res.status(error.statusCode).json(respuestaError(error.message));
      else errorHandler({ status: 500, message: error.message }, req, res);
    }
  })
);

routerControlDocente.delete(
  "/control_docente/:id",
  asyncHandler(async (req, res) => {
    let idControlDocentes = parseInt(req.params["id"]);
    if (isNaN(idControlDocentes)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }

    await deleteControlDocente(idControlDocentes);
    res.json(respuestaOK("Delete OK"));
  })
);

export default routerControlDocente;
