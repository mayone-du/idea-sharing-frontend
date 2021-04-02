import { getIdeas } from "../lib/getIdeas";
import { getComments } from "../lib/getComments";
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
    created_at: string;
  }
];

const Home: React.FC<{ ideas: Ideas; comments: Comments }> = ({
  ideas,
  comments,
}) => {
  return (
    <>
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
            <div>comment - {comment.comment}</div>
            <div>created_at - {comment.created_at}</div>
          </div>
          )
        })}
      </div>
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
