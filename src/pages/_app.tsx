import '../assets/styles/globals.css';
import { AppProps } from 'next/app';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
