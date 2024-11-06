import { Router } from "express";
import {
  getEstudiante,
  getEstudiantes,
  insertEstudiante,
  updateEstudiante,
  deleteEstudiante,
} from "../controllers/estudiantes.controllers.js";
import { errorHandler, asyncHandler } from "../middlewares/errorHandler.js";
import { respuestaError, respuestaOK } from "../lib/responseModels.js";

const routerEstudiante = Router();

routerEstudiante.get(
  "/Estudiantes",
  asyncHandler(async (req, res) => {
    let rows = await getEstudiantes();
    res.json(respuestaOK(rows));
  })
);

routerEstudiante.get(
  "/Estudiante/:id",
  asyncHandler(async (req, res) => {
    let idEstudiante = parseInt(req.params["id"]);
    if (isNaN(idEstudiante)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }
    let rows = await getEstudiante(idEstudiante);
    res.json(respuestaOK(rows));
  })
);

routerEstudiante.post(
  "/Estudiante",
  asyncHandler(async (req, res) => {
    const {
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
      id_Acudiente,
    } = req.body;

    // Validación de campos obligatorios
    if (
      !TipoDoc_Estudiante ||
      !NumeroDoc_Estudiante ||
      !Nombre_completo ||
      !Fecha_nacimiento ||
      !Sexo ||
      !Curso_actual ||
      !FechaIngresoIUC ||
      !FechaIngresoPAE ||
      !id_Acudiente
    ) {
      return res
        .status(400)
        .json(respuestaError("Todos los campos son obligatorios."));
    }

    try {
      let row = await insertEstudiante(
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
        id_Acudiente
      );
      res.json(respuestaOK(row));
    } catch (error) {
      if (error?.name == "Custom error")
        return res.status(error.statusCode).json(respuestaError(error.message));
      else errorHandler({ status: 500, message: error.message }, req, res);
    }
  })
);

routerEstudiante.put(
  "/Estudiante/:id",
  asyncHandler(async (req, res) => {
    let idEstudiante = parseInt(req.params["id"]);
    const {
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
      id_Acudiente,
    } = req.body;

    if (isNaN(idEstudiante)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }

    if (
      !TipoDoc_Estudiante ||
      !NumeroDoc_Estudiante ||
      !Nombre_completo ||
      !Fecha_nacimiento ||
      !Sexo ||
      !Curso_actual ||
      !FechaIngresoIUC ||
      !FechaEgresoIUC ||
      !FechaIngresoPAE ||
      !FechaEgresoPAE ||
      !id_Acudiente
    ) {
      return res
        .status(400)
        .json(respuestaError("Todos los campos son obligatorios."));
    }
    try {
      let row = await updateEstudiante(
        idEstudiante,
        TipoDoc_Estudiante,
        NumeroDoc_Estudiante,
        Nombre_Completo,

        Fecha_nacimiento,
        Sexo,
        Curso_actual,
        FechaIngresoIUC,
        FechaEgresoIUC,
        FechaIngresoPAE,
        FechaEgresoPAE,
        id_Acudiente
      );
      res.json(respuestaOK("Update OK"));
    } catch (error) {
      if (error?.name == "Custom error")
        return res.status(error.statusCode).json(respuestaError(error.message));
      else errorHandler({ status: 500, message: error.message }, req, res);
    }
  })
);

routerEstudiante.delete(
  "/Estudiante/:id",
  asyncHandler(async (req, res) => {
    let idEstudiante = parseInt(req.params["id"]);
    if (isNaN(idEstudiante)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }

    await deleteEstudiante(idEstudiante);
    res.json(respuestaOK("Delete OK"));
  })
);

export default routerEstudiante;
