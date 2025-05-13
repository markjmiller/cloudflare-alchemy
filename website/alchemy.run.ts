import alchemy from "alchemy";
import { Vite } from "alchemy/cloudflare";
import { User } from "alchemy/example-platform";

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

export const user = await User('user-mark', {
  orgId: 'fe110c72385f49a4ad721a26cdd0f730',
  firstName: 'Mark',
  lastName: 'Miller',
  funFact: 'I help make a better internet at Cloudflare!'
});

console.log({
  url: website.url,
  userId: user.id
});

// Finalize the app to apply changes
await app.finalize();
