export default {
    name: 'blog',
    title: 'Blog Post',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [{ type: 'block' }],
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'publishedAt',
        title: 'Published at',
        type: 'datetime',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'image',
        title: 'Featured Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
    ],
    preview: {
      select: {
        title: 'title',
        media: 'featuredImage',
      },
    },
  };
  