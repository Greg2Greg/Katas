#! node
require("esbuild")
  .build({
    entryPoints: ["./src/app/api.ts"],
    bundle: true,
    treeShaking: true,
    target: "es6",
    platform: "node",
    tsconfig: "./tsconfig.json",
    outfile: "./dist/api.js",
    logLevel: "info",
  })
  .catch(() => process.exit(1));
