import z from 'zod';

const CATEGORIES = [
  'arquitectura',
  'herramientas',
  'frameworks',
  'frontend',
  'backend',
  'bases de datos',
];

const noteSchema = z.object({
  content: z.string({
    required_error: 'Content es requerido',
    invalid_type_error: 'Content debe ser string.',
  }),
  category: z
    .array(z.enum(CATEGORIES), {
      required_error: 'Categoria es requerida',
      invalid_type_error: 'Debe tener al menos una categoria.',
    })
    .nonempty('Debe haber una categoria.'),
  rate: z
    .number({ invalid_type_error: 'Rate debe ser numerico' })
    .min(5, 'Rate debe ser mayor o igual a 5')
    .max(10, 'Rate debe ser menor o igual a 10')
    .default(5),
  important: z
    .boolean({ invalid_type_error: 'important debe ser booleano' })
    .default(false),
});

export function validateNote(input) {
  return noteSchema.safeParse(input);
}

export function validatePartialNote(input) {
  return noteSchema.partial().safeParse(input);
}
