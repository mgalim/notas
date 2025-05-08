import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
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

  static async getById(id) {
    const db = await connect();
    const objectId = ObjectId.createFromHexString(id);
    return db.findOne({ _id: objectId });
  }

  static async create(input) {
    const db = await connect();
    const { insertedId } = await db.insertOne(input);

    return {
      _id: insertedId,
      ...input,
    };
  }

  static async delete(id) {
    const db = await connect();
    const objectId = ObjectId.createFromHexString(id);
    const { deletedCount } = await db.deleteOne({ _id: objectId });
    return deletedCount > 0;
  }

  static async update(id, input) {
    const db = await connect();
    const objectId = ObjectId.createFromHexString(id);

    const result = await db.findOneAndUpdate(
      { _id: objectId },
      { $set: input },
      { returnDocument: 'after' },
    );

    if (!result) return false;
    return result;
  }
}
