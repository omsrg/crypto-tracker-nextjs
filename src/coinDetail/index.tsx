import React, { useState } from 'react';
import { ICoin } from '@/types/types';
import { useCryptoState } from '@/context/CryptoContext';
import { fetchHistoricData } from '@/helpers/api-utils';
import { useQuery } from 'react-query';
import { makeStyles, createStyles } from '@mui/styles';
import { CircularProgress, Theme } from '@mui/material';
import { Line } from 'react-chartjs-2';
import SelectButton from '@/components/SelectButton';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CoinDetail = ({ coin }: { coin: ICoin }) => {
	const [days, setDays] = useState<number>(1);

	const { currency } = useCryptoState();

	const { data, isLoading, isFetching } = useQuery(['historicData', currency, days], () =>
		fetchHistoricData(coin.id, days, currency)
	);

	const useStyles = makeStyles((theme: Theme) => ({
		// createStyles({
		container: {
			width: '75%',
			display: 'flex',
			flexDirection: 'column',
			alingItems: 'center',
			justfyContent: 'center',
			marginTop: 25,
			padding: 40,
			[theme.breakpoints.down('md')]: {
				width: '100%',
				marginTop: 0,
				padding: 20,
				paddingTop: 0,
			},
		},
		// }),
	}));
	const classes = useStyles();

	return (
		<div className={classes.container}>
			{!data || isLoading ? (
				<CircularProgress sx={{ color: 'gold' }} size={250} thickness={1} />
			) : (
				<>
					<Line
						data={{
							labels: data.prices.map((coin: Array<number>) => {
								let date = new Date(coin[0]);
								let time =
									date.getHours() > 12
										? `${date.getHours() - 12}:${date.getMinutes()}PM`
										: `${date.getHours()}:${date.getMinutes()}AM`;

								return days === 1 ? time : date.toLocaleDateString();
							}),
							datasets: [
								{
									data: data.prices.map((coin: Array<number>) => coin[1]),
									label: `Price (Past ${days} Days ) in ${currency}`,
									borderColor: '#eebc1d',
								},
							],
						}}
						options={{
							elements: {
								point: {
									radius: 1,
								},
							},
						}}
					/>

					<div
						style={{
							display: 'flex',
							marginTop: 20,
							justifyContent: 'space-around',
							width: '100%',
						}}
					>
						{chartDays.map((day, idx) => (
							<SelectButton
								key={idx}
								onClick={() => setDays(day.value)}
								selected={day.value === days}
							>
								{day.label}
							</SelectButton>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default CoinDetail;

const chartDays = [
	{
		label: '24 Hours',
		value: 1,
	},
	{
		label: '30 Days',
		value: 30,
	},
	{
		label: '3 Months',
		value: 90,
	},
	{
		label: '1 Year',
		value: 365,
	},
];
