export const moduleType = {
  name: 'module',
  title: 'Module',
  type: 'document',
  fields: [
    {
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'numero',
      title: 'Numéro',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description courte',
      type: 'text',
      rows: 2,
    },
  ],
}