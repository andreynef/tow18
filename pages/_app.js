import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/ui/theme';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/styles";
import Footer from "../src/ui/Footer";
import Header from "../src/ui/Header";
import Fonts from '../src/ui/Fonts';

const useStyles = makeStyles(theme =>({
  appContainer: {
    backgroundColor: `#fafafa`,
    maxWidth:1240,
    margin:'0 auto',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)'
  },
}));

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);///установка стейта для активного подменю. Вынесли вверх для доступа оного к футеру.
  const [value, setValue] = useState(0);//установка состояния value. Вынесли вверх для доступа оного к футеру.

  React.useEffect(() => {
    Fonts();
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>{/*добавить head к кажд page для seo*/}
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Grid container className={classes.appContainer}>
          <Header
            value={value}
            setValue={setValue}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
          <Component
            {...pageProps}
          />
          <Footer/>
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
