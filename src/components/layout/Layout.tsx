import React, { Fragment } from 'react';
import Footer from './Footer';
import Header from './Header';
import { createStyles, makeStyles } from '@mui/styles';

const Layout = ({ children }: { children: React.ReactNode }) => {
	// const useStyles = makeStyles(() =>
	// 	createStyles({
	// 		App: {
	// 			// backgroundColor: '#14161a',
	// 			color: 'white',
	// 			minHeight: '100vh',
	// 		},
	// 	})
	// );

	const useStyles = makeStyles(() => ({
		App: {
			// backgroundColor: '#14161a',
			color: 'white',
			minHeight: '100vh',
		},
	}));

	const classes = useStyles();

	return (
		<Fragment>
			<Header />
			<main className={classes.App}>{children}</main>
			<Footer />
		</Fragment>
	);
};

export default Layout;
