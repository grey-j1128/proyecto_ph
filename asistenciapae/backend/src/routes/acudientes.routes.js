import { Router } from "express";
import { getControlEstudiante, getControlEstudiantes, insertControlEstudiante, updateControlEstudiante, deleteControlEstudiante } 
        from "../controllers/controlEstudiantes.controllers.js";
import { errorHandler, asyncHandler } from "../middlewares/errorHandler.js"; 
import { respuestaError, respuestaOK } from "../lib/responseModels.js";

const routerControlEstudiante = Router();

routerControlEstudiante.get("/control_estudiantes", asyncHandler(async (req, res) => {
    let rows = await getControlEstudiantes();
    res.json(respuestaOK(rows));
}));

routerControlEstudiante.get("/control_estudiante/:id", asyncHandler(async (req, res) => {
    let idControlEstudiante = parseInt(req.params['id']);
    if (isNaN(idControlEstudiante)){
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));      
    }
    let rows = await getControlEstudiante(idControlEstudiante);
    res.json(respuestaOK(rows));
}));

routerControlEstudiante.post("/control_estudiante", asyncHandler(async (req, res) => {
    const { hora, fecha, id_estudiante } = req.body;
    
    // Validación de campos obligatorios
    if (!hora || !fecha || !id_estudiante) {
        return res.status(400).json(respuestaError("Todos los campos son obligatorios."));  
    }

    try {
        let row = await insertControlEstudiante(hora, fecha, id_estudiante);
        res.json(respuestaOK(row));
    } catch (error) {
        if (error?.name=="Custom error")
            return res.status(error.statusCode).json(respuestaError(error.message));  
        else
            errorHandler({status: 500, message: error.message}, req, res);
    }
}));

routerControlEstudiante.put("/control_estudiante/:id", asyncHandler(async (req, res) => {
    let idControlEstudiante = parseInt(req.params['id']);
    const { hora, fecha, id_estudiante } = req.body;
    
    if (isNaN(idControlEstudiante)) {
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));      
    }

    if (!hora || !fecha || !id_estudiante) {
        return res.status(400).json(respuestaError("Todos los campos son obligatorios."));  
    }
    try{
        let row = await updateControlEstudiante(idControlEstudiante, hora, fecha, id_estudiante);
        res.json(respuestaOK("Update OK"));    
    } catch (error) {
        if (error?.name=="Custom error")
            return res.status(error.statusCode).json(respuestaError(error.message));  
        else
            errorHandler({status: 500, message: error.message}, req, res);
    }
}));

routerControlEstudiante.delete("/control_estudiante/:id", asyncHandler(async (req, res) => {
    let idControlEstudiante = parseInt(req.params['id']);
    if (isNaN(idControlEstudiante)) {
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));      
    }
    
    await deleteControlEstudiante(idControlEstudiante);
    res.json(respuestaOK("Delete OK"));
}));

export default routerControlEstudiante;
