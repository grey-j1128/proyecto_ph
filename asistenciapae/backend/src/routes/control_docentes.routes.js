import { Router } from "express";
import { getControlDocente, getControlDocentes, insertControlDocente, updateControlDocente, deleteControlDocente } 
        from "../controllers/control_docentes.controller.js";
import { errorHandler, asyncHandler } from "../middlewares/errorHandler.js";
import { respuestaError, respuestaOK } from "../lib/responseModels.js";

const routerControlDocente = Router();

routerControlDocente.get("/control_docentes", asyncHandler(async (req, res) => {
    let rows = await getControlDocentes();
    res.json(respuestaOK(rows));
}));

routerControlDocente.get("/control_docente/:id", asyncHandler(async (req, res) => {
    let idControlDocente = parseInt(req.params['id']);
    if (isNaN(idControlDocente)) {
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));
    }
    let row = await getControlDocente(idControlDocente);
    res.json(respuestaOK(row));
}));

routerControlDocente.post("/control_docente", asyncHandler(async (req, res) => {
    const { hora, fecha, id_docentes } = req.body;

    // Validación de campos obligatorios
    if (!hora || !fecha || !id_docentes) {
        return res.status(400).json(respuestaError("Todos los campos son obligatorios."));
    }

    try {
        let row = await insertControlDocente(hora, fecha, id_docentes);
        res.json(respuestaOK(row));
    } catch (error) {
        if (error?.name === "Custom error")
            return res.status(error.statusCode).json(respuestaError(error.message));
        else
            errorHandler({ status: 500, message: error.message }, req, res);
    }
}));

routerControlDocente.put("/control_docente/:id", asyncHandler(async (req, res) => {
    let idControlDocente = parseInt(req.params['id']);
    const { hora, fecha, id_docentes } = req.body;

    if (isNaN(idControlDocente)) {
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));
    }

    if (!hora || !fecha || !id_docentes) {
        return res.status(400).json(respuestaError("Todos los campos son obligatorios."));
    }
    try {
        let row = await updateControlDocente(idControlDocente, hora, fecha, id_docentes);
        res.json(respuestaOK("Update OK"));
    } catch (error) {
        if (error?.name === "Custom error")
            return res.status(error.statusCode).json(respuestaError(error.message));
        else
            errorHandler({ status: 500, message: error.message }, req, res);
    }
}));

routerControlDocente.delete("/control_docente/:id", asyncHandler(async (req, res) => {
    let idControlDocente = parseInt(req.params['id']);
    if (isNaN(idControlDocente)) {
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));
    }

    await deleteControlDocente(idControlDocente);
    res.json(respuestaOK("Delete OK"));
}));

export default routerControlDocente;
