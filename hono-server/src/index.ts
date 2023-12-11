import { Hono, Context } from "hono";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { getCookie } from "hono/cookie";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const JWKS = createRemoteJWKSet(
  new URL(`${process.env.HANKO_API_URL}/.well-known/jwks.json`)
);

async function verifyTokenMiddleware(c: Context, next: Function) {
  let token = "";
  if (
    c.req.header("authorization") &&
    c.req.header("authorization")?.split(" ")[0] === "Bearer"
  ) {
    token = c.req.header("authorization")?.split(" ")[1] || "";
  } else if (getCookie(c, "hanko")) {
    console.log("hanko", getCookie(c, "hanko"));
    token = getCookie(c, "hanko") || "";
  }
  if (token === null || token.length === 0) {
    console.log("no token");
    return new Response("Unauthorized", { status: 401 });
  }
  let authError = false;
  await jwtVerify(token, JWKS).catch((err) => {
    console.log("jwt verify error");
    authError = true;
    console.log(err);
  });
  if (authError) {
    console.log("auth error");
    return new Response("Authentication Token not valid", { status: 401 });
  }
  console.log("token valid");
  await next();
}

app.get("/", (c) => c.json({ message: "Hono x Hanko!" }));

app.get("/protected", verifyTokenMiddleware, (c) =>
  c.json({ message: "Hello from protected route!" })
);

export default {
  port: 8000,
  fetch: app.fetch,
};
