import type { Token } from "@/types/token";

/**
 * Deterministic initial token list used by React Query.
 * Keep order stable for visual-tests.
 */
export async function fetchTokens(): Promise<Token[]> {
  // small deterministic dataset
  return [
    {
      id: "BTC-USDC",
      name: "Bitcoin",
      symbol: "BTC",
      pair: "BTC/USDC",
      price: 36000,
      change24h: 1.2,
      volume24h: 1200000,
      category: "FinalStretch",
    },
    {
      id: "ETH-USDC",
      name: "Ethereum",
      symbol: "ETH",
      pair: "ETH/USDC",
      price: 1850,
      change24h: -0.7,
      volume24h: 700000,
      category: "New",
    },
    {
      id: "AXM-ETH",
      name: "Axiom",
      symbol: "AXM",
      pair: "AXM/ETH",
      price: 0.023,
      change24h: 5.1,
      volume24h: 12000,
      category: "Migrated",
    },
  ];
}
