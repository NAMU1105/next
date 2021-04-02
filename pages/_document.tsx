import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />), //sheets.collectStyles collects all of the styles from the app’s components.
        });
      const initialProps = await Document.getInitialProps(ctx);
      //   console.log(initialProps);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {/* sheets.getElement() generates the style tag and you need to return it as props called styles */}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } catch (error) {
      console.log(error);
    } finally {
      sheet.seal();
    }
  }

  //   static async getInitialProps(ctx: DocumentContext) {
  //     const initialProps = await Document.getInitialProps(ctx);
  //     return initialProps;
  //   }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
