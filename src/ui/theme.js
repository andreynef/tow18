import { createMuiTheme } from '@material-ui/core/styles';

//some my custom variables

const arcBlue = '#696969';
const arcOrange = '#008000';
const arcGrey = '#868686';
const fon = '#E9F4FE';

const theme = createMuiTheme({
//  my options here. Default theme can be seen there : -> https://material-ui.com/customization/default-theme/#default-theme
  palette: {
    common: {
      blue: arcBlue,
      orange: arcOrange,
      fon:fon
    },
    primary :{// хз но генерируются black and light versions тобишь есть primary.dark and primary.light
      main: arcBlue,
    },
    secondary: {// хз но генерируются black and light versions тобишь есть secondary.dark and secondary.light
      main: arcOrange,
    }
  },
  typography: {
    tab: {
      fontFamily: "Raleway",//установили в html файле link итд
      textTransform:'none', //отключить toUpperCase
      fontWeight: 700,
      fontSize: '1rem',//если в пикселях то при разном экране размер шрифтов по недосмотру может не сменяться, а так рем связан с глобальным размером что установлено на 14пх.
    },
    estimate: {
      fontFamily: 'Caveat',
      textTransform: 'none',
      color: 'white',
      fontSize: '1.4rem',
      fontWeight: 500,
    },
    h1: {
      fontFamily: 'Galdeano',
      fontWeight: 700,
      fontSize: '2.5rem',
      color: arcBlue,
      lineHeight: 1.5
    },
    h3: {
      fontFamily: 'Pacifico',
      fontSize: '2.5rem',
      color: arcBlue,
    },
    h4: {
      fontFamily: 'Raleway',
      fontWeight: 700,
      fontSize: '1.75rem',
      color: arcBlue,
    },
    h6: {
      fontFamily: 'Raleway',
      fontWeight: 500,
      color: arcBlue,
      lineHeight: 1
    },
    subtitle1: {
      fontFamily: 'Galdeano',
      fontWeight: 700,
      fontSize: '1.25rem',
      color: arcGrey,
    },
    subtitle2: {
      fontWeight: 300,
      fontSize: '1.25rem',
      color: 'white',
    },
    body1: {
      fontWeight: 300,
      fontSize: '1.25rem',
      // color: arcGrey,
    },
    learnButton: {
      borderColor: arcBlue,
      color: arcBlue,
      borderWidth: 2,
      textTransform: 'none',
      borderRadius: 50,
      fontFamily: 'Roboto',
      fontWeight:'bold',
    }
  },
  overrides: {
    MuiInputLabel: {//спец css для инпутов
      root: {//изменяем дефолт
        color: arcBlue,
        fontSize: '1rem'
      }
    },
    MuiInput: {//спец css для инпутов
      root: {//цвет текста
        color: arcGrey,
        fontWeight: 300,
      },
      underline: {
        '&:before': {
          borderBottom: `2px solid ${arcBlue}`//поменять цвет палки
        },
        '&:hover:not($disabled):not($focused):not($error):before': {//поменять цвет палки при ховере но оставить для других состояний
          borderBottom: `2px solid ${arcBlue}`
        }
      }
    }
  }
});

export default theme;

