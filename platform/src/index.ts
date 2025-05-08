import { Hono } from "hono";
import { Organization } from "./organization";
import { prettyJSON } from "hono/pretty-json";
import { User, UserProperties, Users } from "../types/app";

function isValidId(value: string): boolean {
  return value.match(/^[0-9a-fA-F]{32}$/g) !== null;
}

declare module "hono" {
  interface ContextVariableMap {
    org: DurableObjectStub<Organization>;
    user: User;
  }
}

const app = new Hono<{ Bindings: Bindings }>();
app.use(prettyJSON());
app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));
app.get("/", async (c) =>
  c.env.ASSETS.fetch("https://assets.local/index.html"),
);
app.get("/docs/api", async (c) =>
  c.env.ASSETS.fetch("https://assets.local/docs/openapi.html"),
);

const api = new Hono<{ Bindings: Bindings }>();

type Bindings = {
  ORGANIZATION: DurableObjectNamespace<Organization>;
  ASSETS: Fetcher;
};

api.use("/org/:orgId/*", async (c, next) => {
  const id: string = c.req.param("orgId");
  if (isValidId(id)) {
    const doId = c.env.ORGANIZATION.idFromName(id);
    const stub = c.env.ORGANIZATION.get(doId);
    c.set("org", stub);
  } else {
    return new Response("Invalid OrgId", { status: 404 });
  }
  await next();
});

api.get("/org/:orgId/users", async (c) =>
  c.json<Users>(await c.get("org").getUsers()),
);
api.post("/org/:orgId/users", async (c) =>
  // TODO there is no validation of the request body schema
  c.json<User>(
    await c.get("org").createUser(await c.req.json<UserProperties>()),
  ),
);

api.use("/org/:orgId/user/:userId", async (c, next) => {
  const id: string = c.req.param("userId");
  if (!isValidId(id)) {
    return new Response("Invalid UserId", { status: 404 });
  }
  const user = await c.get("org").getUserById(id);
  if (user) {
    c.set("user", user);
  } else {
    return new Response("User not found", { status: 404 });
  }
  await next();
});
api.get("/org/:orgId/user/:userId", (c) => c.json<User>(c.get("user")));
api.patch("/org/:orgId/user/:userId", async (c) => {
  // TODO there is no validation of the request body schema
  const props = await c.req.json<UserProperties>();
  const user = await c.get("org").updateUserById(c.get("user").id, props);
  if (!user) {
    return new Response("User not found", { status: 404 });
  }
  c.json<User>(user);
});
api.delete("/org/:orgId/user/:userId", (c) => {
  c.get("org").deleteUserById(c.get("user").id);
  return new Response(null, { status: 204 });
});

app.route("/api", api);

export { Organization };
export default app;
