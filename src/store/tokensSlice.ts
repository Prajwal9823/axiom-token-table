import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Token } from "@/types/token";

type SortKey = "price" | "change24h" | "volume24h";
type SortDir = "asc" | "desc";

interface TokensState {
  list: Token[];
  sortKey: SortKey;
  sortDir: SortDir;
  activeCategory: Token["category"] | "All";
}

const initialState: TokensState = {
  list: [],
  sortKey: "price",
  sortDir: "desc",
  activeCategory: "All",
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<Token[]>) {
      state.list = action.payload;
    },
    updatePrices(state, action: PayloadAction<Partial<Token>[]>) {
      // merge incoming updates (only price) into list by id
      action.payload.forEach((update) => {
        const idx = state.list.findIndex((t) => t.id === update.id);
        if (idx !== -1) {
          state.list[idx] = { ...state.list[idx], ...update } as Token;
        }
      });
    },
    setSort(state, action: PayloadAction<{ key: SortKey; dir: SortDir }>) {
      state.sortKey = action.payload.key;
      state.sortDir = action.payload.dir;
    },
    setActiveCategory(state, action: PayloadAction<TokensState["activeCategory"]>) {
      state.activeCategory = action.payload;
    },
  },
});

export const { setTokens, updatePrices, setSort, setActiveCategory } = tokensSlice.actions;
export default tokensSlice.reducer;
