import type { AppProps } from "next/app";
import { GlobalStyle } from "../components/globalstyle";
import { ThemeProvider } from "styled-components";
import { Theme } from '../components/themestyle';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
