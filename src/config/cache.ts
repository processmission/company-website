export const cachePolicy = {
  development: {
    imageRoute: '/_image-live/',
    cacheControl: 'no-store',
  },
  preview: {
    cacheControl: 'no-cache',
  },
  pages: {
    htmlFreshnessLimitSeconds: 600,
    retainedAssetSeconds: 86400,
    maxPreparationAgeSeconds: 3600,
    manifestPath: 'cache-assets.json',
    legacyAssets: ['company-logo.webp', 'favicon.svg'],
  },
} as const;
