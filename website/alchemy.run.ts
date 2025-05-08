import alchemy from "alchemy";
import { Vite } from "alchemy/cloudflare";

// Initialize the Alchemy application scope
const app = await alchemy("example-website-app", {
  stage: process.env.USER ?? "dev",
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
  quiet: process.argv.includes("--verbose") ? false : true,
});

export const website = await Vite("example-website", {
  // command to build the vite site (run vite build)
  command: "npm run build",
  // where the build command will store the assets
  assets: "./dist",
  main: "./src/index.ts",
});

console.log({
  url: website.url
});

// Finalize the app to apply changes
await app.finalize();
