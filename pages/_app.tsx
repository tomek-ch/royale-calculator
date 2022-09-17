import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

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
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
