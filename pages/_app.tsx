import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { MyContextProvider } from "../context/MyContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MyContextProvider>
      <div className="px-4 max-w-5xl mx-auto flex flex-col min-h-full selection:bg-blue-200">
        <Head>
          <title>Royale Calculator</title>
          <link rel="icon" href="favicon.svg" />
        </Head>
        <Component {...pageProps} />
      </div>
    </MyContextProvider>
  );
}

export default MyApp;
