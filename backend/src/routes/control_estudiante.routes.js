import { Router } from "express";
import {
  getControlEstudiante,
  getControlEstudiantes,
  insertControlEstudiante,
  updateControlEstudiante,
  deleteControlEstudiante,
} from "../controllers/control_estudiantes.controllers.js";
import { errorHandler, asyncHandler } from "../middlewares/errorHandler.js";
import { respuestaError, respuestaOK } from "../lib/responseModels.js";

const routerControlEstudiante = Router();

routerControlEstudiante.get(
  "/control_estudiantes",
  asyncHandler(async (req, res) => {
    let rows = await getControlEstudiantes();
    res.json(respuestaOK(rows));
  })
);

routerControlEstudiante.get(
  "/control_estudiante/:id",
  asyncHandler(async (req, res) => {
    let idControlEstudiantes = parseInt(req.params["id"]);
    if (isNaN(idControlEstudiantes)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }
    let rows = await getControlEstudiante(idControlEstudiantes);
    res.json(respuestaOK(rows));
  })
);

routerControlEstudiante.post(
  "/control_estudiante",
  asyncHandler(async (req, res) => {
    const { hora, fecha, id_estudiante } = req.body;

    if (!hora || !fecha || !id_estudiante) {
      return res
        .status(400)
        .json(respuestaError("Todos los campos son obligatorios."));
    }

    try {
      let row = await insertControlEstudiante(hora, fecha, id_estudiante);
      res.json(respuestaOK(row));
    } catch (error) {
      if (error?.name == "Custom error")
        return res.status(error.statusCode).json(respuestaError(error.message));
      else errorHandler({ status: 500, message: error.message }, req, res);
    }
  })
);

routerControlEstudiante.put(
  "/control_estudiante/:id",
  asyncHandler(async (req, res) => {
    let idControlEstudiantes = parseInt(req.params["id"]);
    const { hora, fecha, id_estudiante } = req.body;

    if (isNaN(idControlEstudiantes)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }

    if (!hora || !fecha || !id_estudiante) {
      return res
        .status(400)
        .json(respuestaError("Todos los campos son obligatorios."));
    }
    try {
      let row = await updateControlEstudiante(
        idControlEstudiantes,
        hora,
        fecha,
        id_estudiante
      );
      res.json(respuestaOK("Update OK"));
    } catch (error) {
      if (error?.name == "Custom error")
        return res.status(error.statusCode).json(respuestaError(error.message));
      else errorHandler({ status: 500, message: error.message }, req, res);
    }
  })
);

routerControlEstudiante.delete(
  "/control_estudiante/:id",
  asyncHandler(async (req, res) => {
    let idControlEstudiantes = parseInt(req.params["id"]);
    if (isNaN(idControlEstudiantes)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }

    await deleteControlEstudiante(idControlEstudiantes);
    res.json(respuestaOK("Delete OK"));
  })
);

export default routerControlEstudiante;
