import { AppContextProvider } from "../context/AppContext";
import { ThemeProvider } from "next-themes";
import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default MyApp;
