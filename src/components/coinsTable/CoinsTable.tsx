import React, { useState } from 'react';
import { Container, Typography, TextField, LinearProgress, Pagination } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import { makeStyles } from '@mui/styles';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { useCoinList } from '@/helpers/api-utils';
import { useCryptoState } from '@/context/CryptoContext';
import { ICoin } from '@/types/types';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { numberWithComas } from '@/components/banner/Carousel';

const CoinsTable = () => {
	const { currency, symbol } = useCryptoState();
	const [search, setSearch] = useState<string>('');
	const { data, isLoading, isFetching } = useCoinList(currency);
	const [page, setPage] = useState<number>(1);

	const router = useRouter();

	const searchHandler = () => {
		return data?.filter(
			(coin: ICoin) =>
				coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
		);
	};

	console.log(data);

	const useStyles = makeStyles(() => ({
		row: {
			backgroundColor: '#16171a',
			cursor: 'pointer',
			'&:hover': {
				backgroundColor: '#131111',
			},
			fontFamily: 'Montserrat',
		},
	}));

	const classes = useStyles();

	return (
		<Container>
			<Typography variant='h4' sx={{ margin: 18, fontFamily: 'Montserrat' }}>
				Cryptocurrency Prices by Market Cap
			</Typography>
			<TextField
				label='Search for a cryptocurrenct..'
				variant='outlined'
				sx={{ marginBottom: 10, width: '100%' }}
				onChange={(e) => setSearch(e.target.value)}
			/>

			<TableContainer>
				{isLoading ? (
					<LinearProgress sx={{ backgroundColor: 'gold' }} />
				) : (
					<Table>
						<TableHead sx={{ backgroundColor: '#EEBC1D' }}>
							<TableRow>
								{['Coin', 'Price', '24h Change', 'Market Cap'].map((head, idx) => (
									<TableCell
										key={idx}
										// align={head === 'Coin' && 'right'}
										sx={{
											color: 'black',
											fontWeight: '700',
											fontFamily: 'Montserrat',
										}}
									>
										{head}
									</TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody>
							{searchHandler()
								?.slice((page - 1) * 10, (page - 1) * 10 + 10)
								.map((row: ICoin) => {
									const profit = row.price_change_percentage_24h > 0;

									return (
										<TableRow
											key={row.name}
											onClick={() => router.push(`/coins/${row.id}`)}
											className={classes.row}
										>
											<TableCell component='th' scope='row' sx={{ display: 'flex', gap: 15 }}>
												<Image
													src={row?.image}
													alt={row.name}
													width={50}
													height={50}
													objectFit='contain'
												/>
												<div style={{ display: 'flex', flexDirection: 'column' }}>
													<span style={{ textTransform: 'uppercase', fontSize: 22 }}>
														{row.symbol}
													</span>
													<span style={{ color: 'darkgrey' }}>{row.name}</span>
												</div>
											</TableCell>

											<TableCell align='right'>
												{symbol}
												{''}
												{numberWithComas(row.current_price.toFixed(2))}%
											</TableCell>

											{/* <TableCell align='right' sx={{color: profit > 0 ? 'rgb(14,203,129' : 'red', fontWeight: 500}}> */}
											<TableCell align='right' sx={{ fontWeight: 500 }}>
												{profit && '+'}
												{''}
												{numberWithComas(row.price_change_percentage_24h.toFixed(2))}%
											</TableCell>

											<TableCell align='right'>
												{symbol}
												{''}
												{numberWithComas(row.market_cap.toString().slice(0, -6))}M
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				)}
			</TableContainer>

			<Pagination
				count={(searchHandler()?.length / 10).toFixed(0)}
				sx={{ padding: 20, width: '100%', display: 'flex', justifyContent: 'center' }}
				onChange={(_, value) => {
					setPage(value);
					window.scroll(0, 900);
				}}
			/>
		</Container>
	);
};

export default CoinsTable;
