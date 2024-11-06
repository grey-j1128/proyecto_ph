import { Router } from "express";
import {
  getTipoResultados,
  getTipoResultado,
  insertTipoResultado,
  updateTipoResultado,
  deleteTipoResultado
} from "../controllers/tipo_resultados.controller.js";
import { asyncHandler } from "../middlewares/errorHandler.js";
import { respuestaOK, respuestaError } from "../lib/responseModels.js";

const routerTipoResultados = Router();

routerTipoResultados.get("/tipos-resultados", asyncHandler(async (req, res) => {
  let rows = await getTipoResultados();
  res.json(respuestaOK(rows));
}));

routerTipoResultados.get("/tipo-resultado/:id", asyncHandler(async (req, res) => {
  let idTipoResultado = parseInt(req.params['id']);
  if (isNaN(idTipoResultado)){
    return res.status(400).json(respuestaError("El campo 'id' no es numérico."));
  }
  let rows = await getTipoResultado(idTipoResultado);
  res.json(respuestaOK(rows));
}));

routerTipoResultados.post("/tipo-resultado", asyncHandler(async (req, res) => {
  let Nombre = req.body['Nombre'];
  if (!Nombre){
    return res.status(400).json(respuestaError("El campo 'Nombre' no está diligenciado."));
  }
  let row = await insertTipoResultado(Nombre, puntuancionReal);
  res.json(respuestaOK(row));
}));

routerTipoResultados.put("/tipo-resultado/:id", asyncHandler(async (req, res) => {
  let id = parseInt(req.params['id']);
  if (isNaN(id)){
    return res.status(400).json(respuestaError("El campo 'id' no es numérico."));
  }
  let Nombre = req.body['Nombre'];
  if (!Nombre){
    return res.status(400).json(respuestaError("El campo 'Nombre' no está diligenciado."));
  }
  const row = await updateTipoResultado(id, Nombre);
  res.json(respuestaOK(row));
}));

routerTipoResultados.delete("/tipo-resultado/:id", asyncHandler(async (req, res) => {
  let id = parseInt(req.params['id']);
  if (isNaN(id)){
    return res.status(400).json(respuestaError("El campo 'id' no es numérico."));
  }
  await deleteTipoResultado(id);
  res.json(respuestaOK("Delete OK"));
}));

export default routerTipoResultados;