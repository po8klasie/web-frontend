import {defineConfig} from "vite";
import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from "url";
import react from '@vitejs/plugin-react';


export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths()
    ],
    resolve: {
        alias: [
            { find: '@src', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
            { find: '@customizations', replacement: fileURLToPath(new URL('./customizations', import.meta.url)) },
        ]
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupVitest.ts',
    },
});
