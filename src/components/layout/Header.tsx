import Link from 'next/link';
import { makeStyles } from '@mui/styles';
import { AppBar, Container, Toolbar, Typography, Select, MenuItem } from '@mui/material';
import { useCryptoState } from '@/context/CryptoContext';
import { CurrencyType } from '@/types/types';

const useStyles = makeStyles(() => ({
	title: {
		flex: 1,
		color: 'gold',
		fontFamily: 'Montserrat',
		fontWeight: 'bold',
		cursor: 'pointer',
	},
}));

const Header = () => {
	const classes = useStyles();

	const { currency, changeCurrency } = useCryptoState();

	const onChangeCurrency = (curr: CurrencyType) => {
		changeCurrency(curr);
	};

	// const darkTheme = createTheme({
	// 	palette: {
	// 		primary: {
	// 			main: '#fff',
	// 		},
	// 		mode: 'dark',
	// 	},
	// });

	return (
		// <ThemeProvider theme={darkTheme}>
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
						sx={{
							width: 100,
							height: 40,
							marginRight: 15,
						}}
						value={currency}
						onChange={(e) => onChangeCurrency(e.target.value)}
					>
						<MenuItem value={'USD'}>USD</MenuItem>
						<MenuItem value={'IDR'}>IDR</MenuItem>
					</Select>
				</Toolbar>
			</Container>
		</AppBar>
		// </ThemeProvider>
	);
};

export default Header;
