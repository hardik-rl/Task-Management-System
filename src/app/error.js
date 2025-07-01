'use client';

export default function GlobalError({ error, reset }) {
  console.error('Global Error:', error);

  return (
    <html>
      <body className="flex items-center justify-center min-h-screen bg-red-50 text-center">
        <div>
          <h1 className="text-4xl font-bold text-red-600">Something went wrong</h1>
          <p className="text-gray-600 mt-2">{error.message}</p>
          <button
            onClick={() => reset()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
