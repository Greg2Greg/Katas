import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: [
      'Katas/**/*/*{test,spec}.{ts,tsx}',
      'Effect/**/*.{test,spec}.{ts,tsx}',
      'DesignPatterns/**/*.{test,spec}.{ts,tsx}',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: ['Katas/**/*.{ts,tsx}', 'Effect/**/*.{ts,tsx}', 'DesignPatterns/**/*.{ts,tsx}'],
    },
  },
});
