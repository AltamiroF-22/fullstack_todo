// Importações
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDatabase = require("./src/data/database");
//routes
const userRoutes = require("./src/routes/UserRoutes");

// Configurações iniciais
const app = express();
app.use(cors());

dotenv.config();
connectToDatabase();

// Middlewares
app.use(express.json());

// Rotas
app.use("/", userRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
