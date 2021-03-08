import React, {useState, useEffect} from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import {useScrollTrigger} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
// import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "./Link";


function ElevationScroll(props) {
  const {children} = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles(theme => ({
  toolbarMargin: {//добавляем доп ключ к стилям
    ...theme.mixins.toolbar,//скопировано из default theme из библиотеки
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1em'
    },

  },
  logo: {
    // height: '6em',
    width: '100%',
  },
  logoContainer: {
    padding:0,//убрать у обетки кнопки отступы
    // padding: '2em 2em 2em 4em',
    width: '250px',
    '&:hover': {//аналогия с sсss со вложенностью селектора. Убрать затемненность при наведении на лого.
      backgroundColor: 'transparent'
    },
    [theme.breakpoints.down('md')]: {//mediaquery для среднего размера экрана
      width: '200px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '120px',
      // padding: '1em 1em 1em 2em',
    },
  },
  // firstContainer: {
  //   padding:'12em 5em',
  //   backgroundImage: `url(${background})`,
  //   backgroundPosition: 'center',
  //   backgroundSize: 'cover',
  //   // backgroundAttachment: 'fixed',//фикс картинка при прокрутке
  //   backgroundRepeat: 'no-repeat',
  //   // height: '60em',
  //   width: '100%',
  //   [theme.breakpoints.down('md')]: {
  //   },
  // },
  tabContainer: {
    // margin: '0 0 0 auto',
    // border: '1px solid red',
  },
  headContainerOne: {
    padding:"2em 2em 2em 2em",
    backgroundColor: theme.palette.common.fon,
    // backgroundImage: `url(${head})`,
    // backgroundPosition: 'center',
    // backgroundSize: 'cover',
    // // backgroundAttachment: 'fixed',//фикс картинка при прокрутке
    // backgroundRepeat: 'no-repeat',
    // height: '60em',
    // width: '100%',

    [theme.breakpoints.down('xs')]: {
      padding: '1em 1em 0 1em',
    },
  },
  tab: {
    ...theme.typography.tab,//остальное засунул в глобал и здесь экстенжу
    minWidth: 10,
    margin: '0 0 0 25px',
    color: 'black'
  },
  quote: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    minWidth: 10,
    // margin: '0 25px 0 50px',
    margin: '0 0 0 25px',
    height: 25,
    width: 140,
    color: 'white',
    backgroundColor: "#008000",
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    }
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'blue',
    borderRadius: 0,
  },
  menuItem: {
    ...theme.typography.tab,//вставляем весь завод и...
    opacity: 0.7,//доп перезапись прозрачности
    '&:hover': {//доп перезапись прозрачности выделенного итема
      opacity: 1
    },
  },
  drawerIconContainer: {
    margin: '0 0 0 auto',
    color:  theme.palette.common.blue,
    '&:hover': {
      // backgroundColor: 'transparent'//убрать кружок
    }
  },
  drawerIcon: {
    height: '50px',
    width: '50px',
  },
  drawer: {
    backgroundColor: theme.palette.common.fon,

  },
  drawerItem: {
    ...theme.typography.tab,//делаем стили дровера схожими на табные
    color: 'black',
    opacity: 0.7,
  },
  drawerItemQuote: {
    ...theme.typography.tab,//делаем стили дровера схожими на табные
    color: 'white',
    opacity: 0.7,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {//все текстовые элементы внутри drawerItemSelected
      opacity: 1,
    }
  },
  appBar: {
    zIndex: theme.zIndex.modal,//шапка хеадера будет находиться чуть выше всплывающего меню, ибо меню нельзя сделать частью экрана а только на всю высоту, поэтому решаем только перекрытием и отступом.
    backgroundColor: theme.palette.common.fon,
    // paddingBottom:'1em',
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 0,
    },
  },
  socialIconImg: {
    width: '30px',
    height: '30px',
  }
}));

