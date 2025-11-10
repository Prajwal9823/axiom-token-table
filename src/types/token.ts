export type Category = "New" | "FinalStretch" | "Migrated";

export type Token = {
  id: string;            // e.g. "ETH-USDC"
  name?: string;
  symbol?: string;
  pair?: string;
  price: number;
  change24h: number;     // percent
  volume24h: number;
  category: Category;
  marketCap?: number;
  icon?: string;
};
