import { defineConfig } from "vite";
import VitePluginVue from "@vitejs/plugin-vue";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 80
  },
  preview: {
    host: "0.0.0.0",
    port: 80
  },
  build: {
    rollupOptions: {
      input: __dirname + "/source/index.js"
    }
  },
  plugins: [
    VitePluginVue(),

    {
      name: "vite-plugin-ssr-dev",
      configureServer(server) {
        return async () => {
          server.middlewares.use(async (request, response, next) => {
            if (response.headersSent || !request.originalUrl) return next();

            const entry = await server.ssrLoadModule("/renderer/index.js");
            let result = await entry.render({ url: request.originalUrl });
            result = { status: 200, ...(result || {}) };

            if (!result.body) return next();
            if (!result.headers || result.headers["Content-Type"] === "text/html") {
              result.body = await server.transformIndexHtml(request.originalUrl, result.body);
            }
  
            response.setHeader("Content-Type", "text/html");
            response.writeHead(result.status, result.headers);
            response.end(result.body);
          });
        };
      }
    },

    {
      name: "vite-plugin-ssr-preview",
      configurePreviewServer(server) {
        return async () => {
          server.middlewares.use(async (request, response, next) => {
            if (response.headersSent || !request.originalUrl) return next();

            const entry = await import(__dirname + "/dist/server/bundle.mjs");
            let result = await entry.render({ url: request.originalUrl });
            result = { status: 200, ...(result || {}) };
            if (!result.body) return next();

            response.setHeader("Content-Type", "text/html");
            response.writeHead(result.status, result.headers);
            response.end(result.body);
          });
        };
      }
    }
  ]
});
