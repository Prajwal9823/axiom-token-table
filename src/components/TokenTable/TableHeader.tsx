"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/UI/Tooltip";

export default function TableHeader({
  title,
  sortKey,
  className = "",
}: {
  title: string;
  sortKey: "price" | "change24h" | "volume24h";
  className?: string;
}) {
  const dispatch = useDispatch();
  const curKey = useSelector((s: RootState) => s.tokens.sortKey);
  const curDir = useSelector((s: RootState) => s.tokens.sortDir);

  const isActive = curKey === sortKey;

  function toggle() {
    if (!isActive) {
      dispatch({
        type: "tokens/setSort",
        payload: { key: sortKey, dir: "desc" },
      });
    } else {
      dispatch({
        type: "tokens/setSort",
        payload: { key: sortKey, dir: curDir === "desc" ? "asc" : "desc" },
      });
    }
  }

  return (
    <th className={`${className} p-2 sm:p-3 text-left`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggle}
              className="inline-flex items-center gap-2 hover:text-white text-gray-300"
            >
              <span>{title}</span>
              <SortIcon active={isActive} dir={curDir} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            Sort by {title.toLowerCase()}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </th>
  );
}

function SortIcon({ active, dir }: { active: boolean; dir: "asc" | "desc" }) {
  return active ? (
    <svg width="12" height="12" viewBox="0 0 24 24" className="inline-block">
      {dir === "desc" ? (
        <path fill="currentColor" d="M7 10l5 5 5-5z" />
      ) : (
        <path fill="currentColor" d="M7 14l5-5 5 5z" />
      )}
    </svg>
  ) : (
    <svg width="12" height="12" viewBox="0 0 24 24" className="opacity-40 inline-block">
      <path fill="currentColor" d="M7 14l5-5 5 5z" />
    </svg>
  );
}
