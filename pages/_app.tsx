import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      className="px-4 max-w-5xl mx-auto flex flex-col min-h-full
    selection:bg-blue-200 dark:selection:bg-blue-500 dark:selection:text-slate-900"
    >
      <Head>
        <title>Royale Calculator</title>
        <link rel="icon" href="favicon.svg" />
      </Head>
      <Script src="/theme.js" strategy="beforeInteractive" />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
