import { defineConfig } from "vite";
import VitePluginVue from "@vitejs/plugin-vue";

export default defineConfig({
  server: {
    port: 3000
  },
  optimizeDeps: {
    include: []
  },
  build: {
    outDir: "dist/server"
  },
  plugins: [
    VitePluginVue(),
    {
      name: "vite-plugin-ssr-dev",
      configureServer(server) {
        return async () => {
          server.middlewares.use(async (request, response, next) => {
            if (response.headersSent || !request.originalUrl) return next();

            const entry = await server.ssrLoadModule("/server/index.js");
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
    }
  ]
});
