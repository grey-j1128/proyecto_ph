import { Router } from "express";
import { getAlergias, getAlergia, insertAlergia, updateAlergia, deleteAlergia } 
        from "../controllers/alergias.controllers.js";
import {  asyncHandler } from "../middlewares/errorHandler.js"; 
import { respuestaError, respuestaOK } from "../lib/responseModels.js";

const routerAlergias = Router();

routerAlergias.get("/alergias", asyncHandler(async (req, res) => {
    let rows = await getAlergias();
    res.json(respuestaOK(rows));
}));

routerAlergias.get("/alergia/:id", asyncHandler(async (req, res) => {
    let idAlergia = parseInt(req.params['id']);
    if (isNaN(idAlergia)){
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));
    }
    let rows = await getAlergia(idAlergia);
    res.json(respuestaOK(rows));
}));

routerAlergias.post("/alergia", asyncHandler(async (req, res) => {
    let NombreAlergia = req.body['NombreAlergia'];
    if (!NombreAlergia){
        return res.status(400).json(respuestaError("El campo 'NombreAlergia' no esta diligenciado."));
    }
    let row = await insertAlergia(NombreAlergia);
    res.json(respuestaOK(row));
}));

routerAlergias.put("/alergia/:id", asyncHandler(async (req, res) => {
    let idAlergia = parseInt(req.params['id']);
    if (isNaN(idAlergia)){
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));
    }
    let NombreAlergia = req.body['NombreAlergia'];
    if (!NombreAlergia){
        return res.status(400).json(respuestaError("El campo 'NombreAlergia' no esta diligenciado."));
    }
    const row = await updateAlergia(idAlergia, NombreAlergia);
    res.json(respuestaOK("Update OK"));
}));

routerAlergias.delete("/alergia/:id", asyncHandler(async (req, res) => {
    let idAlergia = parseInt(req.params['id']);
    if (isNaN(idAlergia)){
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));
    }
    await deleteAlergia(idAlergia);
    res.json(respuestaOK("Delete OK"));
}));

export default routerAlergias;
