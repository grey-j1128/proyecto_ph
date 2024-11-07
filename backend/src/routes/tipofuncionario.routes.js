import { Router } from "express";
import { getTipoFuncionario, getTiposFuncionarios, insertTipoFuncionario, updateTipoFuncionario, deleteTipoFuncionario } 
        from "../controllers/tipoFuncionario.controllers.js";
import { asyncHandler } from "../middlewares/errorHandler.js"; 
import { respuestaOK, respuestaError } from "../lib/responseModels.js";

const routerTipoFuncionario = Router();

routerTipoFuncionario.get("/tipos-funcionarios", asyncHandler(async (req, res) => {
    let rows = await getTiposFuncionarios();
    res.json(respuestaOK(rows));
}));

routerTipoFuncionario.get("/tipo-funcionario/:id", asyncHandler(async (req, res) => {
    let idTipoFuncionario = parseInt(req.params['id']);
    if (isNaN(idTipoFuncionario)){
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));
    }
    let rows = await getTipoFuncionario(idTipoFuncionario);
    res.json(respuestaOK(rows));
}));

routerTipoFuncionario.post("/tipo-funcionario", asyncHandler(async (req, res) => {
    let Nombre = req.body['nombre'];
    if (!Nombre){
        return res.status(400).json(respuestaError("El campo 'Nombre' no está diligenciado."));
    }
    let row = await insertTipoFuncionario(Nombre);
    res.json(respuestaOK(row));
}));

routerTipoFuncionario.put("/tipo-funcionario/:id", asyncHandler(async (req, res) => {
    let id = parseInt(req.params['id']);
    if (isNaN(id)){
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));
    }
    let Nombre = req.body['nombre'];
    if (!Nombre){
        return res.status(400).json(respuestaError("El campo 'Nombre' no está diligenciado."));
    }
    const row = await updateTipoFuncionario(id, Nombre);
    res.json(respuestaOK("Update OK"));
}));

routerTipoFuncionario.delete("/tipo-funcionario/:id", asyncHandler(async (req, res) => {
    let id = parseInt(req.params['id']);
    if (isNaN(id)){
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));
    }
    await deleteTipoFuncionario(id);
    res.json(respuestaOK("Delete OK"));
}));

export default routerTipoFuncionario;
