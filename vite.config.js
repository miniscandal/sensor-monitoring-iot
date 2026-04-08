import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
    plugins: [preact()],
    resolve: {
        alias: {
            '@core-constants': '/src/core/constants',
            '@core-interfaces': '/src/core/interfaces',
            '@core-mqtt': '/src/core/mqtt',
            '@core-services': '/src/core/services',
            '@domain': '/src/domain',
            '@infrastructure': '/src/infrastructure',
            '@features': '/src/features',
            '@assets': '/src/assets',
            '@mocks': '/src/mocks',
            '@shared-components': '/src/shared/components',
            '@shared-constants': '/src/shared/constants',
            '@shared-contexts': '/src/shared/contexts',
            '@shared-hooks': '/src/shared/hooks',
            '@shared-utils': '/src/shared/utils',
        },
    },
});
