import { createContext, useState } from "react";

export const LoginUserContext: any = createContext({});

export const LoginUserContextProvider: React.FC = (props) => {
  const [loginUser, setLoginUser] = useState({
    id: 0,
    username: "default-name",
    profileText: "default-value",
  });

  return (
    <LoginUserContext.Provider
      value={{
        loginUser,
        setLoginUser,
      }}
    >
      {props.children}
    </LoginUserContext.Provider>
  );
};

