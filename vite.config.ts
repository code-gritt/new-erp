import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },

    define: {
        'import.meta.env.VITE_BASENAME': JSON.stringify(process.env.VITE_BASENAME || ''),
    },

    server: {
        proxy: {
            '/graphql': {
                target: 'http://192.168.2.109:4001',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
