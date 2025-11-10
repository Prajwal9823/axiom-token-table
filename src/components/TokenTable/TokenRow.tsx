"use client";
import React, { useEffect, useRef, useState } from "react";
import type { Token } from "@/types/token";

export default React.memo(function TokenRow({ token }: { token: Token }) {
  // local prevPrice to detect movement and animate row bg
  const prevRef = useRef<number>(token.price);
  const [highlight, setHighlight] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    const prev = prevRef.current;
    if (token.price > prev) setHighlight("up");
    else if (token.price < prev) setHighlight("down");
    prevRef.current = token.price;

    if (highlight) {
      const t = setTimeout(() => setHighlight(null), 700);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token.price]);

  const bg = highlight === "up" ? "bg-green-900/40" : highlight === "down" ? "bg-red-900/30" : "bg-transparent";
  return (
    <tr className={`transition-colors duration-500 ${bg}`}>
      <td className="p-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-gray-800 flex items-center justify-center text-xs">{token.symbol ?? token.id.split("-")[0]}</div>
          <div>
            <div className="font-medium">{token.pair ?? token.id}</div>
            <div className="text-xs text-gray-400">{token.name ?? ""}</div>
          </div>
        </div>
      </td>
      <td className="p-3 font-mono">${Number(token.price).toLocaleString(undefined, { maximumFractionDigits: 6 })}</td>
      <td className={`p-3 ${token.change24h >= 0 ? "text-green-400" : "text-red-400"}`}>
        {token.change24h >= 0 ? "+" : ""}
        {token.change24h}%
      </td>
      <td className="p-3">{Number(token.volume24h).toLocaleString()}</td>
      <td className="p-3">
        <div className="flex gap-2">
          <button className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-sm">Details</button>
          <button className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-sm">Watch</button>
        </div>
      </td>
    </tr>
  );
});
