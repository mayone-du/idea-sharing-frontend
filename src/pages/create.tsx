import { Layout } from "../components/Layout";
import { TextField, Button } from "@material-ui/core";
import { useState } from "react";

const Create: React.VFC = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

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
