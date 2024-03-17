require("./src/data/database");
const express = require("express");
const dotEnv = require("dotenv");
const connectToDatbase = require("./src/data/database");
connectToDatbase();

const app = express();
dotEnv.config();

const user = require("./src/routes/UserRoutes");


app.use('/create-user', user)

const PORT = 8080;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
