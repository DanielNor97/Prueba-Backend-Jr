/**
 * seed.js
 * Populates the local JSON "database" with SEPOMEX postal data.
 * Run once: node src/seed.js
 *
 * Data structure mirrors SEPOMEX's official identifiers:
 *  - Estado: c_estado
 *  - Municipio: c_mnpio (unique within estado)
 *  - Colonia: id_asenta_cpcons (unique within CP)
 */

const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "../data");

// ── helpers ──────────────────────────────────────────────────────────────────
function save(filename, data) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2));
  console.log(`✔  ${filename}  (${data.length} records)`);
}

// ── Estados (SEPOMEX c_estado codes) ─────────────────────────────────────────
const estados = [
  { c_estado: "01", nombre: "Aguascalientes" },
  { c_estado: "02", nombre: "Baja California" },
  { c_estado: "03", nombre: "Baja California Sur" },
  { c_estado: "04", nombre: "Campeche" },
  { c_estado: "05", nombre: "Coahuila de Zaragoza" },
  { c_estado: "06", nombre: "Colima" },
  { c_estado: "07", nombre: "Chiapas" },
  { c_estado: "08", nombre: "Chihuahua" },
  { c_estado: "09", nombre: "Ciudad de México" },
  { c_estado: "10", nombre: "Durango" },
  { c_estado: "11", nombre: "Guanajuato" },
  { c_estado: "12", nombre: "Guerrero" },
  { c_estado: "13", nombre: "Hidalgo" },
  { c_estado: "14", nombre: "Jalisco" },
  { c_estado: "15", nombre: "México" },
  { c_estado: "16", nombre: "Michoacán de Ocampo" },
  { c_estado: "17", nombre: "Morelos" },
  { c_estado: "18", nombre: "Nayarit" },
  { c_estado: "19", nombre: "Nuevo León" },
  { c_estado: "20", nombre: "Oaxaca" },
  { c_estado: "21", nombre: "Puebla" },
  { c_estado: "22", nombre: "Querétaro" },
  { c_estado: "23", nombre: "Quintana Roo" },
  { c_estado: "24", nombre: "San Luis Potosí" },
  { c_estado: "25", nombre: "Sinaloa" },
  { c_estado: "26", nombre: "Sonora" },
  { c_estado: "27", nombre: "Tabasco" },
  { c_estado: "28", nombre: "Tamaulipas" },
  { c_estado: "29", nombre: "Tlaxcala" },
  { c_estado: "30", nombre: "Veracruz de Ignacio de la Llave" },
  { c_estado: "31", nombre: "Yucatán" },
  { c_estado: "32", nombre: "Zacatecas" },
];

// ── Municipios ────────────────────────────────────────────────────────────────
const municipios = [
  // CDMX
  { c_mnpio: "001", c_estado: "09", nombre: "Álvaro Obregón" },
  { c_mnpio: "002", c_estado: "09", nombre: "Azcapotzalco" },
  { c_mnpio: "003", c_estado: "09", nombre: "Benito Juárez" },
  { c_mnpio: "004", c_estado: "09", nombre: "Coyoacán" },
  { c_mnpio: "005", c_estado: "09", nombre: "Cuajimalpa de Morelos" },
  { c_mnpio: "006", c_estado: "09", nombre: "Cuauhtémoc" },
  { c_mnpio: "007", c_estado: "09", nombre: "Gustavo A. Madero" },
  { c_mnpio: "008", c_estado: "09", nombre: "Iztacalco" },
  { c_mnpio: "009", c_estado: "09", nombre: "Iztapalapa" },
  { c_mnpio: "010", c_estado: "09", nombre: "La Magdalena Contreras" },
  { c_mnpio: "011", c_estado: "09", nombre: "Miguel Hidalgo" },
  { c_mnpio: "012", c_estado: "09", nombre: "Milpa Alta" },
  { c_mnpio: "013", c_estado: "09", nombre: "Tláhuac" },
  { c_mnpio: "014", c_estado: "09", nombre: "Tlalpan" },
  { c_mnpio: "015", c_estado: "09", nombre: "Venustiano Carranza" },
  { c_mnpio: "016", c_estado: "09", nombre: "Xochimilco" },
  // Jalisco
  { c_mnpio: "039", c_estado: "14", nombre: "Guadalajara" },
  { c_mnpio: "098", c_estado: "14", nombre: "Zapopan" },
  { c_mnpio: "070", c_estado: "14", nombre: "San Pedro Tlaquepaque" },
  { c_mnpio: "101", c_estado: "14", nombre: "Tonalá" },
  // Nuevo León
  { c_mnpio: "039", c_estado: "19", nombre: "Monterrey" },
  { c_mnpio: "018", c_estado: "19", nombre: "Guadalupe" },
  { c_mnpio: "006", c_estado: "19", nombre: "San Nicolás de los Garza" },
  // Puebla
  { c_mnpio: "114", c_estado: "21", nombre: "Puebla" },
  { c_mnpio: "041", c_estado: "21", nombre: "Cholula de Rivadabia" },
];

