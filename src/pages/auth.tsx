import { Button } from "@material-ui/core";
import { useState, useContext } from "react";
import { Layout } from "../components/Layout";
import { UserContext, UserContextProvider } from "../contexts/UserContext";
import { AuthForm } from "../components/AuthForm";

const Auth: React.VFC = () => {
  // const { loginUser, setLoginUser } = useContext(UserContext);

  const [isLogin, setIsLogin] = useState(false);

  // console.log(loginUser);

  return (
    <>
      <UserContextProvider>
        <Layout metaTitle="auth">
          <div>
            <h1 className="text-4xl text-center my-4">
              ログイン・新規登録画面
            </h1>
            <Button
              variant="outlined"
              onClick={() => {
                setIsLogin(!isLogin);
              }}
            >
              changeMode
            </Button>

            <AuthForm isLogin={isLogin} />
          </div>
        </Layout>
      </UserContextProvider>
    </>
  );
};

export default Auth;
