const mongoose = require("mongoose");
require('dotenv').config()

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASSW}@altamirojunior.ajajg15.mongodb.net/?retryWrites=true&w=majority&appName=AltamiroJunior`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Conectado ao banco de dados com sucesso!");
  } catch (err) {
    console.error("Erro ao conectar com o banco de dados:", err);
  }
};

module.exports = connectToDatabase;
