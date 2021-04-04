import { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Cookie from "universal-cookie";
import { useRouter } from "next/router";

const cookie = new Cookie();

const AuthForm: React.VFC<{ isLogin: boolean }> = ({ isLogin }) => {
  const router = useRouter();


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
        cookie.set("access_token", data.access, accessOptions);
        cookie.set("refresh_token", data.refresh, refreshOptions);
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
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          if (isLogin) {
            login();
          } else {
            register();
          }
        }}
      >
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

        <div className="m-4">
          <Button type="submit" variant="contained">
            {isLogin ? "login" : "register"}
          </Button>
        </div>
        <div className="m-4">
          <Button variant="contained">logout</Button>
        </div>
      </form>
    </>
  );
};

export { AuthForm };
