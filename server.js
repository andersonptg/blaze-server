const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

let doubleCache = [];

// Função para atualizar resultados
async function atualizarDouble() {
  try {
    const response = await axios.get(
      "https://blaze.com/api/roulette_games/recent",
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Accept": "application/json",
          "Referer": "https://blaze.com/"
        },
        timeout: 10000
      }
    );

    doubleCache = response.data;
    console.log("Double atualizado:", new Date().toLocaleTimeString());
  } catch (err) {
    if (err.response) {
      console.log("Erro ao atualizar:", err.response.status);
    } else {
      console.log("Erro ao atualizar:", err.message);
    }
  }
}

// Atualiza a cada 5 segundos
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
