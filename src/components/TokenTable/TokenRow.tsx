"use client";
import React, { useEffect, useRef, useState } from "react";
import type { Token } from "@/types/token";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/UI/Popover";
import { Modal } from "@/components/UI/Modal";
import { TrendingUp, TrendingDown, Star } from "lucide-react";
import SparklineChart from "@/components/Charts/SparklineChart";

export default React.memo(function TokenRow({ token }: { token: Token }) {
  const prevRef = useRef<number>(token.price);
  const [highlight, setHighlight] = useState<"up" | "down" | null>(null);
  const [favorite, setFavorite] = useState(false);
  const [history, setHistory] = useState<number[]>([token.price]);

  useEffect(() => {
    const prev = prevRef.current;
    if (token.price > prev) setHighlight("up");
    else if (token.price < prev) setHighlight("down");
    prevRef.current = token.price;

    // append new price to history (keep only last 20 points)
    setHistory((prevHist) => {
      const updated = [...prevHist, token.price];
      return updated.slice(-20);
    });

    if (highlight) {
      const t = setTimeout(() => setHighlight(null), 700);
      return () => clearTimeout(t);
    }
  }, [token.price, highlight]);

  const bg =
    highlight === "up"
      ? "bg-green-900/30"
      : highlight === "down"
      ? "bg-red-900/30"
      : "bg-transparent";

  const formatNumber = (num: number): string => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(2) + "K";
    return num.toString();
  };

  const isUp = token.change24h >= 0;

  return (
    <tr
      className={`transition-all duration-500 hover:scale-[1.01] hover:bg-gray-800/40 ${bg} border-b border-gray-800/60`}
    >
      {/* Token column with Popover */}
      <td className="p-2 sm:p-3">
        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <div
                className="w-9 h-9 rounded-md bg-gray-800 flex items-center justify-center text-xs cursor-pointer hover:bg-gray-700 shadow-inner"
                title={token.name ?? token.symbol}
              >
                {token.symbol ?? token.id.split("-")[0]}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <p className="font-semibold mb-1 text-white">
                {token.name ?? token.id}
              </p>
              <p className="text-xs text-gray-400">Pair: {token.pair ?? token.id}</p>
              <p className="text-xs text-gray-400">Category: {token.category}</p>
              <p className="text-xs text-gray-400">24h Change: {token.change24h}%</p>
            </PopoverContent>
          </Popover>

          <div>
            <div className="font-medium flex items-center gap-2">
              {token.pair ?? token.id}
              <button
                onClick={() => setFavorite(!favorite)}
                className="text-gray-500 hover:text-yellow-400 transition-colors"
                title="Add to favorites"
              >
                <Star size={14} fill={favorite ? "gold" : "none"} strokeWidth={1.5} />
              </button>
            </div>
            <div className="text-xs text-gray-400 hidden sm:block">
              {token.name ?? ""}
            </div>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="p-2 sm:p-3 font-mono">
        ${Number(token.price).toLocaleString(undefined, { maximumFractionDigits: 6 })}
      </td>

      {/* Change */}
      <td
        className={`p-2 sm:p-3 ${
          isUp ? "text-green-400" : "text-red-400"
        } whitespace-nowrap`}
      >
        <div className="flex items-center gap-1">
          {isUp ? (
            <TrendingUp size={14} className="text-green-400" />
          ) : (
            <TrendingDown size={14} className="text-red-400" />
          )}
          <span>
            {isUp ? "+" : ""}
            {token.change24h}%
          </span>
        </div>
      </td>

      {/* Live chart */}
      <td className="p-2 sm:p-3 w-32">
        <SparklineChart data={history} color={isUp ? "#10B981" : "#EF4444"} />
      </td>

      {/* Volume */}
      <td className="p-2 sm:p-3 hidden sm:table-cell text-gray-300">
        {formatNumber(token.volume24h)}
      </td>

      {/* Actions */}
      <td className="p-2 sm:p-3">
        <div className="flex gap-2">
          <Modal
            trigger={
              <button className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-sm transition">
                Details
              </button>
            }
            title={token.name ?? token.id}
            description="Token overview and analytics"
          >
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-400">Pair:</span> {token.pair ?? token.id}
              </p>
              <p>
                <span className="text-gray-400">Price:</span> $
                {token.price.toLocaleString()}
              </p>
              <p>
                <span className="text-gray-400">24h Change:</span>{" "}
                {isUp ? "+" : ""}
                {token.change24h}%
              </p>
              <p>
                <span className="text-gray-400">Volume:</span>{" "}
                {token.volume24h.toLocaleString()}
              </p>
              <p>
                <span className="text-gray-400">Category:</span> {token.category}
              </p>
            </div>
          </Modal>

          <button className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-sm transition">
            Watch
          </button>
        </div>
      </td>
    </tr>
  );
});
