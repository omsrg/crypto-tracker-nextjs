import '../styles/globals.css';
import 'react-alice-carousel/lib/alice-carousel.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout/Layout';
import { CryptoContextProvider } from '@/context/CryptoContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '@/theme';
import createEmotionCache from '@/createEmotionCache';

const queryClient = new QueryClient();

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<CryptoContextProvider>
					<CacheProvider value={emotionCache}>
						<ThemeProvider theme={theme}>
							<CssBaseline />
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</ThemeProvider>
					</CacheProvider>
				</CryptoContextProvider>
				<ReactQueryDevtools />
			</Hydrate>
		</QueryClientProvider>
	);
}

export default MyApp;
