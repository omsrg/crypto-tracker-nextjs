import Link from 'next/link';
import { makeStyles } from '@mui/styles';
import {
	AppBar,
	Container,
	Toolbar,
	Typography,
	Select,
	MenuItem,
	createTheme,
	ThemeProvider,
} from '@mui/material';
import { CryptoState } from '@/context/CryptoContext';

const useStyles = makeStyles(() => ({
	title: {
		flex: 1,
		color: 'gold',
		fontFamily: 'Montserrat',
		fontWeight: 'bold',
		cursor: 'pointer',
	},
}));

import { useContext } from 'react';
// import { CryptoContext } from '@/context/CryptoContext';

const Header = () => {
	const classes = useStyles();

	const ctx = CryptoState();

	const { currency, changeCurrency } = ctx;

	console.log(currency);

	const darkTheme = createTheme({
		palette: {
			primary: {
				main: '#fff',
			},
			mode: 'dark',
		},
	});

	return (
		<ThemeProvider theme={darkTheme}>
			<AppBar color='transparent' position='static'>
				<Container>
					<Toolbar>
						<Link href='/'>
							<a>
								<Typography className={classes.title}>Crypto Hunter</Typography>
							</a>
						</Link>

						<Select
							variant='outlined'
							style={{
								width: 100,
								height: 40,
								marginRight: 15,
							}}
							value={currency}
							onChange={(e) => changeCurrency(e.target.value)}
						>
							<MenuItem value={'USD'}>USD</MenuItem>
							<MenuItem value={'IDR'}>IDR</MenuItem>
						</Select>
					</Toolbar>
				</Container>
			</AppBar>
		</ThemeProvider>
	);
};

export default Header;
