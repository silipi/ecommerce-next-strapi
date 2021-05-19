import { AuthProvider } from "../context/AuthContext";
import PreviewCart from "../components/PreviewCart";
import { AppProvider } from "../context/AppContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Header from "../components/Header";
import NProgress from "nprogress";
import Router from "next/router";
import "../styles/nprogress.css";
import "../styles/globals.css";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppProvider>
        <Elements stripe={stripePromise}>
          <Header />
          <PreviewCart />
          <Component {...pageProps} />
        </Elements>
      </AppProvider>
    </AuthProvider>
  );
}

export default MyApp;
