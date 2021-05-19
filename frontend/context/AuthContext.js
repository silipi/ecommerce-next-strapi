import { createContext, useEffect, useState } from "react";
import strapiApi from "../utils/lib/api";

import { useRouter } from "next/router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!process.browser) {
      return;
    }
    const authTokenFromLocal = localStorage.getItem("authToken");

    if (authTokenFromLocal !== null) {
      strapiApi
        .get("/users/me", {
          headers: {
            Authorization: `Bearer ${authTokenFromLocal}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setUser({
              username: res.data.username,
              email: res.data.email,
              id: res.data._id,
            });
          }
        });
    }
  }, []);

  function register(username, email, password, successRoute) {
    if (!process.browser) {
      return;
    }
    return strapiApi
      .post("/auth/local/register", { username, email, password })
      .then((res) => {
        const token = res.data.jwt;
        const receveidUser = {
          username: res.data.user.username,
          email: res.data.user.email,
          id: res.data.user._id,
        };

        setUser(receveidUser);

        localStorage.setItem("authToken", token);
        
        if (successRoute) router.push(successRoute);
        
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  function login(email, password, successRoute) {
    if (!process.browser) {
      return;
    }

    return strapiApi
      .post("/auth/local", {
        identifier: email,
        password,
      })
      .then((response) => {
        const token = response.data.jwt;
        const receivedUser = {
          username: response.data.user.username,
          email: response.data.user.email,
          id: response.data.user._id,
        };

        setUser(receivedUser);

        localStorage.setItem("authToken", token);
        
        if (successRoute) router.push(successRoute);
        
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  function logout() {
    if (!process.browser) {
      return;
    }
    setUser(null);
    localStorage.removeItem("authToken");
  }

  const values = {
    user,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
