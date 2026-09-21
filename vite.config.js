import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
    plugins: [preact()],
    resolve: {
        alias: {
            '@assets': '/src/assets',
            '@core': '/src/core',
            '@mocks': '/src/mocks',
            '@modules': '/src/modules',
            '@shared-components': '/src/shared/components',
            '@shared-constants': '/src/shared/constants',
            '@shared-contexts': '/src/shared/contexts',
            '@shared-hooks': '/src/shared/hooks',
            '@shared-utils': '/src/shared/utils',
        },
    },
});
