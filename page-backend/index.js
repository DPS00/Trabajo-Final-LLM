import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import bookRoutes from "./routes/bookRoutes.js";


// Conexión BD
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/libraryDB');

const app = express();
app.use(express.json());

// Habilitar bodyparser (de esta manera podemos leer "form-data" como "x-www-form-ulrencoded")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Habilitar cors
app.use(cors());

// Rutas
app.use("/api", bookRoutes);

// Puerto
app.listen(8800, () => {
  console.log("Connected!");
});