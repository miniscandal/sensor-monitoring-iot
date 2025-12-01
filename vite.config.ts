import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
    plugins: [preact()],
    resolve: {
        alias: {
            '@core-services': '/src/core/services',
            '@assets': '/src/assets',
            '@mocks': '/src/mocks',
            '@shared-components': '/src/shared/components',
            '@shared-constants': '/src/shared/constants',
            '@shared-contexts': '/src/shared/contexts',
            '@shared-hooks': '/src/shared/hooks',
        },
    },
});
