import posthtml from '@vituum/vite-plugin-posthtml'
import {defineConfig} from "vite";

export default defineConfig({
    plugins: [posthtml({
        plugins: [], options: {}
    })],
})
