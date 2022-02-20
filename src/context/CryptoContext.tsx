import { createContext, useContext, useEffect, useState } from 'react';
import { ContextType, CurrencyType, SymbolType } from '@/types/types';

const CryptoContext = createContext<ContextType>({
	currency: 'IDR',
	symbol: 'Rp',
	changeCurrency: () => {},
});

export const useCryptoState = () => {
	return useContext(CryptoContext);
};

export const CryptoContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [currency, setCurrency] = useState<CurrencyType>('IDR');
	const [symbol, setSymbol] = useState<SymbolType>('Rp');

	const changeCurrency = (curr: CurrencyType) => {
		setCurrency(curr);
	};

	useEffect(() => {
		if (currency === 'IDR') setSymbol('Rp');
		else if (currency === 'USD') setSymbol('$');
	}, [currency]);

	return (
		<CryptoContext.Provider value={{ currency, symbol, changeCurrency }}>
			{children}
		</CryptoContext.Provider>
	);
};

// export const useCurrency = () => {
// 	const { currency } = useContext(CryptoContext);
// 	return currency;
// };