//Если нужно застилизовать не весь App с темами итд а только один этот компонент то создаем здесь свои стили в JS формате через тот же makeStyles.
// const useStyles2 = makeStyles({
//   myButton: {
//     border: '1px solid red',
//     width: 550,
//     background: 'linear-gradient(45deg, #f3f3f3 30%, #999999 90%)',
//   },
// })

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();//вызываем библиотеку для адаптива
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);//для адаптива for drawer из настроек материала
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));//вызываем библиотеку для адаптива
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));//вызываем библиотеку для адаптива

  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);//установка состояния для меню, якорь на страницы
  const [openMenu, setOpenMenu] = useState(false);//установка состояния для меню, открыто или закрыто

  const handleChange = (e, newValue) => {
    props.setValue(newValue)
  }


  const handleClose = (e) => {/*при закрытии меню, сбрасываем значения обратно на начальные состояния */
    setAnchorEl(null);
    setOpenMenu(false);
  }

  const routes = [//общие аргументы для меню и табов вынесенные в отдельную переменную и используемые в мапинге или др операций с массивами
    {name: 'Главная', link: '/', activeIndex: 0},
    {name: 'Фото', link: '/photos', activeIndex: 1},
    {name: 'Контакты', link: '/contacts', activeIndex: 2},
  ]


