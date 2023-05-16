import { defineConfig } from "vite";

export default defineConfig({
  preview: {
    port: 3000
  },
  plugins: [
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
