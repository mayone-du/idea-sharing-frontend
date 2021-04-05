import { Layout } from '../components/Layout';
import { getIdeas } from "../lib/getIdeas";
import { getComments } from "../lib/getComments";
import { useState } from "react";
// import { GetStaticProps } from "next";

type Ideas = [
  {
    id: number;
    title: string;
    contents: string;
    is_published: boolean;
    createuser: any;
    created_at: string;
    updated_at: string;
  }
];

type Comments = [
  {
    id: number;
    idea: number;
    comment: string;
    comment_user: number;
    created_at: string;
  }
];

const Home: React.FC<{ ideas: Ideas; comments: Comments }> = ({
  ideas,
  comments,
}) => {


  // const [isLogin, setIsLogin] = useState(false);
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  
  // const jwtCreate = async () => {
  //   await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/jwt/create/`,
  //   {
  //     method: 'POST',
  //     body: JSON.stringify({ username: username, password: password}),
  //   })
  //   .then((res) => {
  //     if (res.status === 401) {
  //       throw new Error('Un Authorized')
  //     } else if (res.ok) {

  //     }
  //   })
  // }









  return (
    <>
    <Layout
      metaTitle='HOME'
    >
      <h1>Hello, World!!</h1>
      <div>
        {ideas.map((idea) => {
          return (
            <div key={idea.id.toString()} className="m-20">
              <div>id - {idea.id}</div>
              <div>title - {idea.title}</div>
              <div>contents - {idea.contents}</div>
              <div>is_published - {idea.is_published.toString()}</div>
              <div>createuser - {idea.createuser.toString()}</div>
              <div>created_at - {idea.created_at}</div>
              <div>updated_at - {idea.updated_at}</div>
            </div>
          );
        })}
      </div>

      <div>
        {comments.map((comment) => {
          return (
          <div key={comment.id.toString()} className="m-10">
            <div>comment id - {comment.id.toString()}</div>
            <div>idea id - {comment.idea}</div>
            <div>comment_user id - {comment.comment_user.toString()}</div>
            <div>comment - {comment.comment}</div>
            <div>created_at - {comment.created_at}</div>
          </div>
          )
        })}
      </div>

    </Layout>

    </>
  );
};

export default Home;

const getStaticProps = async () => {
  const ideas = await getIdeas();
  const comments = await getComments();
  return {
    props: {
      ideas,
      comments,
    },
    revalidate: 10,
  };
};

export { getStaticProps };