// ── Colonias ──────────────────────────────────────────────────────────────────
// Each colonia includes a CP (código postal) and SEPOMEX identifiers
const colonias = [
  // CDMX - Cuauhtémoc (06)
  { id_asenta_cpcons: "0001", d_codigo: "06000", d_asenta: "Centro", d_tipo_asenta: "Colonia", c_estado: "09", c_mnpio: "006" },
  { id_asenta_cpcons: "0002", d_codigo: "06020", d_asenta: "Doctores", d_tipo_asenta: "Colonia", c_estado: "09", c_mnpio: "006" },
  { id_asenta_cpcons: "0003", d_codigo: "06040", d_asenta: "Guerrero", d_tipo_asenta: "Colonia", c_estado: "09", c_mnpio: "006" },
  { id_asenta_cpcons: "0004", d_codigo: "06060", d_asenta: "Morelos", d_tipo_asenta: "Colonia", c_estado: "09", c_mnpio: "006" },
  { id_asenta_cpcons: "0005", d_codigo: "06080", d_asenta: "Tepito", d_tipo_asenta: "Colonia", c_estado: "09", c_mnpio: "006" },
  { id_asenta_cpcons: "0006", d_codigo: "06100", d_asenta: "Peralvillo", d_tipo_asenta: "Colonia", c_estado: "09", c_mnpio: "006" },
  { id_asenta_cpcons: "0007", d_codigo: "06170", d_asenta: "Buenavista", d_tipo_asenta: "Colonia", c_estado: "09", c_mnpio: "006" },
  // CDMX - Benito Juárez (003)
  { id_asenta_cpcons: "0008", d_codigo: "03020", d_asenta: "Del Valle Centro", d_tipo_asenta: "Colonia", c_estado: "09", c_mnpio: "003" },
  { id_asenta_cpcons: "0009", d_codigo: "03100", d_asenta: "Narvarte Poniente", d_tipo_asenta: "Colonia", c_estado: "09", c_mnpio: "003" },
  { id_asenta_cpcons: "0010", d_codigo: "03200", d_asenta: "Nápoles", d_tipo_asenta: "Colonia", c_estado: "09", c_mnpio: "003" },
  { id_asenta_cpcons: "0011", d_codigo: "03300", d_asenta: "Insurgentes Mixcoac", d_tipo_asenta: "Colonia", c_estado: "09", c_mnpio: "003" },
  { id_asenta_cpcons: "0012", d_codigo: "03400", d_asenta: "Mixcoac", d_tipo_asenta: "Colonia", c_estado: "09", c_mnpio: "003" },
  // CDMX - Miguel Hidalgo (011)
  { id_asenta_cpcons: "0013", d_codigo: "11000", d_asenta: "Lomas de Chapultepec I Sección", d_tipo_asenta: "Colonia", c_estado: "09", c_mnpio: "011" },
  { id_asenta_cpcons: "0014", d_codigo: "11040", d_asenta: "Polanco I Sección", d_tipo_asenta: "Colonia", c_estado: "09", c_mnpio: "011" },
  { id_asenta_cpcons: "0015", d_codigo: "11500", d_asenta: "San Miguel Chapultepec I Sección", d_tipo_asenta: "Colonia", c_estado: "09", c_mnpio: "011" },
  { id_asenta_cpcons: "0016", d_codigo: "11550", d_asenta: "Tacubaya", d_tipo_asenta: "Colonia", c_estado: "09", c_mnpio: "011" },
  // CDMX - Coyoacán (004)
  { id_asenta_cpcons: "0017", d_codigo: "04000", d_asenta: "Coyoacán", d_tipo_asenta: "Colonia", c_estado: "09", c_mnpio: "004" },
  { id_asenta_cpcons: "0018", d_codigo: "04100", d_asenta: "Del Carmen", d_tipo_asenta: "Colonia", c_estado: "09", c_mnpio: "004" },
  { id_asenta_cpcons: "0019", d_codigo: "04310", d_asenta: "Copilco El Alto", d_tipo_asenta: "Colonia", c_estado: "09", c_mnpio: "004" },
  // Jalisco - Guadalajara
  { id_asenta_cpcons: "0020", d_codigo: "44100", d_asenta: "Centro", d_tipo_asenta: "Colonia", c_estado: "14", c_mnpio: "039" },
  { id_asenta_cpcons: "0021", d_codigo: "44130", d_asenta: "Analco", d_tipo_asenta: "Colonia", c_estado: "14", c_mnpio: "039" },
  { id_asenta_cpcons: "0022", d_codigo: "44160", d_asenta: "Mezquitán Country", d_tipo_asenta: "Colonia", c_estado: "14", c_mnpio: "039" },
  { id_asenta_cpcons: "0023", d_codigo: "44200", d_asenta: "Americana", d_tipo_asenta: "Colonia", c_estado: "14", c_mnpio: "039" },
  { id_asenta_cpcons: "0024", d_codigo: "44280", d_asenta: "Providencia 1a Sección", d_tipo_asenta: "Colonia", c_estado: "14", c_mnpio: "039" },
  // Jalisco - Zapopan
  { id_asenta_cpcons: "0025", d_codigo: "45050", d_asenta: "Ciudad Granja", d_tipo_asenta: "Colonia", c_estado: "14", c_mnpio: "098" },
  { id_asenta_cpcons: "0026", d_codigo: "45070", d_asenta: "Jardines de la Cruz", d_tipo_asenta: "Colonia", c_estado: "14", c_mnpio: "098" },
  { id_asenta_cpcons: "0027", d_codigo: "45116", d_asenta: "Las Águilas", d_tipo_asenta: "Colonia", c_estado: "14", c_mnpio: "098" },
  // Nuevo León - Monterrey
  { id_asenta_cpcons: "0028", d_codigo: "64000", d_asenta: "Centro", d_tipo_asenta: "Colonia", c_estado: "19", c_mnpio: "039" },
  { id_asenta_cpcons: "0029", d_codigo: "64010", d_asenta: "Obispado", d_tipo_asenta: "Colonia", c_estado: "19", c_mnpio: "039" },
  { id_asenta_cpcons: "0030", d_codigo: "64020", d_asenta: "Independencia", d_tipo_asenta: "Colonia", c_estado: "19", c_mnpio: "039" },
  { id_asenta_cpcons: "0031", d_codigo: "64060", d_asenta: "Mitras Centro", d_tipo_asenta: "Colonia", c_estado: "19", c_mnpio: "039" },
  // Puebla
  { id_asenta_cpcons: "0032", d_codigo: "72000", d_asenta: "Centro", d_tipo_asenta: "Colonia", c_estado: "21", c_mnpio: "114" },
  { id_asenta_cpcons: "0033", d_codigo: "72020", d_asenta: "La Paz", d_tipo_asenta: "Colonia", c_estado: "21", c_mnpio: "114" },
  { id_asenta_cpcons: "0034", d_codigo: "72040", d_asenta: "Azcarate", d_tipo_asenta: "Colonia", c_estado: "21", c_mnpio: "114" },
];

save("estados.json", estados);
save("municipios.json", municipios);
save("colonias.json", colonias);

console.log("\n✅ Seed completado. Archivos guardados en /data");
