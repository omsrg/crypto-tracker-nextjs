import { createContext, useContext, useEffect, useState } from 'react';

type CurrencyType = 'IDR' | 'USD';
type SymbolType = 'Rp' | '$';

type ContextType = {
	currency: CurrencyType;
	symbol: SymbolType;
	// setCurrency: React.Dispatch<React.SetStateAction<CurrencyType>>;
	changeCurrency: (curr: CurrencyType) => void;
};

export const CryptoContext = createContext<ContextType | undefined>(undefined);

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

export const CryptoState = () => {
	return useContext(CryptoContext);
};
