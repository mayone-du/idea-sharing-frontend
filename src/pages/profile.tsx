import { getUsers } from "../lib/getUsers";
import Cookie from "universal-cookie";
import { TextField, Button } from "@material-ui/core";
import { Layout } from "../components/Layout";
import { useEffect, useState, useContext } from "react";
import { LoginUserContext } from '../contexts/LoginUserContext';
import { Users } from '../types/types';
// import useSWR from 'swr';



const Profile: React.VFC<{ users: Users }> = ({ users }) => {
  const cookie = new Cookie();

  const [profileText, setProfileText] = useState("");

  const {loginUser, setLoginUser} = useContext(LoginUserContext);

  // const fetcher: any = (url: string) => {fetch(url, {headers: {'Content-Type': 'application/json', Authorization: `JWT ${cookie.get('access_token')}`}}).then((res) => res.json())};
  // const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/my-profile/`;

  // const { data: newProfile, mutate }: any = useSWR(apiUrl, fetcher, { initialData: loginUser, })

  // console.log('newProfile:', newProfile)


  // const getMyProfile = async () => {
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/my-profile/`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `JWT ${cookie.get("access_token")}`,
  //         },
  //       }
  //     );
  //     if (res.ok) {
  //       const profile = await res.json();
  //       setLoginUser(profile);
  //       return profile;
  //     } else if (res.status === 401) {
  //       alert("認証情報が含まれていないか、期限が切れています。");
  //       return;
  //     }
  //   } catch (err) {
  //     alert("ログインされていないか、認証が切れています。");
  //   }
  // };

  const updateProfileText = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/user-detail/${loginUser.id}/`,
        {
          method: "PUT",
          body: JSON.stringify({ profile_text: profileText }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${cookie.get("access_token")}`,
          },
        }
      )
        .then((res) => {
          if (res.status === 401) {
            throw new Error("Unauthorized");
          } else if (res.ok) {
            setProfileText("");
            setLoginUser({ ...loginUser, profile_text: profileText });
          }
        })
        .catch((error) => {
          alert(error);
        });
    } catch (error) {
      alert("try-catch : " + error);
    }
  };

  useEffect(() => {
    console.log('profile page mount');
    
    // getMyProfile(setLoginUser, cookie);
    // mutate();
  }, []);

  return (
    <>
      <Layout metaTitle="profile" activePage='PROFILE'>
        <h1 className="text-4xl text-center my-4">profile</h1>

        <div className="m-40">
          <h2 className="text-3xl text-center mt-20">my profile</h2>
          <div>
            {loginUser.id}
          </div>
          <div>
            {loginUser.username}
          </div>
          <div>
          {loginUser.profile_text}
          </div>
        </div>

        <div className="bg-gray-300">
          <TextField
            variant="outlined"
            label="profile_text"
            onChange={(e) => {
              setProfileText(e.target.value);
            }}
            value={profileText}
          />
          <Button
            variant="outlined"
            onClick={() => {
              if (profileText === "") {
                alert("文字を入力してください。");
                return;
              }
              updateProfileText();
              // setLoginUser([{ ...loginUser[0], profile_text: profileText }]);
            }}
          >
            UPDATE
          </Button>
        </div>

        <div>
          <h2 className="text-3xl text-center mt-20">users-list</h2>
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
  return {
    props: {
      users,
      revalidate: 10,
    },
  };
};
export { getStaticProps };
