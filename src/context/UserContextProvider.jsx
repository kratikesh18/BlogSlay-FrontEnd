import React, { useState } from "react";
import { UserContext } from "./UserContext";

function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
