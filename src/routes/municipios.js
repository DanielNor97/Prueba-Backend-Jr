/**
 * routes/municipios.js
 */

const express = require("express");
const db = require("../db");

const router = express.Router();

// GET /api/municipios  — list all (optionally filter by estado)
router.get("/", (req, res) => {
  try {
    let data = db.getAll("municipios");
    if (req.query.c_estado) {
      data = data.filter((m) => m.c_estado === req.query.c_estado);
    }
    res.json({ data, total: data.length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/municipios/search/:nombre
router.get("/search/:nombre", (req, res) => {
  try {
    let results = db.search("municipios", "nombre", req.params.nombre);
    if (req.query.c_estado) {
      results = results.filter((m) => m.c_estado === req.query.c_estado);
    }
    res.json({ data: results, total: results.length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/municipios/:c_estado/:c_mnpio
router.get("/:c_estado/:c_mnpio", (req, res) => {
  try {
    const all = db.getAll("municipios");
    const muni = all.find(
      (m) => m.c_estado === req.params.c_estado && m.c_mnpio === req.params.c_mnpio
    );
    if (!muni) return res.status(404).json({ error: "Municipio no encontrado" });
    res.json({ data: muni });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/municipios
router.post("/", (req, res) => {
  try {
    const { c_mnpio, c_estado, nombre } = req.body;
    if (!c_mnpio || !c_estado || !nombre) {
      return res.status(400).json({ error: "Campos requeridos: c_mnpio, c_estado, nombre" });
    }
    const record = db.insert("municipios", { c_mnpio, c_estado, nombre });
    res.status(201).json({ data: record });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
