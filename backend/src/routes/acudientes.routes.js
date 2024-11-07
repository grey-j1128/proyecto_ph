import { Router } from "express";
import { getAcudiente, getAcudientes, insertAcudiente, updateAcudiente, deleteAcudiente } 
        from "../controllers/acudientes.controllers.js";
import { errorHandler, asyncHandler } from "../middlewares/errorHandler.js"; 
import { respuestaError, respuestaOK } from "../lib/responseModels.js";

const routerAcudiente = Router();

routerAcudiente.get("/acudientes", asyncHandler(async (req, res) => {
    let rows = await getAcudientes();
    res.json(respuestaOK(rows));
}));

routerAcudiente.get("/acudiente/:id", asyncHandler(async (req, res) => {
    let idAcudiente = parseInt(req.params['id']);
    if (isNaN(idAcudiente)){
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));      
    }
    let rows = await getAcudiente(idAcudiente);
    res.json(respuestaOK(rows));
}));

routerAcudiente.post("/acudiente", asyncHandler(async (req, res) => {
    const { TipoDoc_Acudiente, Numero_Doc_Acudiente, Nombre_Completo, Direccion, Telefono, Email, id_Parentesco } = req.body;
    
    // Validación de campos obligatorios
    if (!TipoDoc_Acudiente || !Numero_Doc_Acudiente || !Nombre_Completo || !Direccion || !Telefono || !Email || !id_Parentesco) {
        return res.status(400).json(respuestaError("Todos los campos son obligatorios."));  
    }

    try {
        let row = await insertAcudiente(TipoDoc_Acudiente, Numero_Doc_Acudiente, Nombre_Completo, Direccion, Telefono, Email, id_Parentesco);
        res.json(respuestaOK(row));
    } catch (error) {
        if (error?.name=="Custom error")
            return res.status(error.statusCode).json(respuestaError(error.message));  
        else
            errorHandler({status: 500, message: error.message}, req, res);
    }
}));

routerAcudiente.put("/acudiente/:id", asyncHandler(async (req, res) => {
    let idAcudiente = parseInt(req.params['id']);
    const { TipoDoc_Acudiente, Numero_Doc_Acudiente, Nombre_Completo, Direccion, Telefono, Email, id_Parentesco } = req.body;
    
    if (isNaN(idAcudiente)) {
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));      
    }

    if (!TipoDoc_Acudiente || !Numero_Doc_Acudiente || !Nombre_Completo || !Direccion || !Telefono || !Email || !id_Parentesco) {
        return res.status(400).json(respuestaError("Todos los campos son obligatorios."));  
    }
    try{
        let row = await updateAcudiente(idAcudiente, TipoDoc_Acudiente, Numero_Doc_Acudiente, Nombre_Completo, Direccion, Telefono, Email, id_Parentesco);
        res.json(respuestaOK("Update OK"));    
    } catch (error) {
        if (error?.name=="Custom error")
            return res.status(error.statusCode).json(respuestaError(error.message));  
        else
            errorHandler({status: 500, message: error.message}, req, res);
}
}));

routerAcudiente.delete("/acudiente/:id", asyncHandler(async (req, res) => {
    let idAcudiente = parseInt(req.params['id']);
    if (isNaN(idAcudiente)) {
        return res.status(400).json(respuestaError("El campo 'id' no es numérico."));      
    }
    
    await deleteAcudiente(idAcudiente);
    res.json(respuestaOK("Delete OK"));
}));

export default routerAcudiente;
