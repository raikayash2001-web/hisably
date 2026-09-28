import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://hisably.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HISABLY – Free Online Tools & Calculators",
    template: "%s | HISABLY"
  },
  description:
    "HISABLY provides fast, simple and useful online calculators, converters, developer utilities and everyday tools.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "HISABLY – Free Online Tools & Calculators",
    description: "Fast and useful online tools for everyday work.",
    type: "website",
    url: siteUrl
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container nav">
            <a className="logo" href="/">HISAB<span>LY</span></a>
            <nav className="nav-links" aria-label="Primary navigation">
              <a href="/">Tools</a>
              <a href="/tools/gst-calculator/">Finance</a>
              <a href="/about/">About</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="container footer-inner">
            <div>© {new Date().getFullYear()} HISABLY</div>
            <div className="footer-links">
              <a href="/about/">About</a>
              <a href="/contact/">Contact</a>
              <a href="/privacy/">Privacy</a>
              <a href="/terms/">Terms</a>
              <a href="/disclaimer/">Disclaimer</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}