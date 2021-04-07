import { getIdeaIds } from '../lib/getIdeaIds';
import { getIdeaDetail } from '../lib/getIdeaDetail';
import { Layout } from '../components/Layout';

type Idea = {
  id: number,
  title: string,
  contents: string,
  createuser: number,
  created_at: string,
  updated_at: string,
}

const Idea: React.VFC<{ idea: Idea }> = ({idea}) => {
  
  return (
    <>
    <Layout metaTitle={`${idea.title}`} >
      <h1>{idea.id}</h1>
      <div>
        {idea.title}
      </div>
      <div>
        {idea.contents}
      </div>
      <div>
        createuser = {idea.createuser}
      </div>
      <div>
        {idea.created_at}
      </div>
      <div>
        {idea.updated_at}
      </div>
    </Layout>
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