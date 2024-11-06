import { Router } from "express";
import { getParentesco, getParentescos, insertParentesco, updateParentesco, deleteParentesco } 
        from "../controllers/parentesco.controllers.js";
import { asyncHandler } from "../middlewares/errorHandler.js"; 
import { respuestaOK, respuestaError } from "../lib/responseModels.js";

const routerParentesco = Router();

routerParentesco.get("/parentescos", asyncHandler(async (req, res) => {
    let rows = await getParentescos();
    res.json(respuestaOK(rows));
}));

routerParentesco.get("/parentesco/:id", asyncHandler(async (req, res) => {
    let idParentesco = parseInt(req.params['id']);
    if (isNaN(idParentesco)){
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));
    }
    let rows = await getParentesco(idParentesco);
    res.json(respuestaOK(rows));
}));

routerParentesco.post("/parentesco", asyncHandler(async (req, res) => {
    let Nombre = req.body['Nombre'];
    if (!Nombre){
        return res.status(400).json(respuestaError("El campo 'Nombre' no está diligenciado."));
    }
    let row = await insertParentesco(Nombre);
    res.json(respuestaOK(row));
}));

routerParentesco.put("/parentesco/:id", asyncHandler(async (req, res) => {
    let id = parseInt(req.params['id']);
    if (isNaN(id)){
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));
    }
    let Nombre = req.body['Nombre'];
    if (!Nombre){
        return res.status(400).json(respuestaError("El campo 'Nombre' no está diligenciado."));
    }
    const row = await updateParentesco(id, Nombre);
    res.json(respuestaOK("Update OK"));
}));

routerParentesco.delete("/parentesco/:id", asyncHandler(async (req, res) => {
    let id = parseInt(req.params['id']);
    if (isNaN(id)){
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));
    }
    await deleteParentesco(id);
    res.json(respuestaOK("Delete OK"));
}));

export default routerParentesco;
