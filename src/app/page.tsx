import TokenTable from "@/components/TokenTable";

export default function HomePage() {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Axiom Token Discovery — Replica</h1>
      <TokenTable />
    </main>
  );
}
