 "use client";

import { useMemo, useState } from "react";

const presetRates = [3, 5, 12, 18, 28];

function money(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(Number.isFinite(value) ? value : 0);
}

export default function GstCalculator() {
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [amount, setAmount] = useState("10000");
  const [rate, setRate] = useState(18);
  const [customRate, setCustomRate] = useState("");
  const [supply, setSupply] = useState<"intra" | "inter">("intra");
  const [copied, setCopied] = useState(false);

  const activeRate = customRate !== "" ? Number(customRate) : rate;
  const value = Number(amount) || 0;

  const result = useMemo(() => {
    const r = Math.max(0, activeRate || 0);
    if (mode === "add") {
      const gst = value * r / 100;
      return { base: value, gst, total: value + gst };
    }
    const base = r === 0 ? value : value / (1 + r / 100);
    return { base, gst: value - base, total: value };
  }, [activeRate, mode, value]);

  const copyResult = async () => {
    const taxLine = supply === "intra"
      ? `CGST: ${money(result.gst / 2)}\nSGST: ${money(result.gst / 2)}`
      : `IGST: ${money(result.gst)}`;

    const text =
      `HISABLY GST Calculator\nBase Amount: ${money(result.base)}\nGST: ${money(result.gst)}\n${taxLine}\nTotal: ${money(result.total)}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const reset = () => {
    setAmount("");
    setRate(18);
    setCustomRate("");
    setSupply("intra");
    setMode("add");
  };

  return (
    <section className="calculator" aria-label="GST Calculator">
      <div className="tabs">
        <button type="button" aria-pressed={mode === "add"} className={`tab ${mode === "add" ? "active" : ""}` onClick={() => setMode("add")}>
          Add GST
        </button>
        <button type="button" aria-pressed={mode === "remove"} className={`tab ${mode === "remove" ? "active" : ""}` onClick={() => setMode("remove")}>
          Remove / Reverse GST
        </button>
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="gst-amount">
            {mode === "add" ? "Base Amount" : "GST-Inclusive Amount"}
          </label>
          <input
            id="gst-amount"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="10000"
          />
        </div>

        <div className="field">
          <label htmlFor="supply">Supply Type</label>
          <select id="supply" value={supply} onChange={(e) => setSupply(e.target.value as "intra" | "inter")}>
            <option value="intra">Intra-State (CGST + SGST)</option>
            <option value="inter">Inter-State (IGST)</option>
          </select>
        </div>
      </div>

      <div className="field" style={{ marginTop: 16 }}>
        <label>GST Rate</label>
        <div className="rate-row">
          {presetRates.map((item) => (
            <button
              key={item}
              className={`rate ${customRate === "" && rate === item ? "active" : ""}`}
              onClick={() => { setRate(item); setCustomRate(""); }}
            >
              {item}%
            </button>
          ))}
          <button
            className={`rate ${customRate !== "" ? "active" : ""}`}
            onClick={() => setCustomRate(customRate || "18")}
          >
            Custom
          </button>
        </div>
        {customRate !== "" && (
          <input
            style={{ marginTop: 9 }}
            inputMode="decimal"
            value={customRate}
            onChange={(e) => setCustomRate(e.target.value)}
            placeholder="Enter GST rate"
            aria-label="Custom GST rate"
          />
        )}
      </div>

      <button type="button" className="calculate" onClick={() => setAmount(String(value))}>
        Calculate GST
      </button>

      <div className="result" aria-live="polite">
        <div className="result-row"><span>Base Amount</span><strong>{money(result.base)}</strong></div>
        <div className="result-row"><span>GST Amount</span><strong>{money(result.gst)}</strong></div>
        {supply === "intra" ? (
          <>
            <div className="result-row"><span>CGST</span><strong>{money(result.gst / 2)}</strong></div>
            <div className="result-row"><span>SGST</span><strong>{money(result.gst / 2)}</strong></div>
          </>
        ) : (
          <div className="result-row"><span>IGST</span><strong>{money(result.gst)}</strong></div>
        )}
        <div className="result-row total"><span>Total Amount</span><strong>{money(result.total)}</strong></div>
        <div className="result-actions">
          <button type="button" className="secondary" aria-label="Copy GST calculation result" onClick={copyResult}>{copied ? "Copied ✓" : "Copy Result"}</button>
          <button type="button" className="secondary" aria-label="Reset GST calculator" onClick={reset}>Reset</button>
        </div>
      </div>
    </section>
  );
}