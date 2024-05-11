import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../constants";
const { createContext, useEffect, useState } = require("react");
const UserContext = createContext({
  user: null,
});

const UserProvider = (prop) => {
  const [user, setUser] = useState({
    user: null,
  });

  const getMyProfile = async () => {
    try {
      const res = await axios
        .get(`${server}/api/v1/myProfile`, {
          withCredentials: true,
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setUser(null);
        });
      if (res.status === 200) {
        setUser(res.data?.user);
      }
    } catch (error) {
      setUser(null);
    }
  };
  useEffect(() => {
    getMyProfile();
  }, []);
  return (
    <UserContext.Provider value={{ user: user, setUser }}>
      {prop.children}
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext };
