import { Router } from "express";
import {  asyncHandler } from "../middlewares/errorHandler.js"; 
import { respuestaError, respuestaOK } from "../lib/responseModels.js";
import { insertAsistenciaPAE, recibirReportePAE, validarAlmuerzoHoyEstudiantePAE, validarEstudiantePAE } from "../controllers/asistenciapae.controllers.js";

const routerAsistenciaPAE = Router();

routerAsistenciaPAE.post('/registrarAsistencia', asyncHandler(async (req, res) => {
    const { numDocumento } = req.body;
    // Realiza las validaciones necesarias...
    if (!numDocumento) {
        return res.status(400).json(respuestaError("Número del Documento es requerido."));
    }
    try {
          // Procesar el registro de asistencia... 
        let infoestudiante = await validarEstudiantePAE(numDocumento)
        await validarAlmuerzoHoyEstudiantePAE(infoestudiante.id_estudiante)
        insertAsistenciaPAE(infoestudiante.id_estudiante)
         
        let NombreEstudiante = infoestudiante.nombre_completo
        return res.status(200).json(respuestaOK(`Asistencia del estudiante '${NombreEstudiante}' con tipo de documento ${infoestudiante.tipodoc_estudiante} y número del documento '${numDocumento}' registrada con éxito.`));
    } catch (error) {
        if (error?.name=="DatabaseError")
            return res.status(error.statusCode).json(respuestaError(error.message));  
        else
            errorHandler({status: 500, message: error.message}, req, res);    }
}));

routerAsistenciaPAE.post('/reportPAE', asyncHandler(async (req, res) => {
    const { reportes } = req.body

    if (!reportes){
        return res.status(400).json(respuestaError('Nombre de reporte requerido'));
    }

    try {
        let reporteEstudiante = await recibirReportePAE(numDocumento)
        return res.json(datosReporte)
    }catch{
        return res.status(200).json(respuestaError('Error al encontrar el reporte'))
    }
}));

export default routerAsistenciaPAE;


