"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-red-400">
      <p>Something went wrong: {error.message}</p>
      <button onClick={reset} className="mt-4 px-3 py-1 bg-gray-800 rounded hover:bg-gray-700">
        Try again
      </button>
    </div>
  );
}
