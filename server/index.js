const express = require("express");
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

// Hacer que node sirva los archivos de nuestro app React
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Manejar las peticiones GET en la ruta /api
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/user/search/:query", async (req, res) => {
    const { query } = req.params;
  
    try {
      console.log(5);
      const fetch = await import("node-fetch"); // Importar dinámicamente node-fetch
      const response = await fetch.default(`https://torre.ai/api/suite/people/name-suggestions?query=${query}&offset=0&limit=20`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "An error occurred." });
    }
  });
  
  app.get("/user/:username", async (req, res) => {
    const { username } = req.params;
  
    try {
      const fetch = await import("node-fetch"); // Importar dinámicamente node-fetch
      const response = await fetch.default(`https://torre.bio/api/bios/${username}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "An error occurred." });
    }
  });

// Todas las peticiones GET que no hayamos manejado en las líneas anteriores retornaran nuestro app React
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});