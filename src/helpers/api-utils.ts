// import { TrendingCoins } from './api';
import { CurrencyType } from '@/types/types';

export const fetchTrendingCoins = async (currency: CurrencyType) => {
	const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

	const response = await fetch(URL);
	if (!response.ok) {
		throw new Error('Error Fetching Data!');
	}

	return await response.json();
};
