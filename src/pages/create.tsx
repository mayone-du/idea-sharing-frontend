import { Layout } from "../components/Layout";
import { TextField, Button, Switch } from "@material-ui/core";
import { useEffect, useState } from "react";
import Cookie from "universal-cookie";
import { getMyProfile } from "../lib/getMyProfile";

const Create: React.VFC = () => {
  const cookie = new Cookie();

  const [loginUser, setLoginUser] = useState([
    {
      id: 0,
      username: "guest",
      profile_text: "default-value",
    },
  ]);

  const [newIdea, setNewIdea] = useState({
    title: "",
    contents: "",
    createuser: 3,
    isPublished: false,
  });

  const createIdea = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/idea/`, {
      method: "POST",
      // body: JSON.stringify({ title: newIdea.title, contents: newIdea.contents, createuser: newIdea.createuser, is_published: newIdea.isPublished, }),
      body: JSON.stringify(newIdea),
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("401 Unauthorized\n");
        } else if (res.ok) {
          setNewIdea({
            ...newIdea,
            title: "",
            contents: "",
            isPublished: false,
          });
        }
      })
      .catch((error) => {
        alert(error + "エラー");
      });
  };

  useEffect(() => {
    getMyProfile(setLoginUser, cookie);
    console.log(loginUser);
  }, []);

  return (
    <>
      <Layout metaTitle="create" loginUser={loginUser}>
        <h1 className="text-center text-4xl font-bold">create</h1>
        <div>
          {loginUser[0].id}
          <br />
          {loginUser[0].username}
          <br />
          {loginUser[0].profile_text}
        </div>
        <div className="m-10">
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              if (newIdea.title === "" || newIdea.contents === "") {
                alert("titleとcontentsは必須です。");
                return;
              }
              createIdea();
            }}
          >
            <div>
              <TextField
                variant="outlined"
                label="title"
                onChange={(e) => {
                  setNewIdea({ ...newIdea, title: e.target.value });
                }}
                value={newIdea.title}
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                label="contents"
                onChange={(e) => {
                  setNewIdea({ ...newIdea, contents: e.target.value });
                }}
                value={newIdea.contents}
              />
            </div>
            <div>
              <Switch
                value={newIdea.isPublished}
                color='primary'
                onChange={(e) => {
                  setNewIdea({ ...newIdea, isPublished: !newIdea.isPublished });
                }}
              />
              <div>
              {newIdea.isPublished ? 'true: 公開する' : 'false: 下書き'}
              </div>
            </div>
            <div>
              <Button type="submit" variant="outlined">
                CREATE
              </Button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Create;
