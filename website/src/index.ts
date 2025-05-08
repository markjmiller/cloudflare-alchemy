import { Hono } from "hono";

export const api = new Hono();

api.get("/hello", (c) => c.text("Hello World!"));

export default {
  async fetch(request: Request): Promise<Response> {
    return api.fetch(request)
  },
};
