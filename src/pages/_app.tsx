import { useState } from "react";
import { LoginUserContextProvider } from "../contexts/LoginUserContext";
import Cookie from "universal-cookie";
import "../styles/globalResets.css";
import "../styles/globals.css";

const App: React.FC<{ Component: any; pageProps: any }> = ({
  Component,
  pageProps,
}) => {
  const cookie = new Cookie();

  const accessToken = cookie.get("access_token");
  const refreshToken = cookie.get("refresh_token");

  if (accessToken) {
    console.log(accessToken);
  } else {
    console.log("accessToken is none");
  }

  // const [loginUser, setLoginUser] = useState({
  //   id: 0,
  //   username: "default",
  //   profileText: "default-value",
  // });

  return (
    <LoginUserContextProvider>
      <Component
        {...pageProps}
        // loginUser={loginUser}
        // setLoginUser={setLoginUser}
      />
    </LoginUserContextProvider>
  );
};

export default App;
