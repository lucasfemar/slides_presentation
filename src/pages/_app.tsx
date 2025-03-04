import type { AppProps } from "next/app";
import { GlobalStyle } from "src/styled/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { Theme } from "@/src/styled/ThemeStyle";
import Link from "next/link";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <Link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
