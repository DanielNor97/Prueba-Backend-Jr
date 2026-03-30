/**
 * routes/estados.js
 */

const express = require("express");
const db = require("../db");

const router = express.Router();

// GET /api/estados  — list all
router.get("/", (req, res) => {
  try {
    res.json({ data: db.getAll("estados"), total: db.getAll("estados").length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/estados/:c_estado  — get one by SEPOMEX code
router.get("/:c_estado", (req, res) => {
  try {
    const estado = db.findById("estados", "c_estado", req.params.c_estado);
    if (!estado) return res.status(404).json({ error: "Estado no encontrado" });
    res.json({ data: estado });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/estados/search/:nombre  — search by name
router.get("/search/:nombre", (req, res) => {
  try {
    const results = db.search("estados", "nombre", req.params.nombre);
    res.json({ data: results, total: results.length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/estados  — add new
router.post("/", (req, res) => {
  try {
    const { c_estado, nombre } = req.body;
    if (!c_estado || !nombre) {
      return res.status(400).json({ error: "Campos requeridos: c_estado, nombre" });
    }
    // Check duplicate
    if (db.findById("estados", "c_estado", c_estado)) {
      return res.status(409).json({ error: "c_estado ya existe" });
    }
    const record = db.insert("estados", { c_estado, nombre });
    res.status(201).json({ data: record });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
