import type { AppProps } from 'next/app'; 
import { GlobalStyle } from '../pages/createGlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
