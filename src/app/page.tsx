import TokenTable from "@/components/TokenTable";
import { TrendingUp, Circle } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 p-6">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
          Axiom Token Discovery — <span className="text-blue-400">Pro Edition</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Real-time token analytics, price tracking, and discovery powered by mock WebSocket updates.
        </p>
      </header>

      {/* Global Market Overview */}
      <section className="max-w-6xl mx-auto mb-8 grid sm:grid-cols-3 gap-4 text-center">
        <div className="bg-gray-900/60 backdrop-blur-md rounded-xl border border-gray-800 p-4">
          <div className="text-gray-400 text-sm">Total Market Cap</div>
          <div className="text-xl font-semibold">$1.29T</div>
        </div>
        <div className="bg-gray-900/60 backdrop-blur-md rounded-xl border border-gray-800 p-4">
          <div className="text-gray-400 text-sm">24h Volume</div>
          <div className="text-xl font-semibold">$76.3B</div>
        </div>
        <div className="bg-gray-900/60 backdrop-blur-md rounded-xl border border-gray-800 p-4 flex items-center justify-center gap-2">
          <Circle className="w-3 h-3 fill-green-500 text-green-500 animate-pulse" />
          <span className="text-sm font-medium text-gray-300">Live Updates Active</span>
        </div>
      </section>

      {/* Token Table */}
      <section className="max-w-6xl mx-auto bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-lg border border-gray-800 p-4">
        <TokenTable />
      </section>

      {/* Footer */}
      <footer className="text-center mt-8 text-sm text-gray-500">
        <div className="flex items-center justify-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-400" />
          <p>Powered by Next.js, TailwindCSS, Redux Toolkit, and Radix UI</p>
        </div>
        <p className="mt-1">Built by Prajwal Ramteke @ IIT Hyderabad</p>
      </footer>
    </main>
  );
}
