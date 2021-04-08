import { useState, useContext } from "react";
import { TextField, Button } from "@material-ui/core";
import Cookie from "universal-cookie";
import { useRouter } from "next/router";
import { LoginUserContext } from "../contexts/LoginUserContext";
import { getMyProfile } from "../lib/getMyProfile";

const AuthForm: React.VFC<{ isLogin: boolean }> = ({ isLogin }) => {
  const cookie = new Cookie();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, setLoginUser } = useContext(LoginUserContext);

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
          throw new Error("401 Unauthorized\n");
        } else if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        const accessOptions = { path: "/", maxAge: 60 * 60 };
        const refreshOptions = { path: "/", maxAge: 60 * 60 * 24 * 7 };
        cookie.set("access_token", data.access, accessOptions);
        cookie.set("refresh_token", data.refresh, refreshOptions);
        // getMyProfile(setLoginUser);
        router.push("/");
      })
      .catch((error) => {
        alert(
          error +
            "入力されたユーザーネームとパスワードが一致しない可能性があります。"
        );
      });
  };

  const register = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/register/`, {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 400) {
          throw new Error("400 Bad Request\n");
        } else if (res.ok) {
          login();
        }
      })
      .catch((error) => {
        alert(
          error + "入力したユーザーネームは既に登録されている可能性があります。"
        );
      });
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
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          />
        </div>
        <div className="m-10">
          <p>password</p>
          <TextField
            type="password"
            placeholder="password"
            variant="outlined"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>

        <div className="m-4">
          <Button type="submit" variant="contained">
            {isLogin ? "login" : "register"}
          </Button>
        </div>
        <div className="m-4">
          <Button
            variant="contained"
            onClick={() => {
              cookie.remove("access_token");
              cookie.remove("refresh_token");
              setLoginUser({});
              router.push("/");
            }}
          >
            logout
          </Button>
        </div>
      </form>
    </>
  );
};

export { AuthForm };
