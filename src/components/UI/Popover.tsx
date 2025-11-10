"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import React from "react";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export function PopoverContent({
  children,
  className = "",
  side = "bottom",
  align = "center",
}: {
  children: React.ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        side={side}
        align={align}
        sideOffset={6}
        className={`z-50 rounded-md border border-gray-800 bg-gray-900 p-3 shadow-lg text-sm text-gray-200 animate-in fade-in ${className}`}
      >
        {children}
        <PopoverPrimitive.Arrow className="fill-gray-800" />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}
