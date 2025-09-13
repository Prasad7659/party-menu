import React from "react";

export default function SummaryBar({ countsPerCategory, totalSelected }) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] md:w-[80%] bg-white shadow-lg border rounded-lg px-4 py-3 flex justify-between items-center">
      <div className="flex gap-2 flex-wrap">
        {Object.entries(countsPerCategory).map(([k, v]) => (
          <div key={k} className="bg-blue-50 border border-blue-200 rounded px-2 py-1 text-xs">
            <span className="font-semibold">{k}</span>: {v}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm">Total: <b>{totalSelected}</b></span>
        <button className="px-3 py-1 rounded bg-green-600 text-white text-sm">Continue</button>
      </div>
    </div>
  );
}
