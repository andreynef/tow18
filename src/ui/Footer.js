import React from 'react';
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";


const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.common.fon,
    padding: '20px 0',
    width: '100%',
    // zIndex: 1302,//как и в header'e чтоб футер был над меню дровера
    // position: 'relative',
  },

}));

export default function Footer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));//вызываем библиотеку для адаптива

  return (
    <footer className={classes.footer}>
      <Grid container justify={'center'} >
        <Grid item>
          <Typography variant={'body1'} align={'center'} style={{color: theme.palette.common.blue, fontSize: '1rem'}}>
            <a href={'tel: 89048350675'} style={{textDecoration: 'none', color:'black'}}>8(904)835-0675</a>
          </Typography>
          <Typography align={'center'} style={{color: 'black', fontSize: matchesXS?'0.7rem':'0.8rem'}}>
            НДП Сивков И.О.
          </Typography>
        </Grid>
      </Grid>
    </footer>
  )
}