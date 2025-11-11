"use client";

import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
} from "recharts";

interface SparklineChartProps {
  data: number[];
  color?: string;
}

export default function SparklineChart({ data, color = "#60A5FA" }: SparklineChartProps) {
  const formattedData = useMemo(
    () => data.map((v, i) => ({ index: i, value: v })),
    [data]
  );

  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={formattedData}>
        <XAxis dataKey="index" hide />
        <YAxis domain={["auto", "auto"]} hide />
        <Tooltip
          contentStyle={{
            backgroundColor: "#111827",
            border: "1px solid #1f2937",
            borderRadius: "6px",
            fontSize: "0.75rem",
          }}
          formatter={(val: number) => [`$${val.toFixed(4)}`, "Price"]}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
