#!/usr/bin/env node

import esbuildServe from "esbuild-serve";

esbuildServe(
  {
    logLevel: "info",
    entryPoints: ["src/app.tsx"],
    bundle: true,
    outfile: "public/bundle.js",
    define: {'process.env.NODE_ENV': '"development"'},
  },
  { root: "public" }

);

