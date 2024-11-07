import { dirname, join } from "path";
import { fileURLToPath } from "url";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import fs from "fs";
import https from "https";

import { TokenValidation } from "./middlewares/Token.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";

import routerAlergias from "./routes/alergias.routes.js";
import routerParentesco from "./routes/parentesco.routes.js";
import routerUsuarios from "./routes/usuarios.routes.js";
import routerAcudiente from "./routes/acudientes.routes.js";
import routerTipoFuncionario from "./routes/tipofuncionario.routes.js";
import routerAsistenciaPAE from "./routes/asistencia_pae.routes.js";
import routerTipoResultados from "./routes/tipo_resultados.routes.js";
import routerEstudiante from "./routes/estudiantes.routes.js";
import routerParametro from "./routes/parametro.routes.js";
import routerControlDocente from "./routes/control_docentes.routes.js";
import routercontrolestudiante from "./routes/control_estudiante.routes.js";
import routerControlFuncionario from "./routes/control_funcionarios.routes.js";

dotenv.config();
let PORT = process.env["PORT"];
let current_path = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(helmet()); //Asegura el servidor web express colocando cabeceras de respuesta HTTP

app.use(express.json()); //soporte de body JSON
app.use(cors()); //soporte de cors

//Carpeta publica: Acá va todo el frontend

app.use("/", express.static(join(current_path, "public")));

app.use(routerUsuarios); //login va primero

//start middleware
app.use(TokenValidation);

//start routes
app.use(routerAlergias);
app.use(routerParentesco);
app.use(routerAcudiente);
app.use(routerTipoFuncionario);
app.use(routerAsistenciaPAE);
app.use(routerTipoResultados);
app.use(routerEstudiante);
app.use(routerParametro);
app.use(routerControlDocente);
app.use(routercontrolestudiante);
app.use(routerControlFuncionario);

// Middleware para rutas no encontradas (404)
app.use(notFoundHandler);

// Middleware de manejo de errores (debe ir después de todas las rutas)
app.use(errorHandler);

// Manejo de errores no controlados
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.stack || err.message);
  // Aquí podrías enviar notificaciones, cerrar conexiones de base de datos, etc.
  process.exit(1); // Detener el proceso ya que el estado es inconsistente
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason.stack || reason);
  // Aquí podrías enviar notificaciones, cerrar conexiones de base de datos, etc.
  process.exit(1); // Detener el proceso para evitar comportamiento inesperado
});

/*app.listen(PORT,()=>{
    console.log(`Servidor web escuchando en el puerto ${PORT}`)
});*/

https
  .createServer(
    {
      cert: fs.readFileSync(join(current_path, "ssl/cert.pem")),
      key: fs.readFileSync(join(current_path, "ssl/key.pem")),
    },
    app
  )
  .listen(PORT, function () {
    console.log(`Servidor HTTPS escuchando en el puerto ${PORT}`);
  });
