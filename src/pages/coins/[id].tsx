import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { fetchTrendingCoins, fetchSingleCoin, useSingleCoin } from '@/helpers/api-utils';
import { ICoin } from '@/types/types';
import { dehydrate, QueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { LinearProgress, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CoinDetail from '@/coinDetail/index';
import Image from 'next/image';
import ReactHtmlParser from 'react-html-parser';
import { numberWithComas } from '@/components/banner/Carousel';
import { useCryptoState } from '@/context/CryptoContext';

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		display: 'flex',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
			alignItems: 'center',
		},
	},
	sidebar: {
		width: '30%',
		[theme.breakpoints.down('md')]: {
			width: '100%',
		},
		display: 'flex',
		flexDirection: 'column',
		alingItems: 'center',
		marginTop: 25,
		borderRight: '2px solid grey',
	},
	heading: {
		fontWeight: 500,
		marginBottom: 20,
		fontFamily: 'Montserrat',
	},
	description: {
		width: '100%',
		fontFamily: 'Montserrat',
		padding: 25,
		paddingBottom: 15,
		paddingTop: 0,
		textAlign: 'justify',
	},
}));

const CoindDetail = () => {
	const classes = useStyles();
	const { currency, symbol } = useCryptoState();

	const router = useRouter();
	const { id } = router.query;

	const { data, isLoading, isFetching } = useSingleCoin(id as string);

	if (isLoading) return <LinearProgress sx={{ backgroundColor: 'gold' }} />;

	return (
		<div className={classes.container}>
			<div className={classes.sidebar}>
				<Image
					src={data?.image.large}
					alt={data.name}
					width={200}
					height={200}
					objectFit='contain'
				/>
				<Typography variant='h3' className={classes.heading}>
					{data?.name}
				</Typography>

				<Typography variant='subtitle1' className={classes.description}>
					{ReactHtmlParser(data?.description.en.split('. ')[0])}.
				</Typography>

				{/* <div className={classes.marketData}> */}
				<div className=''>
					<span style={{ display: 'flex' }}>
						<Typography variant='h5' className={classes.heading}>
							Rank:
						</Typography>
						&nbsp; &nbsp;
						<Typography variant='h5' style={{ fontFamily: 'Montserrat' }}>
							{data?.market_cap_rank}
						</Typography>
					</span>

					<span style={{ display: 'flex' }}>
						<Typography variant='h5' className={classes.heading}>
							Current Price:
						</Typography>
						&nbsp; &nbsp;
						<Typography variant='h5' style={{ fontFamily: 'Montserrat' }}>
							{symbol} {numberWithComas(data?.market_data.current_price[currency.toLowerCase()])}
						</Typography>
					</span>

					<span style={{ display: 'flex' }}>
						<Typography variant='h5' className={classes.heading}>
							Market Cap:
						</Typography>
						&nbsp; &nbsp;
						<Typography variant='h5' style={{ fontFamily: 'Montserrat' }}>
							{symbol}{' '}
							{numberWithComas(
								data?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6)
							)}
							M
						</Typography>
					</span>
				</div>
			</div>

			{/* chart */}
			<CoinDetail coin={data} />
		</div>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const coins = await fetchTrendingCoins('IDR');

	const paths = coins.map((coin: ICoin) => ({ params: { id: coin.id } }));

	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(['coin', params?.id], () =>
		fetchSingleCoin(params?.id as string)
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};

export default CoindDetail;
