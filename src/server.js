/**
 * server.js
 * Entry point — Express app with all routes and middleware.
 */

const express = require("express");
const cors    = require("cors");
const path    = require("path");

const apiKeyAuth  = require("./auth");
const estadosRoutes    = require("./routes/estados");
const municipiosRoutes = require("./routes/municipios");
const coloniasRoutes   = require("./routes/colonias");

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Serve the frontend HTML from /public
app.use(express.static(path.join(__dirname, "../public")));

// API key auth applies to all /api/* routes
app.use("/api", apiKeyAuth);

// ── API Routes ────────────────────────────────────────────────────────────────
app.use("/api/estados",    estadosRoutes);
app.use("/api/municipios", municipiosRoutes);
app.use("/api/colonias",   coloniasRoutes);

// ── API index ─────────────────────────────────────────────────────────────────
app.get("/api", (req, res) => {
  res.json({
    name:    "SEPOMEX API",
    version: "1.0.0",
    auth:    "X-API-Key header required for all /api/* endpoints",
    demo_key: "demo-key-123",
    endpoints: {
      estados: {
        list:   "GET  /api/estados",
        get:    "GET  /api/estados/:c_estado",
        search: "GET  /api/estados/search/:nombre",
        create: "POST /api/estados",
      },
      municipios: {
        list:      "GET  /api/municipios?c_estado=09",
        get:       "GET  /api/municipios/:c_estado/:c_mnpio",
        search:    "GET  /api/municipios/search/:nombre",
        create:    "POST /api/municipios",
      },
      colonias: {
        list:    "GET  /api/colonias?cp=06000",
        byCP:    "GET  /api/colonias/cp/:codigo",
        search:  "GET  /api/colonias/search/:nombre",
        get:     "GET  /api/colonias/:id",
        create:  "POST /api/colonias",
      },
    },
  });
});

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 SEPOMEX API corriendo en http://localhost:${PORT}`);
  console.log(`📄 Frontend:  http://localhost:${PORT}`);
  console.log(`🔌 API docs:  http://localhost:${PORT}/api`);
  console.log(`🔑 API key:   demo-key-123\n`);
});
