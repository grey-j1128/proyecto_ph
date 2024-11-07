import { Router } from "express";
import {
  getParametro,
  getParametros,
  insertParametro,
  updateParametro,
  deleteParametro,
} from "../controllers/parametro.controllers.js";
import { asyncHandler } from "../middlewares/errorHandler.js";
import { respuestaOK, respuestaError } from "../lib/responseModels.js";

const routerParametro = Router();

routerParametro.get(
  "/parametros",
  asyncHandler(async (req, res) => {
    let rows = await getParametros();
    res.json(respuestaOK(rows));
  })
);

routerParametro.get(
  "/parametro/:id",
  asyncHandler(async (req, res) => {
    let idParametro = parseInt(req.params["id"]);
    if (isNaN(idParametro)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }
    let row = await getParametro(idParametro);
    res.json(respuestaOK(row));
  })
);

routerParametro.post(
  "/parametro",
  asyncHandler(async (req, res) => {
    let nombre = req.body["nombre"];
    if (!nombre) {
      return res
        .status(400)
        .json(respuestaError("El campo 'nombre' no está diligenciado."));
    }
    let row = await insertParametro(nombre);
    res.json(respuestaOK(row));
  })
);

routerParametro.put(
  "/parametro/:id",
  asyncHandler(async (req, res) => {
    let id = parseInt(req.params["id"]);
    if (isNaN(id)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }
    let nombre = req.body["nombre"];
    if (!nombre) {
      return res
        .status(400)
        .json(respuestaError("El campo 'nombre' no está diligenciado."));
    }
    const row = await updateParametro(id, nombre);
    res.json(respuestaOK("Update OK"));
  })
);

routerParametro.delete(
  "/parametro/:id",
  asyncHandler(async (req, res) => {
    let id = parseInt(req.params["id"]);
    if (isNaN(id)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }
    await deleteParametro(id);
    res.json(respuestaOK("Delete OK"));
  })
);

export default routerParametro;
