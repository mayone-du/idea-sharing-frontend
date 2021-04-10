import { createContext, useEffect, useState } from "react";
import Cookie from "universal-cookie";
import { LoginUser } from "../types/types";

export const LoginUserContext: any = createContext({});

export const LoginUserContextProvider: React.FC = (props) => {
  const cookie = new Cookie();

  const accessToken = cookie.get("access_token");
  const refreshToken = cookie.get("refresh_token");

  const initialLoginUser: LoginUser = {
    id: 0,
    username: "default",
    profileText: "default",
  };

  const [loginUser, setLoginUser] = useState(initialLoginUser);

  const getMyProfile = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/my-profile/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${cookie.get("access_token")}`,
          },
        }
      );
      if (res.ok) {
        const [profile] = await res.json();
        setLoginUser(profile);
        return profile;
      } else if (res.status === 401) {
        alert("401 Unauthorized\n認証エラー");
        return;
      } else {
        alert("何らかのエラー");
        return;
      }
    } catch (err) {
      alert(err + "\n予期しないエラー");
    }
  };

  const accessTokenRefresh = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/jwt/refresh/`, {
      method: "POST",
      body: JSON.stringify({ refresh: `JWT ${cookie.get("refresh_token")}` }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("400 Bad Request\n");
        }
      })
      .then((data) => {
        const accessOptions = { path: "/", maxAge: 60 * 60 };
        cookie.set("access_token", data.access, accessOptions);
        getMyProfile();
      })
      .catch((error) => {
        alert(error + "refresh_tokenによるaccess_token取得エラー");
      });
  };

  useEffect(() => {
    if (accessToken && refreshToken) {
      getMyProfile();
    } else if (!accessToken && refreshToken) {
      accessTokenRefresh();
      console.log("refresh only");
    } else {
      console.log("getMyProfile error");
    }
  }, []);

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
