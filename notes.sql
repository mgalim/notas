-- Script para la crearción de la base de datos
DROP DATABASE IF EXISTS notes;
CREATE DATABASE IF NOT EXISTS notes;
USE notes;

-- Tabla de notas
CREATE TABLE IF NOT EXISTS notes (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    content TEXT NOT NULL,
    rate DECIMAL(3,1) NOT NULL,
    important BOOLEAN NOT NULL DEFAULT FALSE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(60) NOT NULL UNIQUE
);

-- Tabla de relación muchos a muchos notes_categories
CREATE TABLE IF NOT EXISTS notes_categories (
    note_id BINARY(16) NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (note_id, category_id),
    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Insertar las categorias
INSERT INTO categories (category_name) VALUES
('arquitectura'),
('herramientas'),
('frameworks'),
('frontend'),
('backend'),
('bases de datos');

-- Insertar notas
INSERT INTO notes (id, content, rate, important) VALUES
(default, 'Podemos hacer casi cualquier cosa con JavaScript', 10, TRUE),
(default, 'Node.js utiliza la arquitectura Single Threaded Event Loop', 7.1, TRUE),
(default, 'NPM es el gestor de paquetes de Node.js.', 8.4, FALSE),
(default, 'Express.js es un framework de aplicaciones web Node.js', 6.3, TRUE);

-- Insertar valores en tabla notes_categories
INSERT INTO notes_categories (note_id, category_id) VALUES
((SELECT id FROM notes WHERE rate = 10 ), 4),
((SELECT id FROM notes WHERE rate = 10 ), 5),
((SELECT id FROM notes WHERE rate = 7.1 ),1),
((SELECT id FROM notes WHERE rate = 7.1 ),5),
((SELECT id FROM notes WHERE rate = 8.4 ),2),
((SELECT id FROM notes WHERE rate = 6.3 ),3),
((SELECT id FROM notes WHERE rate = 6.3 ),5);

SELECT BIN_TO_UUID(id) AS id, content, rate,important, created_at FROM notes;
