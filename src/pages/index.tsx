import Link from "next/link";
import { Layout } from "../components/Layout";
import { getIdeas } from "../lib/getIdeas";
import { getComments } from "../lib/getComments";
import { useEffect, useContext } from "react";
import { Ideas, Comments } from "../types/types";
import { LoginUserContext } from "../contexts/LoginUserContext";

const Home: React.FC<{
  sortedIdeas: Ideas;
  comments: Comments;
}> = ({ sortedIdeas, comments }) => {
  const { loginUser, setLoginUser } = useContext(LoginUserContext);

  useEffect(() => {
    console.group("index mount");
    console.log(loginUser);
    console.groupEnd();
    if (loginUser.id !== 0) return;
  }, []);

  return (
    <>
      <Layout metaTitle="HOME" activePage="HOME">
        <h1 className="text-4xl text-center m-10">{loginUser.id}</h1>
        <div>
          {sortedIdeas.map((idea) => {
            return (
              <Link href={`/${idea.id}`} key={idea.id.toString()}>
                <a>
                  <div className="m-20 border">
                    <div>id - {idea.id}</div>
                    <div>title - {idea.title}</div>
                    <div>contents - {idea.contents}</div>
                    <div>is_published - {idea.is_published.toString()}</div>
                    <div>createuser - {idea.createuser.toString()}</div>
                    <div>commentCount - {JSON.parse(idea.comments).length}</div>
                    {/* {console.log(JSON.parse(idea.comments)[0] ? JSON.parse(idea.comments)[0].fields : null )} */}
                    <div>created_at - {idea.created_at}</div>
                    <div>updated_at - {idea.updated_at}</div>
                  </div>
                </a>
              </Link>
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
