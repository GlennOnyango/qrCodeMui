import React, { useState, useEffect } from "react";
import { usePost } from "../customHooks";
import secureLocalStorage from "react-secure-storage";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";

type Props = {
  children: JSX.Element;
};
const auth = {
  userDetails: {
    name: "",
    email: "",
    tokenAccess: "",
    tokenRefresh: "",
    role: "",
  },
  isLoggedIn: false,
  login: (formData: JSON) => {},
  logout: () => {},
};

const AuthContext = React.createContext(auth);

export const AuthContextProvider = ({ children }: Props) => {
  const router = useRouter();
  const [data, callApi, isLoading, errMessage] = usePost();
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    tokenAccess: "",
    tokenRefresh: "",
    role: "",
  });

  useEffect(() => {
    const userStorage: any = secureLocalStorage.getItem("user");

    if (userStorage) {
      const jwt_token: any = jwt_decode(userStorage.tokenAccess);

      if (Date.now() >= jwt_token.exp) {
        setLogged(true);
        setUser(userStorage);
      }
    }
  }, []);

  useEffect(() => {
    if ("error" in data) {
    } else if ("email" in data) {
      if (data.user) {
        setLogged(true);
        const tokens = data?.tokens as string;
        const res_child = JSON.parse(tokens?.replace(/'/g, '"'));

        const backDetails = {
          name: data?.company_name as string,
          email: data?.email as string,
          tokenAccess: res_child.access,
          tokenRefresh: res_child.refresh,
          role: data?.role as string,
        };

        setUser(backDetails);
        secureLocalStorage.setItem("user", backDetails);
        router.replace("/qr");
      }
    }
  }, [data, errMessage]);

  const loginHandler = (formData: JSON) => {
    callApi(formData, "auth/login/");
  };
  const logoutHandler = () => {
    
    setLogged(false);
    setUser({
      name: "",
      email: "",
      tokenAccess: "",
      tokenRefresh: "",
      role:""
    });
    secureLocalStorage.clear();
    router.replace("/login")
  };


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: logged,
        userDetails: user,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
