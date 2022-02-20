import { makeStyles } from '@mui/styles';
import { useTrendingCoins } from '@/helpers/api-utils';
import { useCryptoState } from '@/context/CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { ICoin } from '@/types/types';
import Link from 'next/link';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
	carousel: {
		height: '50%',
		display: 'flex',
		alignItems: 'center',
	},
	carouselItem: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		cursor: 'pointer',
		textTransform: 'uppercase',
		color: 'white',
	},
}));

export const numberWithComas = (val: string) => {
	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const Carousel = () => {
	const { currency, symbol } = useCryptoState();

	const { data, isLoading, isError } = useTrendingCoins(currency);

	const classes = useStyles();

	const items = data?.map((coin: ICoin) => {
		const profit = coin.price_change_percentage_24h >= 0;

		return (
			<Link key={coin.id} href={`/coins/${coin.id}`}>
				<a className={classes.carouselItem}>
					<Image src={coin.image} alt={coin.name} width={100} height={80} objectFit='contain' />
					<span>
						{coin?.symbol} &nbsp;
						<span>
							{/* style={{color: profit > 0 ? 'rgb(14,203, 129)' : 'red', fontWeight: 500}} */}
							{profit && '+'} {coin.price_change_percentage_24h?.toFixed(2)}%
						</span>
					</span>

					<span style={{ fontSize: 22, fontWeight: 500 }}>
						{symbol} {numberWithComas(coin?.current_price.toFixed(2))}
					</span>
				</a>
			</Link>
		);
	});

	const responsive = {
		0: {
			items: 2,
		},
		512: {
			items: 4,
		},
	};

	return (
		<div className={classes.carousel}>
			<AliceCarousel
				mouseTracking
				infinite
				autoPlayInterval={1000}
				animationDuration={1500}
				responsive={responsive}
				disableButtonsControls
				autoPlay
				items={items}
			/>
		</div>
	);
};

export default Carousel;
