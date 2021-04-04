import { getUsers } from "../lib/getUsers";
import Cookie from "universal-cookie";

const cookie = new Cookie();

import { Layout } from "../components/Layout";
import { useEffect, useState } from "react";

type Users = [
  {
    id: number;
    username: string;
    profile_text: string;
  }
];


const Profile: React.VFC<{ users: Users }> = ({ users }) => {

  const [loginUser, setLoginUser] = useState([{ id: 0, username: '', profile_text: ''}]);

  const getMyProfile = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/my-profile/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookie.get("access_token")}`,
        },
      }
    );
    // console.log(res);
    const profile = await res.json();
    setLoginUser(profile);
    // console.log(profile);
    return profile;
  };


  useEffect(() => {
    getMyProfile();
  }, [])

  return (
    <>
        <Layout metaTitle="profile">
          <h1 className="text-4xl text-center my-4">profile</h1>


          <div className="m-40">
            <h2 className='text-3xl text-center mt-20'>my profile</h2>
            {loginUser.map((item, index) => {
              return (
                <div key={index.toString()}>
                  <p>{item.id}</p>
                  <p>{item.username}</p>
                  <p>{item.profile_text}</p>
                </div>
              )
            })}
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
    </>
  );
};

export default Profile;

const getStaticProps = async () => {
  const users = await getUsers();
  return users;
};
export { getStaticProps };
