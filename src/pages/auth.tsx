import { TextField, Button } from "@material-ui/core";
import { useState, useContext } from "react";
import Cookie from "universal-cookie";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
// import { UserContext, UserContextProvider } from '../contexts/UserContext';

const cookie = new Cookie();

const Auth: React.VFC = () => {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const passwordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/jwt/create/`, {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("non_fields_error");
        } else if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        const accessOptions = { path: "/", maxAge: 60 * 60 };
        const refreshOptions = { path: "/", maxAge: 60 * 60 * 24 * 7 };
        // const refreshOptions = { path: '/', expires: new Date(Date.now() + 1) };
        cookie.set("access_token", data.access, accessOptions);
        cookie.set("refresh_token", data.refresh, refreshOptions);
        console.log(cookie.getAll());
        router.push("/");
      });
  };

  const register = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/register/`, {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    login();
  };

  return (
    <>
      <Layout metaTitle='auth'>
        <div>
          <h1 className="text-4xl text-center my-4">ログイン・新規登録画面</h1>
          <Button
            variant="outlined"
            onClick={() => {
              setIsLogin(!isLogin);
            }}
          >
            changeMode
          </Button>
          <div className="m-10">
            <p>username</p>
            <TextField
              type="text"
              placeholder="username"
              variant="outlined"
              onChange={usernameChange}
            />
          </div>
          <div className="m-10">
            <p>password</p>
            <TextField
              type="password"
              placeholder="password"
              variant="outlined"
              onChange={passwordChange}
            />
          </div>

          <div>
            <Button onClick={isLogin ? login : register} variant="contained">
              {isLogin ? "login" : "register"}
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Auth;
