const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend Sicilia Soil funcionando 🚀" });
});

// Ruta raíz - para evitar Cannot GET /
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Sicilia Soil API is running 🚀",
    endpoints: {
      health: "/api/health",
      zones: "/api/zones",
      data: "/api/data (POST)",
    },
  });
});

// Datos simulados para las zonas
app.get("/api/zones", (req, res) => {
  const zones = [
    {
      zone: "norte",
      temperature: 22.5,
      humidity: 65,
      light: 850,
      timestamp: new Date(),
    },
    {
      zone: "sur",
      temperature: 24.2,
      humidity: 58,
      light: 920,
      timestamp: new Date(),
    },
    {
      zone: "este",
      temperature: 23.1,
      humidity: 62,
      light: 890,
      timestamp: new Date(),
    },
    {
      zone: "oeste",
      temperature: 21.8,
      humidity: 68,
      light: 780,
      timestamp: new Date(),
    },
  ];
  res.json(zones);
});

// POST para recibir datos
app.post("/api/data", (req, res) => {
  const { zone, temperature, humidity, light } = req.body;
  console.log(`📊 Datos recibidos - Zona: ${zone}, Temp: ${temperature}°C`);
  res.json({ message: "Datos recibidos", data: req.body });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
