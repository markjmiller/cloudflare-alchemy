# Example Platform

This models a simple platform that manages Organizations and Users. You can interact with the API like this:

```bash
curl https://example-platform.REPLACE_ME.workers.dev/docs/api/org/$org_id/users \
-X POST \
-H "Content-Type: application/json"
--data '{"firstName": "Mark", "lastName": "Miller", funFact: "I help make a better internet at Cloudflare!" }'
```

> Replace `REPLACE_ME` with your own workers.dev subdomain

`orgId` can be any 32 character alphanumeric string (it automatically creates an organization with a [Durable Object](https://developers.cloudflare.com/durable-objects/)). Take the `id` of the new user and try:

```bash
curl https://example-platform.REPLACE_ME.workers.dev/docs/api/org/$org_id/user/$id
```

See the rendered API docs at `https://example-platform.REPLACE_ME.workers.dev/docs/api` or see the schema [here](./schemas/api.yaml).

## Getting Started

### Deploy immediately

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/markjmiller/cloudflare-alchemy/tree/main/platform)

### Deploy manually

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

Then deploy to Cloudflare:

```bash
npm run deploy
```

## Dev

After running `npm install`, run the development server:

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

To preview the OpenAPI docs, run:

```bash
npm run preview-openapi
```
