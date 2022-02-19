import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout/Layout';
import { CryptoContextProvider } from '@/context/CryptoContext';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<CryptoContextProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</CryptoContextProvider>
	);
}

export default MyApp;
