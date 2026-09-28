import type { Metadata } from "next";
import GstCalculator from "./GstCalculator";

const siteUrl = "https://hisably.com";
const pageUrl = `${siteUrl}/tools/gst-calculator/`;

export const metadata: Metadata = {
  title: "GST Calculator India – Add & Remove GST Online | HISABLY",
  description: "Free GST Calculator India to add or remove GST instantly. Calculate CGST, SGST and IGST, find GST-inclusive and exclusive amounts, and get the total.",
  keywords: [
    "GST Calculator",
    "GST Calculator India",
    "Add GST Calculator",
    "Remove GST Calculator",
    "Reverse GST Calculator",
    "GST Inclusive Calculator",
    "GST Exclusive Calculator",
    "CGST Calculator",
    "SGST Calculator",
    "IGST Calculator"
  ],
  authors: [{ name: "HISABLY" }],
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true },
  openGraph: {
    title: "GST Calculator India – Add & Remove GST Online | HISABLY",
    description: "Calculate GST instantly with HISABLY. Add or remove GST and calculate CGST, SGST, IGST and GST-inclusive or exclusive amounts.",
    type: "website",
    url: pageUrl
  },
  twitter: {
    card: "summary",
    title: "GST Calculator India – Add & Remove GST Online | HISABLY",
    description: "Calculate GST instantly with HISABLY. Add or remove GST and calculate CGST, SGST, IGST and GST-inclusive or exclusive amounts."
  }
};

const faq = [
  ["What is a GST Calculator?", "A GST calculator helps calculate the GST amount, taxable value and final amount for a GST rate. HISABLY can add GST to a base amount or remove GST from a GST-inclusive amount."],
  ["How do I add GST to an amount?", "Enter the taxable amount, select Add GST, choose the applicable GST rate, and HISABLY calculates the GST amount and final total instantly."],
  ["How do I remove GST from a final price?", "Select Remove GST and enter the GST-inclusive amount. HISABLY calculates the original taxable amount and the GST included in the final price."],
  ["What is the GST inclusive amount?", "A GST-inclusive amount already contains GST. Reverse or Remove GST calculation is used to find the taxable value and GST component included in that total."],
  ["What is the GST exclusive amount?", "A GST-exclusive amount is the price before GST. Add GST calculation adds the selected tax rate to this base amount and shows the final price."],
  ["What is the difference between CGST, SGST and IGST?", "For an intra-state supply, GST can be shown as CGST and SGST. For an inter-state supply, the GST amount is shown as IGST."],
  ["When is IGST shown?", "Choose Inter-State in the calculator to display the full GST amount as IGST."],
  ["Does the calculator update while I type?", "Yes. The result updates instantly when you change the amount, GST rate or tax type."],
  ["Can I use a custom GST rate?", "Yes. HISABLY provides a Custom option for calculations where you need to enter a specific GST rate."],
  ["What is the GST calculation formula?", "For adding GST: GST Amount = Amount × GST Rate ÷ 100. Total Amount = Amount + GST Amount. For removing GST from an inclusive total: GST Amount = Inclusive Amount × GST Rate ÷ (100 + GST Rate)."],
  ["Can I use this GST calculator for invoices and product prices?", "Yes. It can be used to estimate GST, taxable value and the GST-inclusive total for common pricing and invoice calculations. Always verify the applicable HSN or SAC classification and current official rate for the actual supply."]
];

export default function GstCalculatorPage() {
  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "HISABLY GST Calculator",
    url: pageUrl,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description: "A GST calculator for adding or removing GST and calculating CGST, SGST and IGST.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" }
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl + "/" },
      { "@type": "ListItem", position: 2, name: "Finance", item: siteUrl + "/finance" },
      { "@type": "ListItem", position: 3, name: "GST Calculator", item: pageUrl }
    ]
  };

  return (
    <main className="tool-page">
      <div className="container">
        <div className="breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a> / Finance / GST Calculator
        </div>

        <div className="tool-hero">
          <h1>GST Calculator</h1>
          <p>Calculate GST instantly with a simple, easy-to-use calculator.</p>
        </div>

        <GstCalculator />

        <article className="content">
          <h2>What is a GST Calculator?</h2>
          <p>A GST calculator helps you quickly calculate the Goods and Services Tax amount, taxable value and final price of a product or service. Enter an amount, choose the applicable GST rate, and the calculator shows the tax breakdown instantly.</p>

          <h2>How to Use the GST Calculator</h2>
          <ol>
            <li>Enter the amount you want to calculate.</li>
            <li>Select <strong>Add GST</strong>, <strong>Remove GST</strong> or <strong>Without GST</strong>.</li>
            <li>Choose the applicable GST rate or enter a custom rate.</li>
            <li>Select <strong>Intra-State — CGST + SGST</strong> or <strong>Inter-State — IGST</strong> when applicable.</li>
            <li>Review the GST amount, tax breakup and total amount.</li>
          </ol>

          <h2>GST Calculation Formula</h2>
          <p>To add GST to a GST-exclusive amount, multiply the amount by the GST rate and divide by 100.</p>
          <div className="formula">GST Amount = Amount × GST Rate ÷ 100</div>
          <div className="formula">Total Amount = Amount + GST Amount</div>

          <h2>GST Inclusive and Exclusive Amount</h2>
          <p>A <strong>GST-exclusive amount</strong> is the price before GST is added. A <strong>GST-inclusive amount</strong> already contains GST. Use Remove GST when you know the final tax-inclusive price and want to find the taxable value and GST component.</p>

          <h2>Reverse GST Calculation</h2>
          <p>When a final price already includes GST, the GST portion can be separated from the total using the reverse GST formula.</p>
          <div className="formula">GST Amount = Inclusive Amount × GST Rate ÷ (100 + GST Rate)</div>
          <p>For example, if an amount is ₹1,180 including 18% GST, the taxable value is ₹1,000 and the GST amount is ₹180.</p>

          <h2>CGST, SGST and IGST</h2>
          <p>For an intra-state supply, the GST amount can be represented as CGST and SGST. When the selected rate is split equally, each component is half of the total GST rate. For an inter-state supply, the calculator displays the full GST amount as IGST.</p>

          <h2>GST Calculation Example</h2>
          <p>Suppose the taxable amount is ₹1,000 and the selected GST rate is 18%. GST is ₹180, making the GST-inclusive total ₹1,180. For an intra-state calculation, the 18% GST is shown as CGST 9% and SGST 9%.</p>

          <h2>GST Rates and Applicability</h2>
          <p>GST rates depend on the goods or services and their applicable HSN or SAC classification. The GST Council's 2025 rate rationalisation introduced a standard 18% rate, a merit 5% rate and a special 40% rate for select goods and services. Always verify the current official rate applicable to the specific supply before issuing an invoice or filing a return.</p>

          <h2>Frequently Asked Questions</h2>
          <div className="faq">
            {faq.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>

          <h2>More GST Tools</h2>
          <p>HISABLY is building a broader set of GST and finance tools. Related calculators and GST utilities will be added here as they become available.</p>
        </article>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </main>
  );
}
