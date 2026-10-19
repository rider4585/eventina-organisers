import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string(),
    authorRole: z.string().optional().default('Senior Contributor'),
    authorImage: z.string().optional().default('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&auto=format&fit=crop'),
    authorLink: z.string().optional().default('/founders'),
    category: z.string(),
    categorySlug: z.string().optional(),
    readTime: z.string(),
    tags: z.array(z.string()).default([]),
    image: z.string(),
    imageAlt: z.string().optional().default('Eventina Journal Dispatch'),
    imageCaption: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
