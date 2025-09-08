// src/App.tsx

import { useEffect, useState } from "react";
import cloudflareLogo from "./assets/cloudflare.svg";
import drizzleLogo from "./assets/drizzle.svg";
import honoLogo from "./assets/hono.svg";
import reactLogo from "./assets/react.svg";
import uicLogo from "./assets/uic.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("unknown");
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    fetch("/api/highScore")
      .then((res) => res.json() as Promise<{ highScore: number }>)
      .then((data) => setHighScore(data.highScore));

    fetch("/api/name")
      .then((res) => res.json() as Promise<{ name: string }>)
      .then((data) => setName(data.name));
  }, []);

  return (
    <>
      <header>
        <h1>Welcome to my first CS 484 app!</h1>
      </header>
      <div>
        <a href="https://484.cs.uic.edu/" target="_blank" rel="noopener">
          <img src={uicLogo} className="logo uic" alt="UIC logo" />
        </a>
        <a href="https://vite.dev" target="_blank" rel="noopener">
          <img src={viteLogo} className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://hono.dev/" target="_blank" rel="noopener">
          <img src={honoLogo} className="logo cloudflare" alt="Hono logo" />
        </a>
        <a href="https://orm.drizzle.team/" target="_blank" rel="noopener">
          <img src={drizzleLogo} className="logo drizzle" alt="Drizzle logo" />
        </a>
        <a
          href="https://workers.cloudflare.com/"
          target="_blank"
          rel="noopener"
        >
          <img
            src={cloudflareLogo}
            className="logo cloudflare"
            alt="Cloudflare logo"
          />
        </a>
      </div>
      <h3>Built with Vite + React + Hono + Drizzle + Cloudflare</h3>
      <div className="card">
        <button
          type="button"
          onClick={() => setCount((count) => count + 1)}
          aria-label="increment"
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div className="card">
        <button
          type="button"
          onClick={() => {
            fetch("/api/name")
              .then((res) => res.json() as Promise<{ name: string }>)
              .then((data) => setName(data.name));
          }}
          aria-label="get name"
        >
          NetID from API is: {name}
        </button>
        <p>
          Edit <code>worker/index.ts</code> to change the name
        </p>
      </div>
      <div className="card">
        <button
          type="button"
          onClick={() => {
            fetch("/api/highScore", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ score: count }),
            })
              .then((res) => res.json() as Promise<{ score: number }>)
              .then(
                (data) => data.score > highScore && setHighScore(data.score)
              );
          }}
          aria-label="get name"
        >
          Save high score
        </button>
        <p>Current click high score saved on the server is: {highScore}</p>
      </div>
    </>
  );
}

export default App;
