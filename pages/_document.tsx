import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="dark:bg-slate-900 dark:text-slate-400">
        <Main />
        <NextScript />
        <Script src="/theme.js" strategy="beforeInteractive" />
      </body>
    </Html>
  );
}
