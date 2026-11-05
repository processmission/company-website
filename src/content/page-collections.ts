import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const placeholder = z.object({ id: z.string().optional(), title: z.string(), needed: z.string() });
const section = z.object({ id: z.string(), title: z.string(), items: z.array(placeholder) });

export const pageCollections = {
  pages: defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/pages' }),
    schema: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      heading: z.string().optional(),
      company: z.object({ name: z.string(), shortName: z.string(), englishName: z.string(), positioning: z.string(), description: z.string(), mission: z.string() }).optional(),
      community: z.object({ name: z.string(), positioning: z.string(), description: z.string() }).optional(),
      eyebrow: z.string().optional(),
      sections: z.array(section).default([]),
      badge: z.string().optional(),
      industryIntro: z.string().optional(),
      actions: z.array(z.object({ href: z.string(), label: z.string() })).default([]),
      tags: z.array(z.string()).default([]),
      visualLabel: z.string().optional(),
    }),
  }),
  prose: defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/prose' }),
    schema: z.object({ eyebrow: z.string().optional() }),
  }),
  shared: defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/shared' }),
    schema: z.object({
      contactItems: z.array(placeholder),
      officialChannels: z.array(placeholder),
      productGroups: z.array(z.object({ id: z.string(), title: z.enum(['系统软件', '工程平台']) })),
      engineeringStages: z.array(z.object({ number: z.string(), title: z.string(), description: z.string() })),
      diagram: z.object({
        title: z.string(), stack: z.string(), workloads: z.array(z.string()).length(2),
        runtimes: z.array(z.object({ label: z.string(), name: z.string(), description: z.string() })).length(2),
        hypervisor: z.object({ name: z.string(), description: z.string(), tag: z.string() }),
        hardware: z.string(), architectures: z.string(), note: z.string(),
      }),
      footer: z.object({ contactNeeded: z.string(), legal: z.array(z.object({ title: z.string(), needed: z.string() })) }),
    }),
  }),
};
