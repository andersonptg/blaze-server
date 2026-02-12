const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let doubleCache = [];

// Recebe dados da extensão
app.post("/double", (req, res) => {
  const novoResultado = req.body;

  doubleCache.unshift(novoResultado);

  if (doubleCache.length > 50) {
    doubleCache.pop();
  }

  console.log("Novo resultado recebido:", novoResultado);

  res.json({ status: "ok" });
});

// Retorna histórico
app.get("/double", (req, res) => {
  res.json(doubleCache);
});

app.get("/", (req, res) => {
  res.send("Servidor Blaze WebSocket Online 🚀");
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
