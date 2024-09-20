import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginUser = async () => {
    try {
      const formData = new FormData();
      formData.append("usr", "test@brandimic.com");
      formData.append("pwd", "testy123@");

      const response = await fetch(
        "https://shippex-demo.bc.brandimic.com/api/method/login",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data && data.message === "Logged In") {
        setIsLogged(true);
        setUser(data.user); // Assuming the API returns user data
      } else {
        setIsLogged(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setIsLogged(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loginUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
