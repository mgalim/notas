# 📝 Notas App – Node.js + Express + Zod

Una API REST para crear, leer, actualizar y eliminar notas.  
Construida con Node.js, Express y validación usando Zod. Soporta múltiples estrategias de persistencia: JSON local, MySQL ,MongoDB y Mongoose. Está organizada con arquitectura tipo MVC y lista para escalar.

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- Zod
- JavaScript moderno (ES6+)
- Soporte para:
  - JSON como mock DB
  - MySQL
  - MongoDB driver puto
  - MongoDB Mongoose
- Middleware CORS personalizado
- Archivo `api.http` para testing manual

## 📂 Estructura del proyecto

📁 root/  
├── controllers/ # Lógica de rutas y validaciones  
├── models/ # Acceso a datos (JSON, MySQL o Mongo)  
├── schemas/ # Validaciones con Zod  
├── utils/ # Funciones auxiliares  
├── middlewares/ # Middlewares personalizados  
├── routes/ # Rutas Express  
├── notes.json # Base de datos local simulada (opcional)  
├── api.http # Pruebas manuales con REST Client  
└── app.js # Punto de entrada del servidor

## 🧩 Validación de notas

Las notas deben tener:

- `content`: string requerido
- `categories`: array de categorías válidas (no vacío)
- `important`: booleano (default: `false`)
- `rate`: número opcional para puntuación
- `created_at`: fecha actual por defecto.

## 🌐 Rutas disponibles

| Método | Ruta         | Descripción                                                 |
| ------ | ------------ | ----------------------------------------------------------- |
| GET    | `/notes`     | Obtener todas las notas (con filtro opcional por categoría) |
| GET    | `/notes/:id` | Obtener una nota por ID                                     |
| POST   | `/notes`     | Crear una nueva nota                                        |
| PATCH  | `/notes/:id` | Actualizar parcialmente una nota                            |
| DELETE | `/notes/:id` | Eliminar una nota                                           |

## 🧪 Testeo

Podés testear la API con Postman, Insomnia o usando el archivo api.http con la extensión REST Client de VSCode.

## 🧠 Notas finales

Según la configuración, el modelo puede trabajar con un archivo JSON, una base MySQL , una colección MongoDB puro o bien una creada con Mongoose.
Ideal para comparar distintas estrategias de persistencia o adaptar fácilmente a producción.
Se deja un script con ejemplos para subir a la db mysql.
Deberán crear un archivo .env con el string connection para que funcione en mongoDB.

## ✅ Instalación y uso

```bash
npm install
npm start (por defecto se ejecuta mongodb en produccion)
npm start:mysql (db mysql en local)
npm start:local (json mock)
npm start:mongoose (db mongodb con Mongoose)
```
