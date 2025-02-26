import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.test.js',
  use: {
    browserName: 'chromium', // S'assurer d'utiliser Chromium
    headless: false, // Pour voir le test en action, sinon mettre true
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
  },
});
