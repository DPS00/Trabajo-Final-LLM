import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import clothesRoutes from "./routes/clothesRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";


// Conexión BD
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/gestoclothes');

const app = express();
app.use(express.json());

// Habilitar bodyparser (de esta manera podemos leer "form-data" como "x-www-form-ulrencoded")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Habilitar cors
app.use(cors());

// Rutas
app.use("/api", clothesRoutes);
app.use("/api", categoriesRoutes);
app.use("/api", usersRoutes);

// Puerto
app.listen(8800, () => {
  console.log("Connected!");
});