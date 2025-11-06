import { useEffect, useState } from "react";
import { getBaseUrl } from '../utils/api';

function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    let mounted = true;

    async function loadMessage() {
      try {
        const res = await fetch(`${getBaseUrl()}/api/hello`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (mounted) setMessage(data.message);
      } catch (err) {
        console.error("Failed to load message:", err);
        if (mounted) setMessage("Error contacting server");
      }
    }

    loadMessage();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}



export default Home;