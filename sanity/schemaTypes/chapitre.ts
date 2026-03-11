export const chapitreType = {
  name: 'chapitre',
  title: 'Chapitre',
  type: 'document',
  fields: [
    {
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'module',
      title: 'Module',
      type: 'reference',
      to: [{ type: 'module' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'ordre',
      title: 'Ordre',
      type: 'number',
    },
    {
      name: 'contenu',
      title: 'Contenu',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'legende',
              title: 'Légende',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
}