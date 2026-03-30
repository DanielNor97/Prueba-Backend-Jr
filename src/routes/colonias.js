/**
 * routes/colonias.js
 */

const express = require("express");
const db = require("../db");

const router = express.Router();

// GET /api/colonias  — list all (optional filters: c_estado, c_mnpio, d_codigo/CP)
router.get("/", (req, res) => {
  try {
    let data = db.getAll("colonias");
    if (req.query.c_estado) data = data.filter((c) => c.c_estado === req.query.c_estado);
    if (req.query.c_mnpio)  data = data.filter((c) => c.c_mnpio  === req.query.c_mnpio);
    if (req.query.cp)       data = data.filter((c) => c.d_codigo === req.query.cp);
    res.json({ data, total: data.length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/colonias/cp/:codigo  — search by postal code (SEPOMEX d_codigo)
router.get("/cp/:codigo", (req, res) => {
  try {
    const colonias = db.getAll("colonias").filter(
      (c) => c.d_codigo === req.params.codigo
    );
    if (!colonias.length) {
      return res.status(404).json({ error: `No se encontraron colonias para CP ${req.params.codigo}` });
    }

    // Enrich with municipio and estado names
    const municipios = db.getAll("municipios");
    const estados    = db.getAll("estados");

    const enriched = colonias.map((col) => {
      const muni   = municipios.find((m) => m.c_mnpio === col.c_mnpio && m.c_estado === col.c_estado);
      const estado = estados.find((e) => e.c_estado === col.c_estado);
      return {
        ...col,
        municipio: muni?.nombre   || null,
        estado:    estado?.nombre || null,
      };
    });

    res.json({ data: enriched, total: enriched.length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/colonias/search/:nombre  — search by colonia name
router.get("/search/:nombre", (req, res) => {
  try {
    const results = db.search("colonias", "d_asenta", req.params.nombre);
    res.json({ data: results, total: results.length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/colonias/:id  — get single by id_asenta_cpcons
router.get("/:id", (req, res) => {
  try {
    const col = db.findById("colonias", "id_asenta_cpcons", req.params.id);
    if (!col) return res.status(404).json({ error: "Colonia no encontrada" });
    res.json({ data: col });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/colonias
router.post("/", (req, res) => {
  try {
    const { id_asenta_cpcons, d_codigo, d_asenta, d_tipo_asenta, c_estado, c_mnpio } = req.body;
    if (!id_asenta_cpcons || !d_codigo || !d_asenta || !c_estado || !c_mnpio) {
      return res.status(400).json({
        error: "Campos requeridos: id_asenta_cpcons, d_codigo, d_asenta, c_estado, c_mnpio",
      });
    }
    if (db.findById("colonias", "id_asenta_cpcons", id_asenta_cpcons)) {
      return res.status(409).json({ error: "id_asenta_cpcons ya existe" });
    }
    const record = db.insert("colonias", {
      id_asenta_cpcons,
      d_codigo,
      d_asenta,
      d_tipo_asenta: d_tipo_asenta || "Colonia",
      c_estado,
      c_mnpio,
    });
    res.status(201).json({ data: record });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
