import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import "./../styles/font.scss";
import "./../styles/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// for next-i18
import { appWithTranslation } from "next-i18next";

// for stripe payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useDispatch, useSelector } from "react-redux";
import { setStore, resetStore } from "@/redux/actions";

import { wrapper } from "@/redux/store";
import axios from "axios";

const stripePromise: any = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_KEY ? process.env.NEXT_PUBLIC_STRIPE_KEY : ""
);

const MyApp = ({ Component, pageProps }: any) => {
  const router = useRouter();
  const currentPath: any =
    typeof window !== "undefined" && window.location.href;

  const [auth, setAuth] = useState(false);

  const dispatch = useDispatch();
  const userStore = useSelector((state: any) => state.userStore);

  const path = (/#!(\/.*)$/.exec(router.asPath) || [])[1];
  if (path) {
    router.replace(path);
  }

  const getRoleName = (role: string) => {
    switch (role) {
      case "ROLE_USER":
        return "User";
      case "ROLE_ADMIN":
        return "Admin";
      default:
        return "";
    }
  };

  useEffect(() => {}, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Head>
        <title>Traffic Junky</title>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon.png"
        />
      </Head>
      <Elements stripe={stripePromise}>
        <Component {...pageProps} />
      </Elements>
      <ToastContainer />
    </div>
  );
};

export default wrapper.withRedux(appWithTranslation(MyApp));
