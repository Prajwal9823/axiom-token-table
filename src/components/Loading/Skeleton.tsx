"use client";
import React from "react";

export default function LoadingSkeleton() {
  const rows = Array.from({ length: 4 }).map((_, i) => i);
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-gray-900 rounded-md border border-gray-800 p-4">
        <div className="animate-pulse">
          <div className="h-6 w-48 bg-gray-800 rounded mb-4" />
          <div className="space-y-2">
            {rows.map((r) => (
              <div key={r} className="flex gap-4 items-center">
                <div className="h-8 w-8 bg-gray-800 rounded" />
                <div className="h-5 w-56 bg-gray-800 rounded" />
                <div className="h-5 w-24 bg-gray-800 rounded ml-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
