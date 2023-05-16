# `vite-issue-ssr-vue-async`

Allow me to introduce one of the weirdest bugs I've ever encountered.

In this super minimal Vue SSR project, there is a single `Root.vue` component, which defined an async component `Async.vue`. During `dev`, the async component is rendered during SSR as expected. However, after bundling the server entry with `esbuild` (to mimic the production project where I'm encountering this bug) and running `preview`, the async component doesn't render.

**Note**: Client hydration has not been implemented in this minimal example because it is not relevant.

## Steps to Reproduce

1. Run `npm run dev` and go to `http://localhost:3000`.  
   Note that the async component is rendered during SSR and sent to the browser. 👍
2. Run `npm run preview-entry` and go to `http://localhost:3000` again.  
   Note that the async component is rendered during SSR and sent to the browser. 🤙
2. Run `npm run preview-bundle` and go to `http://localhost:3000` again.  
   Note that the async component is not rendered. ⛔️
