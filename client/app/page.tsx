'use client';

import { useEffect, useState } from 'react';
import { CONFIG } from '@/lib/config';

export default function Home() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch(`${CONFIG.API_URL}`)
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => {
        console.error(err);
        setMessage('Connection error with the server!');
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-sans p-8">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-4">Next.js Client</h1>
        <div className="p-6 border rounded-xl bg-zinc-50 dark:bg-zinc-900">
          <p className="text-lg">Message from Server (Port 3002):</p>
          <p className="text-2xl font-mono text-blue-500 mt-2">{message}</p>
        </div>
      </main>
    </div>
  );
}

// hello
// hi
// sdfssfs

// heello world
// acddd
// asdfasdf

// commit 1
// commit 2
// commit 3
// commit 4