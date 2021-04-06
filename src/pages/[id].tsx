import { getIdeaIds } from '../lib/getIdeaIds';
import { getIdeaDetail } from '../lib/getIdeaDetail';

const Idea: React.VFC<{ idea: any }> = ({idea}) => {
  console.log(idea);
  
  return (
    <>
      <h1>{idea.id}</h1>
      <div>
        {idea.title}
      </div>
    </>
  )
}

export default Idea;

const getStaticPaths = async () => {
  const paths = await getIdeaIds();
  return {
    paths,
    fallback: false,
  };
};
export { getStaticPaths };


const getStaticProps = async ({ params }: any) => {
  const {idea: idea} = await getIdeaDetail(params.id);
  return {
    props: {
      idea,
    }
  }
}

export { getStaticProps };