//исправление несовпадаемости открытой страницы и закладки при перезагрузке.
  useEffect(() => {
    [...routes].forEach(route => {//перебор многих условий и установки нужных стейтов. route это условный url. Условия корректного отображения вкладок и открытых страниц url. Если расходятся, то установить стейт чтобы сошлость.
      switch (window.location.pathname) {//есть url открытой страницы прямо сейчас. (Обьяснение есть в refactoredDrafts)
        case `${route.link}`://если этот url равен link'у из перебираемого массива...
          if (props.value !== route.activeIndex) {//...и если нынешнее value не равно значению в перебираемом элементе массива (activeIndex). = открытая страница нахся не на той же активной закладке то ...
            props.setValue(route.activeIndex)//...установить ту вкладку на активную...
            if (route.selectedIndex && route.selectedIndex !== props.selectedIndex) {//...доп проверка. Если в перебираемом элементе массива существует selectedIndex и он не равен данному, то индекс переписать на индекс кейса
              props.setSelectedIndex(route.selectedIndex)
            }
          }
          break;
        default:
          break;
      }
    })
  }, [props.value, props.selectedIndex, routes, props]);//слежка за значениями.

  const tabs = (
    <>
      <Tabs
        value={props.value}
        onChange={handleChange}
        className={classes.tabContainer}
        // indicatorColor={'primary'}
        TabIndicatorProps={{style: {backgroundColor: 'transparent'}}}
      >
        {routes.map((route, index) => (//мапим несколько табов по шаблону беря данные из массива routes
          <Tab
            key={`${route}${index}`}
            component={Link}
            href={route.link}
            label={route.name}
            className={route.link==='/quote' ? classes.quote : classes.tab}//route.link==='/services'? classes.grey: route.link==='/photos'? classes.grey :
            aria-owns={route.ariaOwns}//если нет то просто будет пусто. В итоге только для сервиса.
            aria-haspopup={route.ariaHasPopup}//если нет то просто будет пусто. В итоге только для сервиса.
            onMouseOver={route.mouseOver}//если нет то просто будет пусто. В итоге только для сервиса.
          />
        ))}
      </Tabs>

      <Menu //прописывается не важно где ибо отображается в зависимости от анкора
        id={'simple-menu'}//для кнопки которая запускает это всплывающее меню
        anchorEl={anchorEl}//зацеп на элемент
        open={openMenu}
        onClose={handleClose}//при нажатии - убрать с экрана
        MenuListProps={{onMouseLeave: handleClose}}//при увода мышки с элемента - убрать с экрана. Если просто на элементах списка onMouseOver={e=>handleClose(e)} то не сработает ибо это список.
        classes={{paper: classes.menu}}//не className={classes.menu} а это, ибо все что связано с меню должно сначала быть изменено с заводской стороны - https://material-ui.com/api/menu/
        elevation={0}//сброс завода парящего блока с тенью.
        keepMounted//завод для SEO
        style={{zIndex: 1302}}//б выче чем AppBar
      >

      </Menu>
    </>
  )

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer //обертка для адаптивного выплывающего меню. Скопировано с материала
        disableBackdropTransition={!iOS}//optimize mobile performance
        disableDiscovery={iOS}
        open={openDrawer}//открыт ли он
        onClose={() => setOpenDrawer(false)}//закрывать при срабатывании
        onOpen={() => setOpenDrawer(true)}//открывать при срабатывании
        classes={{paper: classes.drawer}}///добавим свой стиль в завод
      >
        <div className={classes.toolbarMargin}></div>
        {/*подобие брейка-отступа. Кладется в тело дровера прокладка высотой как тот готовый маргин для стики хеадера.*/}
        <List disablePadding>{/*убрать дефолт падингт путем готового завода*/}
          {routes.map(route => (//мапим несколько итемов по шаблону беря данные из массива routes
            <ListItem
              key={`${route}${route.activeIndex}`}
              divider
              button
              // disabled={(route.link==='/services') || (route.link==='/photos')? true:false}
              component={Link}
              href={route.link}
              onClick={() => {
                setOpenDrawer(false);
                props.setValue(route.activeIndex)
              }}
              selected={props.value === route.activeIndex}//проп завода
              classes={route.link==='/quote' ? {root: classes.drawerItemEstimate, selected: classes.drawerItemSelected}:{selected: classes.drawerItemSelected}}//есть в Mui атрибут selected кот take this logic behind the scene.
            >
              <ListItemText
                className={route.link==='/quote' ? classes.drawerItemQuote : classes.drawerItem}
                disableTypography
              >
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}//на клике на кнопку менять состояние
        disableRipple//убрать тень
        className={classes.drawerIconContainer}//уберем кружок
      >
        <MenuIcon
          className={classes.drawerIcon}
        />
      </IconButton>
    </React.Fragment>
  )

  return (
    <>
      {/*1 box*/}
        <Grid container direction={'row'} justify={'space-between'} className={classes.headContainerOne}>
          <Grid item  >
            <Button component={Link} href={'/'}  className={classes.logoContainer} onClick={() => {
              props.setValue(0)
            }} disableRipple>{/*обернуть лого в кнопку с онкликом установки value на домашнюю страницу*/}
              <img alt={'company logo'} src={'/assets/owl.png'} className={classes.logo}/>
            </Button>
          </Grid>
          <Hidden smDown>
            <Grid item style={{width:'35%', paddingTop: '1em'}}>
              <img src={'/assets/logo2.png'} alt={'truck b&w'} style={{width:'100%'}}/>
            </Grid>
          </Hidden>
          {/*tel+working block*/}
          <Grid item container justify={'flex-end'} style={{width:matchesXS?'45%':'270px'}} >
            <Grid item container justify={'flex-end'}>
              <Grid item style={{marginRight:10, marginTop:matchesXS?1:5}}>
                <img src={'/assets/telephone.svg'} alt={'phone'} style={{width:matchesXS?12:15}}/>
              </Grid>
              <Grid item >
                <Typography variant={'body1'} style={{fontSize: matchesXS? '0.8rem':'1.1rem'}}>
                  <a href={'tel: 89048350675'} style={{textDecoration: 'none', color:'black'}}>tel: 8(904)835-0675</a>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
  {/*  tel work end  */}
        </Grid>
    {/* 2 box*/}
      <ElevationScroll>{/*обертка шапки хеадера с логикой фикс положения при скролле*/}
        <AppBar position={"sticky"} color={"primary"} className={classes.appBar}>{/*шапка*/}
          <Toolbar disableGutters>{/*тож шапка*/}
              <Grid item container justify={'center'} >
                <Hidden smDown>{/*при уменьшении экрана рендерить разные меню*/}
                  {tabs}
                </Hidden>
                <Hidden mdUp>
                  {drawer}
                </Hidden>
              </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/*<div className={classes.toolbarMargin}/>/!*добавлен этот элемент со своим стилем дабы исправить дефолтное перекрывание последующего текста. Он создает прослойку под AppBar выталкивая последующий текст в пределы видимости.*!/*/
      }
      {/*<Button className={classes2.myButton}>button</Button>*/
      }
    </>

)
}



