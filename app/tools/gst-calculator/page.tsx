import type { Metadata } from "next";
import GstCalculator from "./GstCalculator";

export const metadata: Metadata = {
  title: "GST Calculator India – Add, Remove & Reverse GST",
  description:
    "Free GST Calculator for India. Add or remove GST, calculate CGST, SGST and IGST, and find the final amount instantly.",
  alternates: { canonical: "/tools/gst-calculator/" },
  openGraph: {
    title: "GST Calculator India – Add, Remove & Reverse GST | HISABLY",
    description: "Calculate GST, CGST, SGST and IGST instantly with HISABLY.",
    type: "website"
  }
};

const faq = [
  ["What is a GST calculator?", "A GST calculator helps you calculate GST on a base amount or find the base amount and GST component from a GST-inclusive amount."],
  ["How do I add GST to a price?", "Multiply the base amount by the GST rate divided by 100 to get the GST amount, then add it to the base amount."],
  ["How do I remove GST from an amount?", "For a GST-inclusive amount, divide the inclusive amount by 1 plus the GST rate divided by 100 to get the pre-GST amount."],
  ["What are CGST and SGST?", "For an intra-state transaction, GST is generally split into CGST and SGST. The exact applicable treatment depends on the transaction and tax rules."],
  ["What is IGST?", "IGST is generally used for inter-state supplies. The applicable tax treatment depends on the nature of the transaction."],
  ["Can I use a custom GST rate?", "Yes. HISABLY includes a custom-rate option so you can enter the rate relevant to your calculation."]
];

export default function GstCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "GST Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    description: "Free online GST calculator for adding and removing GST.",
    url: "https://hisably.com/tools/gst-calculator/"
  };

  return (
    <main className="tool-page">
      <div className="container">
        <div className="breadcrumbs">
          <a href="/">Home</a> / Finance / GST Calculator
        </div>

        <div className="tool-hero">
          <h1>GST Calculator</h1>
          <p>
            Add or remove GST and calculate the GST amount, CGST, SGST, IGST and
            final price in seconds.
          </p>
        </div>

        <GstCalculator />

        <article className="content">
          <h2>GST Calculator India</h2>
          <p>
            HISABLY&apos;s GST Calculator is designed for quick GST calculations.
            Enter an amount, choose the calculation mode and select a GST rate.
            The calculator shows the base amount, GST amount and final amount clearly.
          </p>

          <h2>How to calculate GST</h2>
          <p>When adding GST to a pre-tax amount:</p>
          <div className="formula">GST = Base Amount × GST Rate ÷ 100</div>
          <p>Then:</p>
          <div className="formula">Total Amount = Base Amount + GST</div>

          <h2>How to remove GST / reverse GST</h2>
          <p>
            If the amount already includes GST, the pre-GST amount can be calculated
            from the inclusive amount and the applicable GST rate.
          </p>
          <div className="formula">Base Amount = Inclusive Amount ÷ (1 + GST Rate ÷ 100)</div>
          <p>Then:</p>
          <div className="formula">GST = Inclusive Amount − Base Amount</div>

          <h2>Example: 18% GST on ₹10,000</h2>
          <p>
            GST is ₹1,800 and the final amount is ₹11,800. For an intra-state
            calculation at 18%, the GST component can be represented as ₹900 CGST
            and ₹900 SGST, subject to the applicable tax treatment.
          </p>

          <h2>CGST, SGST and IGST</h2>
          <p>
            GST treatment can depend on whether a supply is intra-state or inter-state
            and on the applicable tax rules. Use the calculator as a calculation aid
            and verify the applicable rate/classification for your transaction.
          </p>

          <h2>Frequently Asked Questions</h2>
          <div className="faq">
            {faq.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>

          <h2>Related calculators</h2>
          <p>
            Explore the <a href="/tools/gst-calculator/">GST Calculator</a> and
            other HISABLY finance tools as they become available.
          </p>
        </article>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}