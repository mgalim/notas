import { createConnection } from 'mysql2/promise';

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'notes',
};

let connection;

try {
  connection = await createConnection(config);
} catch (error) {
  console.log('Error al conectar a MySQL: ', error.code);
}

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
      console.log(error);
      throw new Error('Error al obtener las notas');
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
      console.log(error);
      throw new Error('Error al obtener la nota');
    }
  }

  static async create(input) {
    const { content, rate, important, categories } = input;

    try {
      await connection.beginTransaction();

      const [uuidResult] = await connection.query('SELECT UUID() uuid;');
      const [{ uuid }] = uuidResult;

      const insertQuery = `
      INSERT INTO notes (id,content, rate, important)
      VALUES (UUID_TO_BIN(?),?, ?, ?)
    `;
      await connection.query(insertQuery, [uuid, content, rate, important]);

      for (const category of categories) {
        const [categoryResult] = await connection.execute(
          'SELECT id FROM categories WHERE category_name = ?;',
          [category.toLowerCase()],
        );

        if (categoryResult.length > 0) {
          const categoryId = categoryResult[0].id;
          await connection.query(
            'INSERT INTO notes_categories (note_id, category_id) VALUES (UUID_TO_BIN(?), ?);',
            [uuid, categoryId],
          );
        }
      }
      await connection.commit();

      const [notes] = await connection.query(
        `SELECT BIN_TO_UUID(id) id, content, rate, important, created_at
          FROM notes WHERE id = UUID_TO_BIN(?);`,
        [uuid],
      );

      return { ...notes[0], categories };
    } catch (error) {
      await connection.rollback();
      console.log(error);
      throw new Error('Error creando nota');
      // TODO: implementar servicio interno sendLog(e)
    }
  }

  static async update(id, input) {
    const updates = [];
    const params = [];

    try {
      for (const [key, value] of Object.entries(input)) {
        if (key !== 'categories') {
          updates.push(`${key} = ?`);
          params.push(value);
        }
      }
      if (updates.length > 0) {
        await connection.query(
          `UPDATE notes
        SET ${updates.join(', ')}
        WHERE id = UUID_TO_BIN('${id}')
      `,
          params,
        );
      }

      if (input.categories) {
        await connection.query(
          `DELETE FROM notes_categories WHERE note_id = UUID_TO_BIN(?)`,
          [id],
        );

        for (const category of input.categories) {
          const [categoryResult] = await connection.execute(
            'SELECT id FROM categories WHERE category_name = ?;',
            [category.toLowerCase()],
          );

          if (categoryResult.length > 0) {
            const categoryId = categoryResult[0].id;
            await connection.query(
              'INSERT INTO notes_categories (note_id, category_id) VALUES (UUID_TO_BIN(?), ?);',
              [id, categoryId],
            );
          }
        }
      }

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

      return result[0] || false;
    } catch (error) {
      console.log(error.message);
      throw new Error('Error actualizando la nota');
    }
  }

  static async delete(id) {
    try {
      const [result] = await connection.query(
        'DELETE FROM notes WHERE id = UUID_TO_BIN(?)',
        [id],
      );

      return result.affectedRows > 0;
    } catch (error) {
      console.error(error.message);
      throw new Error('Error al eliminar la nota');
    }
  }
}
