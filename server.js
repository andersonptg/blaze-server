const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

let doubleCache = [];

async function atualizarDouble() {
  try {
    const response = await axios.get(
      "https://blaze.com/api/roulette_games/recent"
    );
    doubleCache = response.data;
    console.log("Double atualizado:", new Date().toLocaleTimeString());
  } catch (err) {
    console.log("Erro ao atualizar:", err.message);
  }
}

// Atualiza a cada 05 segundos
setInterval(atualizarDouble, 5000);

// Rota principal
app.get("/", (req, res) => {
  res.send("Servidor Blaze Online 24h 🚀");
});

// Rota double
app.get("/double", (req, res) => {
  res.json(doubleCache);
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
  atualizarDouble();
});
