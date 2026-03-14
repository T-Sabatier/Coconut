export const leconType = {
  name: 'lecon',
  title: 'Leçon',
  type: 'document',
  fields: [
    {
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titre' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'chapitre',
      title: 'Chapitre',
      type: 'reference',
      to: [{ type: 'chapitre' }],
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