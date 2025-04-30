const z = require('zod');

const now = new Date();
const CATEGORIES = [
  'JavaScript',
  'Node.js',
  'Programación',
  'Arquitectura',
  'NPM',
  'Herramientas',
  'Frameworks',
  'Frontend',
  'Backend',
  'Bases de Datos',
  'HTML',
  'CSS',
  'React',
  'Express',
  'API',
];

const noteSchema = z.object({
  content: z.string({
    required_error: 'Content es requerido',
    invalid_type_error: 'Content debe ser string.',
  }),
  date: z.date().default(now),
  category: z
    .array(z.enum(CATEGORIES), {
      required_error: 'Categoria es requerida',
      invalid_type_error: 'Debe tener al menos una categoria.',
    })
    .nonempty('Debe haber una categoria.'),
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
