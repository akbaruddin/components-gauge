import type { Options } from "tsup";

export const tsup: Options = {
  splitting: true,
  sourcemap: true,
  clean: false,
  entryPoints: ["src/index.ts"],
  dts: true,
  format: [],
};