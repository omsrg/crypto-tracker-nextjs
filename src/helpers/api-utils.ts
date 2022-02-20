// import { TrendingCoins } from './api';
import { CurrencyType } from '@/types/types';
import { useQuery } from 'react-query';

export const fetchCoinList = async (currency: CurrencyType) => {
	const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

	const response = await fetch(URL);
	if (!response.ok) {
		throw new Error('Error Fetching Data!');
	}

	return await response.json();
};

export const useCoinList = (currency: CurrencyType) => {
	return useQuery(['coinList', currency], () => fetchCoinList(currency));
};

export const fetchTrendingCoins = async (currency: CurrencyType) => {
	const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

	const response = await fetch(URL);
	if (!response.ok) {
		throw new Error('Error Fetching Data!');
	}

	return await response.json();
};

export const useTrendingCoins = (currency: CurrencyType) => {
	return useQuery(['trendingCoins', currency], () => fetchTrendingCoins(currency));
};

export const fetchSingleCoin = async (id: string) => {
	const URL = `https://api.coingecko.com/api/v3/coins/${id}`;

	const response = await fetch(URL);
	if (!response.ok) {
		throw new Error('Error Fetching Data!');
	}

	return await response.json();
};

export const useSingleCoin = (id: string) => {
	return useQuery(['singleCoin', id], () => fetchSingleCoin(id));
};

export const fetchHistoricData = async (id: string, days: number, currency: CurrencyType) => {
	const URL = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

	const response = await fetch(URL);
	if (!response.ok) {
		throw new Error('Error Fetching Data!');
	}

	return await response.json();
};
