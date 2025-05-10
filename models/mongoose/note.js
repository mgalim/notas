import mongoose, { model, Schema, Types } from 'mongoose';

const uri = process.env.MONGODB_URI;

const noteSchema = new Schema(
  {
    content: String,
    categories: [String],
    important: Boolean,
    rate: Number,
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  },
);

const Note = model('Note', noteSchema);

async function connect() {
  try {
    await mongoose.connect(uri);
    return Note;
  } catch (error) {
    console.error('Error connecting to the db: ', error);
    await mongoose.disconnect();
  }
}

export class NoteModel {
  static async getAll({ category }) {
    const db = await connect();
    if (category) {
      return db.find({
        categories: { $elemMatch: { $regex: category, $options: 'i' } },
      });
    }
    return db.find();
  }

  static async getById(id) {
    const Note = await connect();
    if (!Types.ObjectId.isValid(id)) return null;
    return Note.findById(id);
  }

  static async create(input) {
    const Note = await connect();
    const doc = new Note(input);
    return await doc.save();
  }

  static async delete(id) {
    const Note = await connect();
    if (!Types.ObjectId.isValid(id)) return false;
    const result = await Note.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  static async update(id, input) {
    const Note = await connect();
    if (!Types.ObjectId.isValid(id)) return false;
    return Note.findByIdAndUpdate(id, input, { new: true });
  }
}
