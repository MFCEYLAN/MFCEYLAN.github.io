import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mfceylan.github.io"),
  title: "Mustafa Furkan Ceylan | AI Security & Edge AI Researcher",
  description:
    "Researcher in AI security, edge AI, IoT cybersecurity, intrusion detection and explainable artificial intelligence.",
  keywords: [
    "Mustafa Furkan Ceylan",
    "AI Security",
    "Edge AI",
    "IoT Cybersecurity",
    "Intrusion Detection Systems",
    "Explainable AI",
    "Machine Learning",
  ],
  authors: [{ name: "Mustafa Furkan Ceylan", url: "https://mfceylan.github.io" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mustafa Furkan Ceylan | AI Security & Edge AI Researcher",
    description: "Research, publications, projects, teaching and collaboration in AI security, edge AI and IoT cybersecurity.",
    url: "https://mfceylan.github.io",
    siteName: "Mustafa Furkan Ceylan",
    type: "profile",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
