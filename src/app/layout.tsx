import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AskPortfolioButton from "@/components/AskPortfolioButton";

export const metadata: Metadata = {
  title: "Dhruvi Senjaliya — AI/ML Developer",
  description:
    "AI/ML Developer building production-ready systems with LLMs, RAG pipelines, Agentic AI, and intelligent automation. Based in Gujarat, India.",
  keywords: [
    "AI Developer",
    "ML Developer",
    "LLM Engineer",
    "RAG",
    "Agentic AI",
    "Python",
    "Dhruvi Senjaliya",
    "Generative AI",
    "NLP",
    "Computer Vision",
  ],
  authors: [{ name: "Dhruvi Senjaliya" }],
  openGraph: {
    title: "Dhruvi Senjaliya — AI/ML Developer",
    description:
      "AI/ML Developer building production-ready systems with LLMs, RAG pipelines, Agentic AI, and intelligent automation.",
    url: "https://dhruvisen.dev",
    siteName: "Dhruvi Senjaliya",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruvi Senjaliya — AI/ML Developer",
    description:
      "AI/ML Developer building production-ready systems with LLMs, RAG pipelines, Agentic AI, and intelligent automation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <AskPortfolioButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
