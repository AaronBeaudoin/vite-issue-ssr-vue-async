import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import RootComponent from "/shared/Root.vue";

export async function render(context) {
  const app = createSSRApp(RootComponent);
  const html = await renderToString(app, context);

  return {
    body: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hello Vite SSR!</title>
      </head>
      <body>
        <div id="page">${html}</div>
      </body>
      </html>
    `
  };
}
