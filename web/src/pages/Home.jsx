import { useEffect, useState } from "react";

function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    let cancelled = false;

    async function loadMessage() {
      try {
        const res = await fetch("/api/hello");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setMessage(data.message);
      } catch (err) {
        console.error("Failed to load message:", err);
        if (!cancelled) setMessage("Error contacting server");
      }
    }

    loadMessage();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}



export default Home;