"use client";
import React, { useEffect, useRef, useState } from "react";
import type { Token } from "@/types/token";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/UI/Popover";
import { Modal } from "@/components/UI/Modal";

export default React.memo(function TokenRow({ token }: { token: Token }) {
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
  }, [token.price, highlight]);

  const bg =
    highlight === "up"
      ? "bg-green-900/40"
      : highlight === "down"
      ? "bg-red-900/30"
      : "bg-transparent";

  return (
    <tr className={`transition-colors duration-500 ${bg}`}>
      {/* Token column with Popover */}
      <td className="p-2 sm:p-3">
        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <div
                className="w-8 h-8 rounded-md bg-gray-800 flex items-center justify-center text-xs cursor-pointer hover:bg-gray-700"
                title={token.name ?? token.symbol}
              >
                {token.symbol ?? token.id.split("-")[0]}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <p className="font-medium mb-1">{token.name ?? token.id}</p>
              <p className="text-xs text-gray-400">Pair: {token.pair ?? token.id}</p>
              <p className="text-xs text-gray-400">Category: {token.category}</p>
              <p className="text-xs text-gray-400">24h Change: {token.change24h}%</p>
            </PopoverContent>
          </Popover>

          <div>
            <div className="font-medium">{token.pair ?? token.id}</div>
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
          token.change24h >= 0 ? "text-green-400" : "text-red-400"
        }`}
      >
        {token.change24h >= 0 ? "+" : ""}
        {token.change24h}%
      </td>

      {/* Volume */}
      <td className="p-2 sm:p-3 hidden sm:table-cell">
        {Number(token.volume24h).toLocaleString()}
      </td>

      {/* Action Buttons with Modal */}
      <td className="p-2 sm:p-3">
        <div className="flex gap-2">
          <Modal
            trigger={
              <button className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-sm">
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
                <span className="text-gray-400">24h Change:</span> {token.change24h}%
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

          <button className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-sm">
            Watch
          </button>
        </div>
      </td>
    </tr>
  );
});
