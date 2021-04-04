import React, { createContext, useState } from "react";

const UserContext = createContext<any>({});
export { UserContext };

const UserContextProvider = ({ children }: any) => {
  const [loginUser, setLoginUser] = useState({ id: 0, username: '' });


  return (
    <UserContext.Provider
      value={{
        loginUser,
        setLoginUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider };
