import "bootstrap/dist/css/bootstrap.min.css";
// import '../styles/globals.css'
import { buildClient } from "../api/build-client";
import Header from "../components/header";

export const appComponent = async ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

appComponent.getInitialProps = async (appContext) => {
  const { Component, ctx } = appContext;
  const axiosClient = buildClient(ctx);
  const { data } = await axiosClient.get("/api/users/currentuser");
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, ...data };
};

export default MyApp;
