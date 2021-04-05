import { Button } from "@material-ui/core";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { AuthForm } from "../components/AuthForm";

const Auth: React.VFC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Layout metaTitle="auth">
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

          <AuthForm isLogin={isLogin} />
        </div>
      </Layout>
    </>
  );
};

export default Auth;
