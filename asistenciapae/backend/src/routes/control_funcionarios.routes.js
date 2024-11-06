import { Router } from "express";
import { getControlFuncionario, getControlFuncionarios, insertControlFuncionario, updateControlFuncionario, deleteControlFuncionario }
        from "../controllers/control_funcionarios.controllers.js";
import { errorHandler, asyncHandler } from "../middlewares/errorHandler.js";
import { respuestaError, respuestaOK } from "../lib/responseModels.js";

const routerControlFuncionario = Router();

routerControlFuncionario.get("/control_funcionarios", asyncHandler(async (req, res) => {
    let rows = await getControlFuncionarios();
    res.json(respuestaOK(rows));
}));

routerControlFuncionario.get("/control_funcionario/:id", asyncHandler(async (req, res) => {
    let idControlFuncionario = parseInt(req.params['id']);
    if (isNaN(idControlFuncionario)){
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));      
    }
    let rows = await getControlFuncionario(idControlFuncionario);
    res.json(respuestaOK(rows));
}));

routerControlFuncionario.post("/control_funcionario", asyncHandler(async (req, res) => {
    const { hora, fecha, id_funcionario } = req.body;

    if (!hora || !fecha || !id_funcionario) {
        return res.status(400).json(respuestaError("Todos los campos son obligatorios."));  
    }

    try {
        let row = await insertControlFuncionario(hora, fecha, id_funcionario);
        res.json(respuestaOK(row));
    } catch (error) {
        if (error?.name == "Custom error")
            return res.status(error.statusCode).json(respuestaError(error.message));  
        else
            errorHandler({status: 500, message: error.message}, req, res);
    }
}));

routerControlFuncionario.put("/control_funcionario/:id", asyncHandler(async (req, res) => {
    let idControlFuncionario = parseInt(req.params['id']);
    const { hora, fecha, id_funcionario } = req.body;

    if (isNaN(idControlFuncionario)) {
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));      
    }

    if (!hora || !fecha || !id_funcionario) {
        return res.status(400).json(respuestaError("Todos los campos son obligatorios."));  
    }
    try{
        let row = await updateControlFuncionario(idControlFuncionario, hora, fecha, id_funcionario);
        res.json(respuestaOK("Update OK"));    
    } catch (error) {
        if (error?.name == "Custom error")
            return res.status(error.statusCode).json(respuestaError(error.message));  
        else
            errorHandler({status: 500, message: error.message}, req, res);
    }
}));

routerControlFuncionario.delete("/control_funcionario/:id", asyncHandler(async (req, res) => {
    let idControlFuncionario = parseInt(req.params['id']);
    if (isNaN(idControlFuncionario)) {
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));      
    }
   
    await deleteControlFuncionario(idControlFuncionario);
    res.json(respuestaOK("Delete OK"));
}));

export default routerControlFuncionario;