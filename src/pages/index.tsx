import Head from 'next/head';
import Banner from '@/components/banner/Banner';
import { fetchCoinList } from '@/helpers/api-utils';
import type { NextPage } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import CoinsTable from '@/components/coinsTable/CoinsTable';

const Home: NextPage = () => {
	return (
		<div className=''>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className=''>
				<Banner />
				<CoinsTable />
			</main>
		</div>
	);
};

export const getStaticProps = async () => {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery('coinList', () => fetchCoinList('IDR'));

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};

export default Home;
