import Link from "next/link";

const categories = [
  {
    title: "Finance & Money",
    description: "Calculate GST, EMI, SIP, salary and more.",
    tools: [
      ["GST Calculator", "Add or remove GST and calculate CGST, SGST and IGST.", "/tools/gst-calculator/", "₹"],
      ["EMI Calculator", "Calculate monthly loan payments and total interest.", "#", "₹"],
      ["SIP Calculator", "Estimate SIP investment growth and returns.", "#", "↗"]
    ]
  },
  {
    title: "Developer utilities",
    description: "Fast browser-based tools for developers.",
    tools: [
      ["JSON Formatter & Validator", "Beautify, minify and validate JSON.", "#", "{}"],
      ["JWT Decoder", "Decode a JWT header and payload locally.", "#", "⌁"],
      ["Base64 Encode / Decode", "Encode or decode text using Base64.", "#", "01"]
    ]
  },
  {
    title: "Security & email",
    description: "Check certificates, headers and deliverability.",
    tools: [
      ["SSL / TLS Checker", "Inspect a site's certificate, chain and expiry date.", "#", "⌁"],
      ["HTTP Security Headers", "Review important security headers.", "#", "◈"],
      ["SPF / DKIM / DMARC Checker", "Check email authentication records.", "#", "✉"]
    ]
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="home-hero">
        <div className="container home-hero-inner">
          <div className="home-hero-copy">
            <span className="eyebrow">● Free online tools</span>
            <h1>Free Online Tools &amp; Calculators</h1>
            <p className="tagline">Useful tools. Simple answers.</p>
            <p className="description">
              HISABLY brings free online calculators, converters, developer utilities
              and everyday tools together in one fast, clean workspace.
            </p>
          </div>
          <div className="home-hero-visual" aria-hidden="true">
            <div className="home-orb">
              <div className="home-orb-mark">HISA<span>BLY</span></div>
            </div>
            <div className="home-float one">
              <strong>120+ tools</strong>
              <span>Built for everyday work</span>
            </div>
            <div className="home-float two">
              <strong>Fast &amp; simple</strong>
              <span>Clear results, less clutter</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-tools">
        <div className="container">
          <div className="section-head">
            <h2>Explore tools</h2>
            <p>Built to be fast, clear and easy to use.</p>
          </div>

          {categories.map((category) => (
            <section className="category" key={category.title}>
              <div className="category-title">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
              <div className="tool-grid">
                {category.tools.map(([name, description, href, icon]) => (
                  href === "#" ? (
                    <div className="tool-card" key={name} aria-disabled="true">
                      <span className="live">Coming soon</span>
                      <div className="tool-icon">{icon}</div>
                      <h4>{name}</h4>
                      <p>{description}</p>
                    </div>
                  ) : (
                    <Link className="tool-card" href={href} key={name}>
                      <span className="live">Live</span>
                      <div className="tool-icon">{icon}</div>
                      <h4>{name}</h4>
                      <p>{description}</p>
                    </Link>
                  )
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
