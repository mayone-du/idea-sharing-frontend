import { Layout } from "../components/Layout";
import { TextField, Button } from "@material-ui/core";
import { useState } from "react";
import Cookie from 'universal-cookie';


const Create: React.VFC = () => {

  const cookie = new Cookie();

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");


  const createIdea = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/idea/`,{
      method: 'POSt',
      body: JSON.stringify({ title: title, contents: contents, createuser: 1, is_published: false, }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${cookie.get('access_token')}`
      }
    })

  }

  return (
    <>
      <Layout metaTitle="create">
        <h1 className="text-center text-4xl font-bold">create</h1>

        <div className="m-10">
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              console.log(title, contents)
              createIdea();
            }}
          >
          <div>
            <TextField
              variant="outlined"
              label="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <TextField
              rows={4}
              variant="outlined"
              label="contents"
              onChange={(e) => {
                setContents(e.target.value);
              }}
            />
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
