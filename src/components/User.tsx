import React, { useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";


const User: React.VFC = () => {


  const {loginUser, setLoginUser} = useContext(UserContext);

  useEffect(() => {
    setLoginUser({ ...loginUser, username: 'hoge'})
  }, [])


  return (
    <>
      <h2 className='text-2xl font-bold text-center my-10'>User</h2>

      <div>
        loginUser - {loginUser.id}
      </div>
      <div>
        username - {loginUser.username}
      </div>
    </>
  )
}

export { User };