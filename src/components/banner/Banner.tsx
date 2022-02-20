import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Typography } from '@mui/material';
import Carousel from './Carousel';

const useStyles = makeStyles(() => ({
	banner: {
		backgroundImage: 'url(./banner2.jpg)',
	},
	content: {
		height: 400,
		display: 'flex',
		flexDirection: 'column',
		paddingTop: 25,
		justifyContent: 'space-around',
	},
	tagline: {
		display: 'flex',
		height: '40%',
		flexDirection: 'column',
		justifyContent: 'center',
		textAlign: 'center',
	},
}));

const Banner = () => {
	const classes = useStyles();

	return (
		<div className={classes.banner}>
			<Container className={classes.content}>
				<div className={classes.tagline}>
					<Typography
						variant='h2'
						sx={{
							fontWeight: 'bold',
							marginBottom: 15,
							fontFamily: 'Montserrat',
						}}
					>
						Crypto Hunter
					</Typography>
					<Typography
						variant='subtitle2'
						sx={{
							color: 'darkgrey',
							textTransform: 'capitalize',
							fontFamily: 'Montserrat',
						}}
					>
						Get all the info regarding your favorite crypto currency
					</Typography>
				</div>
				<Carousel />
			</Container>
		</div>
	);
};

export default Banner;
