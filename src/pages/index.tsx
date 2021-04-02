import { getIdeas } from "../lib/getIdeas";
// import { GetStaticProps } from "next";

type Ideas = [
  {
    id: number;
    title: string;
    contents: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
  }
];

const Home: React.FC<{ ideas: Ideas }> = ({ ideas }) => {
  return (
    <>
      <h1>Hello, World!!</h1>
      <div>
        {ideas.map((idea) => {
          return (
            <div className='m-20'>
              <div>id - {idea.id}</div>
              <div>title - {idea.title}</div>
              <div>contents - {idea.contents}</div>
              <div>is_published - {idea.is_published}</div>
              <div>created_at - {idea.created_at}</div>
              <div>updated_at - {idea.updated_at}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;

const getStaticProps = async () => {
  const ideas = await getIdeas();
  return {
    props: {
      ideas,
    },
  };
};

export { getStaticProps };
