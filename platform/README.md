# Example Platform

This models a simple platform that manages Organizations and Users.

TODO update this:
[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/hello-world-do-template)

## Getting Started

First, run:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then run the development server:

```bash
npm run dev
```

Try adding a User. You can make `orgId` any 32 character alphanumeric string:

```bash
curl http://localhost:8787/org/$org_id/users \
-X POST \
-H "Content-Type: application/json"
--data '{"firstName": "Mark", "lastName": "Miller", funFact: "I help make a better internet at Cloudflare!" }'
```

## OpenAPI

To preview the OpenAPI docs, run:

```bash
npm run preview-openapi
```

## Dev

If the OpenAPI schema changes, run these commands to lint, re-generate the TS types, and render the html asset:

```bash
npm run lint-openapi && npm run generate-types && npm run render-api-docs
```

If you need to re-generate Cloudflare TS types, run:

```bash
npm run cf-typegen && npm run check
```

Lint the source TS files like this:

```bash
npm run lint
```

## Deploy

```bash
npm run deploy
```
