import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  try {
    await client.connect();
    const database = client.db('notesDB');
    return database.collection('notes');
  } catch (error) {
    console.error('Error connecting to the database');
    console.error(error);
    await client.close();
  }
}

export class NoteModel {
  static async getAll({ category }) {
    const db = await connect();

    if (category) {
      return db
        .find({
          categories: {
            $elemMatch: {
              $regex: category,
              $options: 'i',
            },
          },
        })
        .toArray();
    }

    return db.find({}).toArray();
  }
}
