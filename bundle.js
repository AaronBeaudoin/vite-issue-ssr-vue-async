(async _ => {
  require("esbuild").build({
    conditions: ["worker"],
    format: "esm",
    bundle: true,
    
    entryPoints: [`${__dirname}/dist/server/index.mjs`],
    outfile: `${__dirname}/dist/server/bundle.mjs`,
    allowOverwrite: true,
  
    define: {
      __VUE_OPTIONS_API__: "true",
      __VUE_PROD_DEVTOOLS__: "false"
    }
  });
})();
