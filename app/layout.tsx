import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/site.config";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: SITE.title, template: `%s · ${SITE.title}` },
  description: SITE.description,
  metadataBase: new URL(SITE.url + "/"),
  alternates: { types: { "application/rss+xml": "rss.xml" } },
  icons: { icon: `${SITE.basePath}/favicon.svg` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.lang}>
      <body>
        <header className="site-header">
          <div className="wrap">
            <Link className="site-title" href="/">
              {SITE.title}
            </Link>
            <nav className="site-nav">
              <Link href="/">Artículos</Link>
              <a href={`${SITE.basePath}/rss.xml`}>RSS</a>
            </nav>
          </div>
        </header>
        <main className="wrap">{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            © {new Date().getFullYear()} {SITE.author} · Hecho con Storia
          </div>
        </footer>
      </body>
    </html>
  );
}
