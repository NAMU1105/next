import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";

import "../styles/globals.css";
import Layout from "../components/layout/layout";

// context
import { AuthContext } from "../context/auth-context";
import { LayoutContext } from "../context/layout-context";

// custom hooks
import { useAuth } from "../utils/hooks/auth-hooks";
import { useLayout } from "../utils/hooks/layout-hooks";

function MyApp({ Component, pageProps, apollo }) {
  const apolloClient = useApollo(pageProps);
  const { userId, token, login, logout } = useAuth();
  const {
    BGCOLOR_VARIANT_MAPS,
    COLOR_VARIANT_MAPS,
    layoutColor,
    changeLayoutColorHandler,
    isNavOpen,
    ToggleNavHandler,
    SetToggleStateNavHandler,
  } = useLayout();

  return (
    <ApolloProvider client={apolloClient}>
      <AuthContext.Provider
        value={{
          userId,
          token,
          login,
          logout,
        }}
      >
        <LayoutContext.Provider
          value={{
            BGCOLOR_VARIANT_MAPS,
            COLOR_VARIANT_MAPS,
            layoutColor,
            changeLayoutColorHandler,
            isNavOpen,
            ToggleNavHandler,
            SetToggleStateNavHandler,
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LayoutContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
