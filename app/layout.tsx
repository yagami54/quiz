import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "YR — تحدي الثقافة | Yuri4Games",
  description: "لعبة ثقافية حية وتوقّعات ماتشات PUBG مباشرة من شات Kick",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col text-slate-100 font-[family-name:var(--font-cairo)]"
      >
        {children}
      </body>
    </html>
  );
}
