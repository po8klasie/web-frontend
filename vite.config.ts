import { reactRouter } from "@react-router/dev/vite";
import {defineConfig} from "vite";
import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from "url";


export default defineConfig({
    plugins: [
        reactRouter(),
        tsconfigPaths()
    ],
    resolve: {
        alias: [
            { find: '@src', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
            { find: '@customizations', replacement: fileURLToPath(new URL('./customizations', import.meta.url)) },
        ]
    },
});