import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Head from "next/head";
import Button from "@material-ui/core/Button";
import Contacts from "./contacts";

const useStyles = makeStyles(theme => ({
  textContainer: {
    // width: '500px',
    marginLeft:'20px',
  },
  vehicleContainer: {
    backgroundColor:theme.palette.common.fon,
  },
  orderContainer: {
    backgroundColor:'white',
  },

  vehicle: {
    width: '400px',
    justifyContent:'center',
    margin:'0 0 0 4em',
    [theme.breakpoints.down('sm')]: {
      margin:'2em 0 0 0',
      width: '300px'
    },

  },
  vehicleImg: {
    width: '100%',
  },

  mainContainer: {
    // padding: '1em 0 0 0',
    backgroundColor:'#b8e0bc',
  },

  firstContainer: {
    padding:'12em 5em',
    backgroundColor: '#fafafa',
    backgroundImage: `url('/assets/first44.jpg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    // backgroundAttachment: 'fixed',//фикс картинка при прокрутке
    backgroundRepeat: 'no-repeat',

    width: '100%',
    [theme.breakpoints.down('md')]: {
      padding: '10em 2em'
    },
  },
  firstButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 35,
    width: 130,
    fontSize: '1.2rem',
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    },
  },

}))

export default function Index(props) {
  const classes = useStyles();
  const theme = useTheme();//теперь есть доступ к стрелке learnMore из этого комполнента
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));//вызываем библиотеку для адаптива
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));//вызываем библиотеку для адаптива

  return (
    <Grid container direction={'column'} className={classes.mainContainer}>
      <Head>
        <title key={'title'}>
          Эвакуатор в Ижевске | Towtruck18
        </title>
        <meta
          name={'description'}
          key={'description'}
          content={'Эвакуатор в Ижевске'}
        />
        <meta property={'og:title'} content={'Эвакуатор в Ижевске | Towtruck18'} key={'og:title'}/>{/*добавляем open graph превью для SEO. Подробности в www.ogp.me */}
        <meta property={'og:url'} content={'towTruck18.ru/'} key={'og:url'}/>{/*добавляем ссылку на страницу сайта */}
        <link rel={'canonical'} key={'canonical'} href={'towTruck18.ru/'}/>{/*дефолтный главный адрес страницы. Зависит от настроек DNS*/}
        {/*<script async src="https://www.googletagmanager.com/gtag/js?id=AW-415651018"></script>*/}
        {/*<script>*/}
        {/*  window.dataLayer = window.dataLayer || [];*/}
        {/*  function gtag(){dataLayer.push(arguments);}*/}
        {/*  gtag('js', new Date());*/}
        {/*  gtag('config', 'AW-415651018');*/}
        {/*</script>*/}
      </Head>
      {/*--------first Block--------*/}
      <Grid item container className={classes.firstContainer}>
        <Grid item>
          <Typography
            variant={'h1'}
            style={{color:'white', lineHeight:1.3, fontSize:matchesXS?'1.8rem':matchesSM? '2.1rem':null}}
          >
            Эвакуация авто в Ижевске (до 2.5т) <br/>
            <span style={{lineHeight:1.2, fontSize:matchesXS?'1.5rem':matchesSM? '1.6rem':'1.9rem'}}>по УР и РФ</span>
          </Typography>
        </Grid>
        <Grid item container style={{marginTop: '2em'}}>
          <Button
            variant={'contained'}
            className={classes.firstButton}
            component={'a'}
            href={'tel: 89048350675'}
          >
            Позвонить
            <img alt={'company logo'} src={'/assets/telephoneWhite.svg'} style={{width:15, height:15, marginLeft:10}} />
          </Button>
        </Grid>

      </Grid>

      {/*--------Vehicle Block--------*/}
      <Grid item className={classes.vehicleContainer}>
        <Grid container direction={'column'} alignItems={'center'} style={{padding:'4em 2em'}}>
          <Grid item>
            <Typography variant={'h2'} align={'center'} style={{fontSize:'2rem', marginBottom:'1.5em'}}>
              Цены:
            </Typography>
          </Grid>
          <Grid item>
            <Grid item container justify={'space-around'}>
              <Grid item className={classes.textContainer}>
                <Typography variant={'subtitle1'} style={{fontSize: matchesSM? '1rem':null}}>
                  Эвакуация мототехники, снегоходов <span style={{fontWeight: 700}}>1200 руб</span><br/>
                  Седаны <span style={{fontWeight: 700}}>1500 руб</span><br/>
                  Кроссоверы и минивены <span style={{fontWeight: 700}}>1800 руб</span><br/>
                  Джипы начиная с прадо <span style={{fontWeight: 700}}>2000 руб</span><br/>
                  Межгород <span style={{fontWeight: 700}}>от 50 руб/км</span><br/>
                </Typography>
              </Grid>
              <Grid item container className={classes.vehicle} alignItems={'center'}>
                <img alt={'my vehicle'} src={'/assets/7.jpg'} className={classes.vehicleImg}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.quoteContainer}>
        <Contacts/>
      </Grid>
    </Grid>
  );
}
