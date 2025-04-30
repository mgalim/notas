# 📝 Notas App – Node.js + Express + Zod

Una API REST para crear, leer, actualizar y eliminar notas.  
Construida con Node.js, Express y validación usando Zod. Usa un archivo JSON como base de datos simulada. Está organizada con arquitectura tipo MVC y lista para escalar.

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- Zod
- JavaScript moderno (ES6+)
- JSON como mock DB
- Middleware CORS personalizado
- Archivo `api.http` para testing manual

## 📂 Estructura del proyecto

📁 src/  
├── controllers/ # Lógica de rutas y validaciones  
├── models/ # Modelo con lógica de negocio  
├── schemas/ # Validaciones con Zod  
├── utils/ # Funciones auxiliares  
├── middlewares/ # CORS middleware  
├── routes/ # Rutas Express  
├── notes.json # Base de datos simulada  
├── api.http # Pruebas manuales con REST Client  
└── index.js # Punto de entrada del servidor

## 🧩 Validación de notas

Las notas deben tener:

- `content`: string requerido
- `date`: fecha, por defecto `new Date()`
- `category`: array de categorías válidas (no vacío)
- `important`: booleano (default: `false`)

Categorías válidas:

[
"JavaScript", "Node.js", "Programación", "Arquitectura", "NPM",
"Herramientas", "Frameworks", "Frontend", "Backend",
"Bases de Datos", "HTML", "CSS", "React", "Express", "API"
]

## 🧪 Testeo con `api.http`

Usalo en VSCode con la extensión **REST Client** o en Postman/Insomnia:

## 🌐 Rutas disponibles

| Método | Ruta         | Descripción                      |
| ------ | ------------ | -------------------------------- |
| GET    | `/notes`     | Obtener todas las notas          |
| GET    | `/notes/:id` | Obtener una nota por ID          |
| POST   | `/notes`     | Crear una nueva nota             |
| PATCH  | `/notes/:id` | Actualizar una nota parcialmente |
| DELETE | `/notes/:id` | Eliminar una nota                |

## 🧠 Modelo

El modelo gestiona las notas usando `notes.json`.
Métodos disponibles:

- `getAll({ category })`
- `getById(id)`
- `create(input)`
- `update(id, input)`
- `delete(id)`

## ✍️ Controlador

El controlador se encarga de la lógica HTTP:

- Valida con Zod (`validateNote`, `validatePartialNote`)

## ✅ Instalación y uso

```bash
npm install
npm start
```
