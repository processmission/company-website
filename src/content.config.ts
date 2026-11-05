import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { pageCollections } from './content/page-collections';

const products = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/products' }),
  schema: z.object({
    order: z.number().int().nonnegative(),
    title: z.string(),
    group: z.enum(['系统软件', '工程平台']),
    category: z.string(),
    description: z.string(),
    features: z.array(z.string()),
    summary: z.string(),
  }),
});

const industries = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/industries' }),
  schema: z.object({
    order: z.number().int().nonnegative(),
    title: z.string(),
    label: z.string(),
    description: z.string(),
    interfaces: z.string(),
    heading: z.string(),
    summary: z.string(),
    recommendationsDescription: z.string(),
    recommendations: z.array(z.object({
      product: reference('products'),
      reason: z.string(),
    })),
  }),
});

export const collections = { ...pageCollections, products, industries };
