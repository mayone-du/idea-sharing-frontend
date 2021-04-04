import { getUsers } from "../lib/getUsers";
import { UserContextProvider } from "../contexts/UserContext";
import { Layout } from "../components/Layout";
import { User } from "../components/User";

type Users = [
  {
    id: number;
    username: string;
    profile_text: string;
  }
];

const Profile: React.VFC<{ users: Users }> = ({ users }) => {
  return (
    <>
      <UserContextProvider>
        <Layout metaTitle="profile">
          <h1 className="text-4xl text-center my-4">profile</h1>

          <div>
            <User />
          </div>

          <div>
            <h2 className='text-3xl text-center mt-20'>users-list</h2>
            {users.map((user) => {
              return (
                <div key={user.id.toString()}>
                  <div>user-id : {user.id}</div>
                  <div>username : {user.username}</div>
                  <div>profile : {user.profile_text}</div>
                </div>
              );
            })}
          </div>
        </Layout>
      </UserContextProvider>
    </>
  );
};

export default Profile;

const getStaticProps = async () => {
  const users = await getUsers();
  return users;
};
export { getStaticProps };
