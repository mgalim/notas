import { createConnection } from 'mysql2/promise';

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'notes',
};

const connection = await createConnection(config);

export class NoteModel {
  static async getAll({ category }) {
    try {
      let query = `SELECT 
        BIN_TO_UUID(n.id) AS id,
        n.content,
        n.rate,
        n.important,
        n.created_at,
        JSON_ARRAYAGG(c.category_name) AS categories
        FROM notes n
        LEFT JOIN notes_categories nc ON nc.note_id = n.id
        LEFT JOIN categories c ON c.id = nc.category_id
        GROUP BY n.id`;

      const params = [];

      if (category) {
        query += `
           HAVING JSON_CONTAINS(categories, JSON_QUOTE(?))
        `;
        params.push(category.toLowerCase());
      }
      const [notes] = await connection.query(query, params);
      return notes;
    } catch (error) {
      throw error.message;
    }
  }

  static async getById(id) {
    try {
      let query = `
    SELECT 
    BIN_TO_UUID(n.id) AS id,
    n.content,
    n.rate,
    n.important,
    n.created_at,
    JSON_ARRAYAGG(c.category_name) AS categories
    FROM notes n
    LEFT JOIN notes_categories nc ON nc.note_id = n.id
    LEFT JOIN categories c ON c.id = nc.category_id
    WHERE n.id = UUID_TO_BIN(?)
    GROUP BY n.id`;

      const [result] = await connection.query(query, [id]);
      return result[0] || null;
    } catch (error) {
      throw error.sqlMessage;
    }
  }

  static async create(input) {
    const { content, rate, important, category } = input;

    let query = `INSERT INTO notes (content,rate,important)
 VALUES (?,?,?)`;

    await connection.query(query, [content, rate, important]);

    const [rows] = await connection.execute(
      `
    SELECT BIN_TO_UUID(id) AS id, content, rate, important, created_at 
    FROM notes 
    WHERE content = ? 
    ORDER BY created_at DESC 
    LIMIT 1;
  `,
      [content],
    );

    const insertedNote = rows[0];
    return insertedNote;
  }

  static async update(id, input) {}

  static async delete(id) {}
}
