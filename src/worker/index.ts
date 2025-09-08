import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { users } from "../../db/schema";
import { desc } from "drizzle-orm";

const app = new Hono<{ Bindings: Env }>();

// TODO: change "Cloudflare" to your NetID
app.get("/api/name", (c) => c.json({ name: null }));

app.get("/api/highScore", async (c) => {
  const db = drizzle(c.env.DB);
  // TODO: Get the maximum score from the users table
  const highScore = null;

  return c.json({ highScore });
});

app.post("/api/highScore", async (c) => {
  const db = drizzle(c.env.DB);
  const { score } = await c.req.json<{ score: number }>();

  // TODO: Validate the score and if invalid, return 400 status code
  if (score) {
    return c.json({ message: "Edit it to correct error message" }, 200);
  }

  //TODO: Insert the score into the users table
  const result = [{ score }];

  //TODO: Return the inserted score with a success message
  return c.json({
    message: "",
  });
});

export default app;
