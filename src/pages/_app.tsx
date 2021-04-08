import { LoginUserContextProvider } from "../contexts/LoginUserContext";
import "../styles/globalResets.css";
import "../styles/globals.css";

const App: React.FC<{ Component: any; pageProps: any }> = ({
  Component,
  pageProps,
}) => {

  return (
    <LoginUserContextProvider>
      <Component
        {...pageProps}
      />
    </LoginUserContextProvider>
  );
};

export default App;
