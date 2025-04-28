const z = require('zod');

const now = new Date();
const noteSchema = z.object({
  content: z.string({
    required_error: 'Content es requerido',
    invalid_type_error: 'Content debe ser string.',
  }),
  date: z.date().default(now),
  important: z
    .boolean({ invalid_type_error: 'important debe ser booleano' })
    .default(false),
});

function validateNote(input) {
  return noteSchema.safeParse(input);
}

function validatePartialNote(input) {
  return noteSchema.partial().safeParse(input);
}

module.exports = { validateNote, validatePartialNote };
