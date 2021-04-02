import '../styles/globalResets.css';
import '../styles/globals.css';

const App: React.FC<{ Component: any, pageProps: any }> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default App;
