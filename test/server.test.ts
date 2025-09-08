import { SELF, env } from "cloudflare:test";
import { beforeEach, describe, expect, it } from "vitest";

const BASE = "http://example.com";
beforeEach(async () => {
  await env.DB.exec("DELETE FROM high_scores;");
});

describe("Homework 1 Tests", () => {
  it("(5pts) API returns JSON with a name", async () => {
    const res = await SELF.fetch(`${BASE}/api/name`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type") || "").toContain("application/json");
    const body = (await res.json()) as { name: string };
    expect(typeof body.name).toBe("string");
  });

  const postScore = (n: number) =>
    SELF.fetch(`${BASE}/api/highScore`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ score: n }),
    });

  it("(5pts) Display high score as 0 when table is empty", async () => {
    const res = await SELF.fetch(`${BASE}/api/highScore`);
    const body = (await res.json()) as { highScore: number };
    expect(body.highScore).toBe(0);
  });

  it("(5pts) Save the high score and display the high score", async () => {
    const post = await postScore(10);
    expect(post.status).toBe(200);

    const get = await SELF.fetch(`${BASE}/api/highScore`);
    expect(get.status).toBe(200);
    expect(await get.json()).toEqual({ highScore: 10 });
  });

  it("(5pts) POST API rejects invalid scores", async () => {
    const neg = await postScore(-1);
    expect(neg.status).toBe(400);

    const nonNum = await SELF.fetch(`${BASE}/api/highScore`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ score: "abc" }),
    });
    expect(nonNum.status).toBe(400);
  });

  it("(5pts) Return the maximum score after multiple inserts into database", async () => {
    await postScore(5);
    await postScore(12);
    await postScore(3);
    const res = await SELF.fetch(`${BASE}/api/highScore`);
    const body = (await res.json()) as { highScore: number };
    expect(body.highScore).toBe(12);
  });
});
