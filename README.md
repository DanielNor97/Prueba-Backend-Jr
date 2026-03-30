# SEPOMEX API

API REST de información postal mexicana (Estados, Municipios, Colonias).  
Construida con **Node.js + Express**, sin base de datos — usa archivos JSON locales.

## 🚀 Inicio rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Poblar datos (solo la primera vez)
npm run seed

# 3. Iniciar servidor
npm start
```

Abre http://localhost:3000 en tu navegador.

## 🔑 Autenticación

Todas las rutas `/api/*` requieren API key.

```
Header: X-API-Key: demo-key-123
```

O como query param: `?api_key=demo-key-123`

## 📡 Endpoints

### Estados
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/estados` | Lista todos los estados |
| GET | `/api/estados/:c_estado` | Obtiene un estado por código |
| GET | `/api/estados/search/:nombre` | Busca estados por nombre |
| POST | `/api/estados` | Crea un nuevo estado |

### Municipios
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/municipios` | Lista municipios (filtra con `?c_estado=09`) |
| GET | `/api/municipios/:c_estado/:c_mnpio` | Obtiene municipio por ID |
| GET | `/api/municipios/search/:nombre` | Busca por nombre |
| POST | `/api/municipios` | Crea nuevo municipio |

### Colonias
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/colonias` | Lista colonias (filtra con `?cp=06000`) |
| GET | `/api/colonias/cp/:codigo` | **Busca por Código Postal** (con nombre de municipio/estado) |
| GET | `/api/colonias/search/:nombre` | Busca colonias por nombre |
| GET | `/api/colonias/:id` | Obtiene colonia por ID |
| POST | `/api/colonias` | Crea nueva colonia |

## 🧪 Ejemplos con curl

```bash
# Buscar por CP
curl http://localhost:3000/api/colonias/cp/06000 -H "X-API-Key: demo-key-123"

# Buscar estado
curl http://localhost:3000/api/estados/search/jalisco -H "X-API-Key: demo-key-123"

# Municipios de CDMX
curl "http://localhost:3000/api/municipios?c_estado=09" -H "X-API-Key: demo-key-123"

# Crear colonia
curl -X POST http://localhost:3000/api/colonias \
  -H "X-API-Key: demo-key-123" \
  -H "Content-Type: application/json" \
  -d '{"id_asenta_cpcons":"9999","d_codigo":"06001","d_asenta":"Mi Colonia","c_estado":"09","c_mnpio":"006"}'
```

## 📁 Estructura del proyecto

```
sepomex-api/
├── src/
│   ├── server.js          # Punto de entrada
│   ├── seed.js            # Script de datos iniciales
│   ├── db.js              # Capa de acceso a datos (JSON)
│   ├── auth.js            # Middleware de API key
│   └── routes/
│       ├── estados.js
│       ├── municipios.js
│       └── colonias.js
├── public/
│   └── index.html         # Frontend responsive
├── data/                  # Generado por seed.js
│   ├── estados.json
│   ├── municipios.json
│   └── colonias.json
└── package.json
```

## 📝 Notas

- Los datos persisten en `/data/*.json` — editar directamente o via API POST.
- Para agregar los ~140k registros reales de SEPOMEX, descarga el catálogo oficial en  
  https://www.correosdemexico.gob.mx/SSLServicios/ConsultaCP/Descarga.aspx  
  y adapta `seed.js` para parsear el archivo `.txt` tabulado.
