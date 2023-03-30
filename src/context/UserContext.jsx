import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    axios.get("/profile").then(res => {
      setUserId(res.data.userData.iat);
      setUserName(res.data.userData.userName);
    });
  }, []);
  return (
    <UserContext.Provider value={{ userName, userId, setUserName, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
