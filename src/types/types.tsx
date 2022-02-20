export type CurrencyType = 'IDR' | 'USD';

export type SymbolType = 'Rp' | '$';

export type ContextType = {
	currency: CurrencyType;
	symbol: SymbolType;
	// setCurrency: React.Dispatch<React.SetStateAction<CurrencyType>>;
	changeCurrency: (curr: CurrencyType) => void;
};

export interface ICoin {
	id: string;
	symbol: string;
	name: string;
	image: string;
	current_price: number;
	market_cap: number;
	market_cap_rank: number;
	fully_diluted_valuation: number;
	total_volume: number;
	high_24h: number;
	low_24h: number;
	price_change_24h: number;
	price_change_percentage_24h: number;
	market_cap_change_24h: number;
	market_cap_change_percentage_24h: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	ath: number;
	ath_change_percentage: number;
	ath_date: Date;
	atl: number;
	atl_change_percentage: number;
	atl_date: Date;
	roi: null;
	last_updated: Date;
	price_change_percentage_24h_in_currency: number;
}

// export interface IHistoricData {
// 	prices: Array<number[]>;
// 	market_caps: Array<number[]>;
// 	total_volumes: Array<number[]>;
// }

export interface IHistoricData {
	prices: Array<number[]>;
}
