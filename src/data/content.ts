import { getCollection, getEntry } from 'astro:content';

const site = (await getEntry('shared', 'site'))!;
export const company = (await getEntry('pages', 'about'))!.data.company!;
export const community = (await getEntry('pages', 'community'))!.data.community!;
export const { contactItems, officialChannels, productGroups, engineeringStages, diagram, footer } = site.data;
export const products = (await getCollection('products'))
  .sort((a, b) => a.data.order - b.data.order)
  .map((entry) => ({ ...entry.data, slug: entry.id }));
export const industries = (await getCollection('industries'))
  .sort((a, b) => a.data.order - b.data.order)
  .map((entry) => ({ ...entry.data, slug: entry.id }));
