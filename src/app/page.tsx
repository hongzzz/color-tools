export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
        Welcome to Color Tools
      </h1>
      <p className="text-lg text-zinc-600">
        Select a tool from the navigation bar to get started.
      </p>
    </div>
  );
}
