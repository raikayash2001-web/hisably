import type { Metadata } from "next";
import GstCalculator from "./GstCalculator";

const siteUrl = "https://hisably.com";
const pageUrl = `${siteUrl}/tools/gst-calculator/`;

export const metadata: Metadata = {
  title: "GST Calculator – Calculate GST Online | HISABLY",
  description: "Calculate GST online with HISABLY. Add or remove GST, calculate CGST, SGST and IGST, and get the tax amount and total instantly.",
  keywords: ["GST Calculator", "GST Calculator India", "Add GST", "Remove GST", "CGST", "SGST", "IGST"],
  authors: [{ name: "HISABLY" }],
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true },
  openGraph: {
    title: "GST Calculator – Calculate GST Online | HISABLY",
    description: "Calculate GST online with HISABLY. Add or remove GST, calculate CGST, SGST and IGST, and get the tax amount and total instantly.",
    type: "website",
    url: pageUrl
  },
  twitter: {
    card: "summary",
    title: "GST Calculator – Calculate GST Online | HISABLY",
    description: "Calculate GST online with HISABLY. Add or remove GST, calculate CGST, SGST and IGST, and get the tax amount and total instantly."
  }
};

const faq = [
  ["How do I add GST to an amount?", "Enter the amount, select Add GST, choose the applicable rate, and the total updates automatically."],
  ["How do I remove GST from a final price?", "Select Remove GST and enter the GST-inclusive amount. HISABLY calculates the underlying amount and GST portion."],
  ["What is the difference between CGST and SGST?", "For an intra-state GST calculation, the total GST can be displayed as separate CGST and SGST components."],
  ["When is IGST shown?", "Choose Inter-State in the calculator to see the GST amount as IGST."],
  ["Does the calculator update while I type?", "Yes. The result updates instantly as you change the amount, GST rate, or tax type."],
  ["Can I use a custom GST rate?", "Yes. HISABLY includes a custom-rate option so you can enter the rate relevant to your calculation."]
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
      "@type": "Question", name: question,
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
          <p>Calculate GST instantly with a simple, easy-to-use calculator. Add or remove GST and see CGST, SGST, IGST and the final amount.</p>
        </div>
        <GstCalculator />
        <article className="content">
          <h2>What is a GST Calculator?</h2>
          <p>A GST calculator helps you quickly find the GST amount and the final price of a product or service. Enter the amount, choose the applicable GST rate, and the calculator shows the tax breakdown instantly.</p>
          <h2>How to Calculate GST</h2>
          <p>To add GST to a price, multiply the original amount by the GST rate and divide the result by 100. Add that GST amount to the original price to get the GST-inclusive total.</p>
          <div className="formula">GST Amount = Amount × GST Rate ÷ 100</div>
          <div className="formula">Total Amount = Amount + GST Amount</div>
          <h2>GST Inclusive and Exclusive Amount</h2>
          <p>A GST-exclusive amount is the price before GST is added. A GST-inclusive amount already contains GST. Use <strong>Remove / Reverse GST</strong> when you know the final tax-inclusive price and want to find the original taxable amount.</p>
          <h2>CGST, SGST and IGST</h2>
          <p>For an intra-state supply, GST can be represented as CGST and SGST. When the selected GST rate is split equally, each component is half of the total GST rate. For an inter-state supply, the calculator shows the full GST rate as IGST.</p>
          <h2>GST Calculation Example</h2>
          <p>Suppose the taxable amount is ₹1,000 and the selected GST rate is 18%. GST is ₹180, making the GST-inclusive total ₹1,180. For an intra-state calculation, the 18% GST is shown as CGST 9% and SGST 9%.</p>
          <h2>Frequently Asked Questions</h2>
          <div className="faq">
            {faq.map(([question, answer]) => (
              <details key={question}><summary>{question}</summary><p>{answer}</p></details>
            ))}
          </div>
          <h2>Related calculators</h2>
          <p>Explore the <a href="/tools/gst-calculator/">GST Calculator</a> and other HISABLY finance tools as they become available.</p>
        </article>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </main>
  );
}
