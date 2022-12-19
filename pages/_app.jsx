import { FlagshipProvider } from "@flagship.io/react-sdk";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const { initialVisitorData, flagsData } = pageProps;
  return (
    <FlagshipProvider
      envId={process.env.NEXT_PUBLIC_ENV_ID}
      apiKey={process.env.NEXT_PUBLIC_API_KEY}
      visitorData={initialVisitorData || {}}
      initialFlagsData={flagsData}
    >
      <Component {...pageProps} />
    </FlagshipProvider>
  );
}

export default MyApp;
