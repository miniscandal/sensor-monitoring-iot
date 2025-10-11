import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
    plugins: [preact()],
    resolve: {
        alias: {
            '@core-services': '/src/core/services',
            '@assets': '/src/assets',
            '@shared-components': '/src/shared/components',
            '@shared-contexts': '/src/shared/contexts',
            '@shared-custom-hooks': '/src/shared/custom-hooks',
            '@shared-constants': '/src/shared/constants',
        },
    },
});
