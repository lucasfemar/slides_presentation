import type { AppProps } from 'next/app';
import './registration/registration.css';

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
