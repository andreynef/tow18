import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../src/ui/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>{/*добавить head к кажд pages для seo*/}
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta property={'og:type'} content={'website'}/>{/*добавляем open graph превью для SEO. Подробности в www.ogp.me */}
          <meta property={'og:image'} content={'https://yandex.ru/images/search?text=%D1%8D%D0%B2%D0%B0%D0%BA%D1%83%D0%BA%D0%B0%D1%82%D0%BE%D1%80&from=tabbar&pos=17&img_url=https%3A%2F%2Fxn--23-6kcai3c3aqqi0i.xn--p1ai%2Fwp-content%2Fuploads%2F2018%2F03%2FIMG_20180713_134251.jpg&rpt=simage'}/>{/*добавляем open graph превью для SEO */}
          <meta property={'og:image:type'} content={'image/png'}/>{/*добавляем open graph превью для SEO */}
          <meta property={'og:image:width'} content={'1200'}/>{/*рекоменд ширина картинки */}
          <meta property={'og:image:height'} content={'630'}/>{/*рекоменд высота картинки */}
          <meta property={'og:image:alt'} content={'company logo'}/>{/*alt*/}
          <link rel="icon" href="/favicon.png" />{/*добавляем картинку фавикон*/}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Caveat|Raleway:100,400,400i,700|Roboto:300,400,500,700&display=swap"
          />{/*добавляем нужные шрифты*/}
        </Head>
        <body style={{margin:0}}>{/*сброс дефолт полей*/}
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};
