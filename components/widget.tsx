'use client';
import React, { useState } from "react";

export default function Widget() {
  const [side, setSide] = useState<"YES" | "NO">("YES");
  const [price, setPrice] = useState(0.56);
  const [size, setSize] = useState(25);
  const [fee, setFee] = useState(0.01);

  const isYes = side === "YES";
  const costPer = isYes ? price + fee : (1 - price) + fee;
  const payoffIfYes = isYes ? 1 : 0;
  const payoffIfNo = isYes ? 0 : 1;

  const breakevenChosenProb = Math.min(1, Math.max(0, costPer));
  const pnlIfYes = (payoffIfYes - costPer) * size;
  const pnlIfNo = (payoffIfNo - costPer) * size;

  const fmtPct = (x: number) => `${(x * 100).toFixed(1)}%`;
  const fmtUSD = (x: number) =>
    x >= 0 ? `+$${x.toFixed(2)}` : `-$${Math.abs(x).toFixed(2)}`;
  const impliedChosenProb = isYes ? price : 1 - price;

  return (
    <div className="w-full rounded-2xl border border-gray-200 p-4 shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-4">Breakeven Bar</h2>

      {/* Controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Side</label>
          <select
            value={side}
            onChange={(e) => setSide(e.target.value as "YES" | "NO")}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Price (0–1)</label>
          <input
            type="number"
            step="0.01"
            min={0}
            max={1}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Size</label>
          <input
            type="number"
            min={1}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Fee ($)</label>
          <input
            type="number"
            step="0.005"
            min={0}
            max={0.05}
            value={fee}
            onChange={(e) => setFee(Number(e.target.value))}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Probability Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>Implied (chosen)</span>
          <span>Breakeven (chosen)</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-3 bg-gray-900"
            style={{ width: `${Math.max(0, Math.min(100, impliedChosenProb * 100))}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="font-medium">{fmtPct(impliedChosenProb)}</span>
          <span className="font-medium">{fmtPct(breakevenChosenProb)}</span>
        </div>
      </div>

      {/* P/L Scenarios */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-50 border border-gray-200 p-3">
          <div className="text-xs text-gray-600">If YES occurs</div>
          <div className={`text-lg font-semibold ${pnlIfYes >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
            {fmtUSD(pnlIfYes)}
          </div>
        </div>
        <div className="rounded-xl bg-gray-50 border border-gray-200 p-3">
          <div className="text-xs text-gray-600">If NO occurs</div>
          <div className={`text-lg font-semibold ${pnlIfNo >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
            {fmtUSD(pnlIfNo)}
          </div>
        </div>
      </div>
    </div>
  );
}
