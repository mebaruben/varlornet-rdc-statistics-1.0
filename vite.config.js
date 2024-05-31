import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
          cors:  {
            origin: "*",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            preflightContinue: true,
            optionsSuccessStatus: 204,
            credentials:true,
          },
          proxy: {
            "/stat": {
              target: process.env.VUE_APP_BASE_URL,
              secure: false,
              changeOrigin: true,
              rewrite: (path) => {console.log(path); return path.replace(/^\/stat/, '')}
            }
          }
        }
    };
});
