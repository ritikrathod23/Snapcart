import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const ProfileIconContext = createContext();

export const ProfileIconProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");

    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    setMyUser(parsedUser);
    setUser(!!parsedUser);
  }, []);

  return (
    <ProfileIconContext.Provider value={{ user, setUser, myUser, setMyUser }}>
      {children}
    </ProfileIconContext.Provider>
  );
};

export const useProfileIcon = () => useContext(ProfileIconContext);
