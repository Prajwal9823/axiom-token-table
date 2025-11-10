"use client";
import React, { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { fetchTokens } from "@/lib/api";
import { setTokens } from "@/store/tokensSlice";
import { RootState } from "@/store";
import TokenRow from "./TokenRow";
import TableHeader from "./TableHeader";
import LoadingSkeleton from "../Loading/Skeleton";
import { useWebsocket } from "@/hooks/useWebsocket";

export default function TokenTable() {
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery({ queryKey: ["tokens"], queryFn: fetchTokens, staleTime: 10000 });
  const tokens = useSelector((s: RootState) => s.tokens.list);
  const sortKey = useSelector((s: RootState) => s.tokens.sortKey);
  const sortDir = useSelector((s: RootState) => s.tokens.sortDir);
  const activeCategory = useSelector((s: RootState) => s.tokens.activeCategory);

  // connect websocket for live updates
  useWebsocket();

  useEffect(() => {
    if (data) dispatch(setTokens(data));
  }, [data, dispatch]);

  const filtered = useMemo(() => {
    let list = tokens;
    if (activeCategory !== "All") list = list.filter((t) => t.category === activeCategory);
    list = [...list].sort((a, b) => {
      const aVal = (a as any)[sortKey] ?? 0;
      const bVal = (b as any)[sortKey] ?? 0;
      return sortDir === "desc" ? Number(bVal) - Number(aVal) : Number(aVal) - Number(bVal);
    });
    return list;
  }, [tokens, sortKey, sortDir, activeCategory]);

  if (isLoading && tokens.length === 0) return <LoadingSkeleton />;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-gray-900 rounded-md border border-gray-800 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex gap-2">
            <CategoryTabs />
          </div>
          <div className="text-sm text-gray-400">Real-time via WebSocket (mock)</div>
        </div>

        <div className="overflow-x-auto text-xs sm:text-sm md:text-base">
          <table className="min-w-full table-fixed">
            <thead className="text-xs text-gray-400 border-b border-gray-800">
              <tr>
                <th className="w-1/4 p-3 text-left">Pair</th>
                <TableHeader title="Price" sortKey="price" className="w-1/6" />
                <TableHeader title="Change (24h)" sortKey="change24h" className="w-1/6" />
                <TableHeader title="Volume" sortKey="volume24h" className="w-1/6" />
                <th className="w-1/6 p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((token) => (
                <TokenRow key={token.id} token={token} />
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="p-6 text-center text-gray-400">No tokens found.</div>}
        </div>
      </div>
    </div>
  );
}

/* A tiny tabs control (keeps local dependency-free) */
function CategoryTabs() {
  const dispatch = useDispatch();
  const active = useSelector((s: RootState) => s.tokens.activeCategory);

  const tabs: Array<RootState["tokens"]["activeCategory"]> = ["All", "New", "FinalStretch", "Migrated"];
  return (
    <div className="flex gap-2">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => dispatch({ type: "tokens/setActiveCategory", payload: t })}
          className={`px-3 py-1 rounded-md text-sm ${
            active === t ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800"
          }`}
        >
          {t === "FinalStretch" ? "Final Stretch" : t}
        </button>
      ))}
    </div>
  );
}
