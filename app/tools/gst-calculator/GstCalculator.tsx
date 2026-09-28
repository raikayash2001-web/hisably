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

function rateLabel(value: number) {
  if (!Number.isFinite(value)) return "0%";
  return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(2).replace(/0$/, "")}%`;
}

export default function GstCalculator() {
  const [mode, setMode] = useState<"add" | "remove" | "without">("add");
  const [amount, setAmount] = useState("15000");
  const [rate, setRate] = useState(18);
  const [customRate, setCustomRate] = useState("");
  const [supply, setSupply] = useState<"intra" | "inter">("intra");
  const [copied, setCopied] = useState(false);

  const activeRate = customRate !== "" ? Number(customRate) : rate;
  const value = Number(amount) || 0;

  const result = useMemo(() => {
    const r = Math.max(0, activeRate || 0);

    if (mode === "without") {
      return { base: value, gst: 0, total: value };
    }

    if (mode === "add") {
      const gst = value * r / 100;
      return { base: value, gst, total: value + gst };
    }

    const base = r === 0 ? value : value / (1 + r / 100);
    return { base, gst: value - base, total: value };
  }, [activeRate, mode, value]);

  const copyResult = async () => {
    const taxLine = mode === "without"
      ? "GST: ₹0.00"
      : supply === "intra"
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
      <div className="calculator-heading">
        <h2>Calculate GST Easily</h2>
        <p>Add, remove, or calculate an amount without GST and instantly see the tax breakdown.</p>
      </div>

      <div className="tabs">
        <button type="button" aria-pressed={mode === "add"} className={`tab ${mode === "add" ? "active" : ""}`} onClick={() => setMode("add")}>
          Add GST
        </button>
        <button type="button" aria-pressed={mode === "remove"} className={`tab ${mode === "remove" ? "active" : ""}`} onClick={() => setMode("remove")}>
          Remove GST
        </button>
        <button type="button" aria-pressed={mode === "without"} className={`tab ${mode === "without" ? "active" : ""}`} onClick={() => setMode("without")}>
          Without GST
        </button>
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="gst-amount">
            {mode === "remove" ? "GST-Inclusive Amount" : "Amount"}
          </label>
          <input
            id="gst-amount"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="15000"
          />
        </div>

        <div className="field">
          <label htmlFor="gst-rate">GST Rate</label>
          <select
            id="gst-rate"
            value={customRate !== "" ? "custom" : String(rate)}
            disabled={mode === "without"}
            onChange={(e) => {
              if (e.target.value === "custom") setCustomRate(customRate || "18");
              else {
                setRate(Number(e.target.value));
                setCustomRate("");
              }
            }}
          >
            {presetRates.map((item) => <option key={item} value={item}>{item}%</option>)}
            <option value="custom">Custom</option>
          </select>
        </div>
      </div>

      {customRate !== "" && mode !== "without" && (
        <div className="field custom-rate-field">
          <label htmlFor="custom-gst-rate">Custom GST Rate</label>
          <input
            id="custom-gst-rate"
            inputMode="decimal"
            value={customRate}
            onChange={(e) => setCustomRate(e.target.value)}
            placeholder="Enter GST rate"
          />
        </div>
      )}

      {mode !== "without" && (
        <div className="field supply-field">
          <label htmlFor="supply">Tax Type</label>
          <select id="supply" value={supply} onChange={(e) => setSupply(e.target.value as "intra" | "inter")}>
            <option value="intra">Intra-State — CGST + SGST</option>
            <option value="inter">Inter-State — IGST</option>
          </select>
        </div>
      )}

      <div className="result" aria-live="polite">
        <div className="result-row"><span>Base Amount</span><strong>{money(result.base)}</strong></div>
        <div className="result-row"><span>GST Amount</span><strong>{money(result.gst)}</strong></div>
        {mode === "without" ? (
          <div className="result-row"><span>GST</span><strong>₹0.00</strong></div>
        ) : supply === "intra" ? (
          <>
            <div className="result-row"><span>CGST ({rateLabel(activeRate / 2)})</span><strong>{money(result.gst / 2)}</strong></div>
            <div className="result-row"><span>SGST ({rateLabel(activeRate / 2)})</span><strong>{money(result.gst / 2)}</strong></div>
          </>
        ) : (
          <div className="result-row"><span>IGST ({rateLabel(activeRate)})</span><strong>{money(result.gst)}</strong></div>
        )}
        <div className="result-row total"><span>Total Amount</span><strong>{money(result.total)}</strong></div>
      </div>

      <div className="result-actions">
        <button type="button" className="secondary primary-action" aria-label="Copy GST calculation result" onClick={copyResult}>
          {copied ? "Copied ✓" : "Copy Result"}
        </button>
        <button type="button" className="secondary" aria-label="Reset GST calculator" onClick={reset}>Reset</button>
      </div>
    </section>
  );
}
