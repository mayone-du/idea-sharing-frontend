import { Layout } from '../components/Layout';

const Test: React.VFC<{ loginUser: any, setLoginUser: any}> = ({loginUser, setLoginUser}) => {
  console.log(loginUser)
  return (
    <>
    <Layout metaTitle='test' >
      {loginUser.username}
    </Layout>
      
    </>
  )
}

export default Test;