import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            devOptions: {
                enabled: true,
            },
            manifest: {
                icons: [
                    { src: '/icon-180x180.png', type: 'image/png', sizes: '180x180' },
                    { src: '/icon-192x192.png', type: 'image/png', sizes: '192x192' },
                    { src: '/icon-512x512.png', type: 'image/png', sizes: '512x512' },
                ],
                theme_color: '#de6910',
            },
            registerType: 'autoUpdate',
        }),
    ],
});
