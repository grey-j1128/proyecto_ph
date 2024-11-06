import { Router } from "express";
import { getParametros, getParametro, insertParametro, updateParametro, deleteParametro } from "../controllers/parametro.controller.js";
import { asyncHandler } from "../middlewares/errorHandler.js"; 
import { respuestaOK, respuestaError } from "../lib/responseModels.js";

const routerParametro = Router();

routerParametro.get("/parametros", asyncHandler(async (req, res) => {
    let rows = await getParametros();
    res.json(respuestaOK(rows));
}));

routerParametro.get("/parametro/:id", asyncHandler(async (req, res) => {
    let idParametro = parseInt(req.params['id']);
    if (isNaN(idParametro)){
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));
    }
    let rows = await getParametro(idParametro);
    res.json(respuestaOK(rows));
}));

routerParametro.post("/parametro", asyncHandler(async (req, res) => {
    let { nombre, descripcion, valor } = req.body;
    if (!nombre || !descripcion || typeof valor !== "number") {
        return res.status(400).json(respuestaError("Campos 'nombre', 'descripcion' y 'valor' son requeridos."));
    }
    let row = await insertParametro(nombre, descripcion, valor);
    res.json(respuestaOK(row));
}));

routerParametro.put("/parametro/:id", asyncHandler(async (req, res) => {
    let id = parseInt(req.params['id']);
    if (isNaN(id)){
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));
    }
    let { nombre, descripcion, valor } = req.body;
    if (!nombre || !descripcion || typeof valor !== "number") {
        return res.status(400).json(respuestaError("Campos 'nombre', 'descripcion' y 'valor' son requeridos."));
    }
    const row = await updateParametro(id, nombre, descripcion, valor);
    res.json(respuestaOK("Update OK"));
}));

routerParametro.delete("/parametro/:id", asyncHandler(async (req, res) => {
    let id = parseInt(req.params['id']);
    if (isNaN(id)){
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));
    }
    await deleteParametro(id);
    res.json(respuestaOK("Delete OK"));
}));

export default routerParametro;
