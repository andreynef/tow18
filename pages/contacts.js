import React, {useState} from 'react';
import axios from "axios";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";


const useStyles = makeStyles(theme => ({
  message: {
    // border: `2px solid ${theme.palette.common.blue}`,
    marginTop: '2em',
    // borderRadius: '5',
  },
  contactContainer:{
    padding: '40px 0',
    backgroundColor: '#fafafa',
    backgroundImage: `url('/assets/9l.jpg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    // backgroundAttachment: 'fixed',//фикс картинка при прокрутке
    backgroundRepeat: 'no-repeat',
    width: '100%',

  },
  contactCard: {
    boxShadow: theme.shadows[10],
    borderRadius: 15,
    // padding: '10em',
    width: '400px',
    [theme.breakpoints.down('xs')]: {
      // padding: '8em 0',
      // borderRadius: 0,
      width: '100%',
    },
  },
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 45,
    width: 245,
    fontSize: '1.3rem',
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    },
    [theme.breakpoints.down('sm')]: {
      height: 40,
      width: 225,
    },

  }
}))

export default function Contacts(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));//вызываем библиотеку для адаптива
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));//вызываем библиотеку для адаптива
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));//вызываем библиотеку для адаптива

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [emailHelper, setEmailHelper] = useState('');//ручная установка подсказки а не дефолт инпутовская

  const [phone, setPhone] = useState('');
  const [phoneHelper, setPhoneHelper] = useState('');

  const [message, setMessage] = useState('');

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({open: false, message: '', backgroundColor: ''})

  const onChange = e => {
    setPhone(e.target.value);
  };
  const onConfirm = () => {//нажатие на кнопку 'отправить'
    setLoading(true);//включаем индикатор загрузки
    axios.get('https://us-central1-towtruck-4bdac.cloudfunctions.net/sendMailFromTow', //запрос на URL
      {
        params: {//подробности дополняющие URL (query strings)
          phone: phone,
          message: message,
        }
      }
    )
      .then(res => {//выполнится когда поступит ответ
        setLoading(false);//выключаем индикатор загрузки
        setOpen(false);//закрыть диалоговое окно
        setPhone('');//сброс полей
        setMessage('');//сброс полей
        setAlert({open: true, message: 'Сообщение отправлено', backgroundColor: '#4bb543'})//показываем подтв окно
        console.log(res)
      })
      .catch(err => {//выдаст если вернулась ошибка
        setLoading(false);
        setAlert({open: true, message: 'Ошибка! Попробуйте позднее.', backgroundColor: '#ff3232'})//показываем подтв окно c ошибкой
        console.log(err)
      })
  };

  const buttonContents = (
    <>
      Отправить
      <img src={'/assets/send.svg'} alt={'paper plane'} style={{marginLeft: '1em'}}/>
    </>
  )

  return (
    <>
    <Grid container className={classes.contactContainer} alignItems={'center'} justify={'center'}>

      <Card className={classes.contactCard}>
        <CardContent>
          <Grid container justify={'center'} style={{padding: '2em 0'}}>
            <Grid item container direction={'column'} alignItems={'center'}>
              <Typography variant={'h1'} style={{lineHeight: 1, color: '#696969'}}
                          align={matchesMD ? 'center' : undefined}>
                Напишите нам
              </Typography>
              <Typography variant={'body1'} style={{lineHeight: 1, color: '#696969', marginTop:'0.5em'}}
                          align={matchesMD ? 'center' : undefined}>
                и мы вам перезвоним
              </Typography>
              <Grid item container direction={'column'} style={{marginTop: '2em', marginBottom: '2em', width: '20em'}}>
                {/*<Grid item container justify={'center'}>*/}
                {/*  /!*<Grid item>*!/*/}
                {/*  /!*  <img src={phoneIcon} alt={'phone'} style={{marginRight: '0.5em', verticalAlign: 'bottom'}}/>*!/*/}
                {/*  /!*</Grid>*!/*/}
                {/*  <Grid item>*/}
                {/*    <Typography variant={'body1'} style={{color: theme.palette.common.blue, fontSize: '1rem'}}>*/}
                {/*      <a href={'tel: 89048350675'}*/}
                {/*         style={{textDecoration: 'none', color: '#696969'}}>тел: 8(904)835-0675</a>*/}
                {/*    </Typography>*/}
                {/*  </Grid>*/}
                {/*</Grid>*/}
                <Grid item container justify={'center'}>
                  <Grid item style={{marginRight: 10, marginTop:5}}>
                    <img src={'/assets/telephone.svg'} alt={'phone'} style={{width:15}}/>
                  </Grid>
                  <Grid item>
                    <Typography variant={'body1'} style={{fontSize: '1.1rem'}}>
                      <a href={'tel: 89048350675'} style={{textDecoration: 'none', color:'black'}}>tel: 8(904)835-0675</a>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container direction={'column'} style={{width: '20em'}}>
                <Grid item style={{marginBottom: '0.5em'}}>
                  <TextField
                    label={'Ваш телефон*'}
                    id={'phone'}
                    value={phone}
                    onChange={onChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid item style={{width: '20em'}}>
                <TextField
                  id={'message'}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  multiline
                  rows={6}
                  className={classes.message}
                  variant="outlined"
                  // inputProps={{disableUnderline:true}}//убрать палку через спец инпутовский метод
                  fullWidth
                  placeholder={'Сообщение*'}

                />
              </Grid>
              <Grid item container justify={'center'} style={{marginTop: '2em'}}>
                <Button
                  variant={'contained'}
                  className={classes.sendButton}
                  disabled={//кнопка не рабочая если true эти условия
                    phone.length === 0 ||
                    message.length === 0 ||
                    phoneHelper.length !== 0
                  }
                  onClick={onConfirm}//для диалога
                >
                  {loading ? <CircularProgress
                    size={30}/> : buttonContents}{/*показывать кнопку или индикатор загрузки во время работы axios*/}
                </Button>
              </Grid>
              <Snackbar//всплывающее окно подтверждения
                open={alert.open}
                message={alert.message}
                ContentProps={{style: {backgroundColor: alert.backgroundColor}}}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                onClose={() => setAlert({...alert, open: false})}
                autoHideDuration={4000}
              />
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </Grid>
      </>
  )
}
