import '../assets/styles/globals.css';
import Head from 'next/head';
import { AppProps } from 'next/app';

import { toast } from 'react-toastify';
import { Provider as AuthProvider } from '../infra/contexts/AuthContext';

import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Bubbles</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content=" Work together on your company's biggest problems."/>
    </Head>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </>
);

export default App;
