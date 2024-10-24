import type { AppProps } from 'next/app';
import '../pages/registrationPage/registrationPage.css';

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
