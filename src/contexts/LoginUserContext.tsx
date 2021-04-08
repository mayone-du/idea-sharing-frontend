import { createContext, useState } from "react";
import Cookie from 'universal-cookie';
import { getMyProfile } from "../lib/getMyProfile";
import { LoginUser } from "../types/types";

export const LoginUserContext: any = createContext({});

export const LoginUserContextProvider: React.FC = (props) => {
  const cookie = new Cookie();
  console.log(cookie.getAll());

  const accessToken = cookie.get('access_token');
  const refreshToken = cookie.get('refresh_token');


  const initialStateValue: LoginUser = {
    id: 0,
    username: 'default',
    profileText: 'default',
  }
  
  const [loginUser, setLoginUser] = useState(initialStateValue);


  getMyProfile(setLoginUser, cookie);



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

