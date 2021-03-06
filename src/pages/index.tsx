import { Layout } from "../components/Layout";
import { getIdeas } from "../lib/getIdeas";
import { getComments } from "../lib/getComments";
import { useEffect, useContext } from "react";
import { Ideas, Comments, } from '../types/types';
import { LoginUserContext } from '../contexts/LoginUserContext';
// import { GetStaticProps } from "next";



const Home: React.FC<{
  sortedIdeas: Ideas;
  comments: Comments;
  // loginUser: LoginUser;
  // setLoginUser: any;
}> = ({ sortedIdeas, comments, }) => {
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

  // useEffect(() => {
  //   console.log(sortedIdeas);
  // }, []);


  const {loginUser, setLoginUser} = useContext(LoginUserContext);

  useEffect(() => {
    console.log('effect first: ' + loginUser)
    setLoginUser({id: 83, username: 'hoge', profileText: 'hogehogehogehogeohge'})
  }, []);

  console.log('normal: ' + loginUser);
  console.log(loginUser);
  

  return (
    <>
      <Layout metaTitle="HOME">
        <h1>Hello, World!!</h1>
        <div>
          {sortedIdeas.map((idea) => {
            return (
              <div key={idea.id.toString()} className="m-20">
                <div>id - {idea.id}</div>
                <div>title - {idea.title}</div>
                <div>contents - {idea.contents}</div>
                <div>is_published - {idea.is_published.toString()}</div>
                <div>createuser - {idea.createuser.toString()}</div>
                <div>commentCount - {JSON.parse(idea.comments).length}</div>
                {/* <div>commentCount - {JSON.parse(idea.comments)[0].length ? JSON.parse(idea.comments).length : 0 }</div> */}
                {/* <div>comments - {JSON.parse(idea.comments)[0] ? JSON.parse(idea.comments).map((item: any, index: number) => index) : 0 }</div> */}
                {/* {console.log(JSON.parse(idea.comments)[0] ? JSON.parse(idea.comments).map((item: any) => item.fields) : null )} */}
                {/* {console.log(JSON.parse(idea.comments)[0] ? JSON.parse(idea.comments)[0].fields : null )} */}
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
            );
          })}
        </div>
      </Layout>
    </>
  );
};

export default Home;

const getStaticProps = async () => {
  const ideas: Ideas = await getIdeas();
  const sortedIdeas: Ideas = ideas.sort((a, b) => {
    return a < b ? 1 : -1;
  });
  const comments = await getComments();
  return {
    props: {
      sortedIdeas,
      comments,
    },
    revalidate: 10,
  };
};

export { getStaticProps };
