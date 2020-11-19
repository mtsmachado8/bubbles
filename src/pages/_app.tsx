import '../assets/styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Head> 
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </Head>
      <Component {...pageProps} />
    </div>
  );
};

export default App;
