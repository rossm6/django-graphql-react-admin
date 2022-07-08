import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

function AppProvider({ children }) {
  const [csrfToken, setCsrfToken] = useState();

  useEffect(() => {
    fetch("http://localhost:8000/get-csrf-token", { credentials: "include" })
      .then((response) => {
        const responseClone = response.clone();
        return response.json().catch(() => {
          console.log("Problem getting the csrf token");
          responseClone.text().then((text) => {
            console.log("Response text was");
            console.log(text);
          });
          return null;
        });
      })
      .then((data) => {
        setCsrfToken(data.csrftoken);
      });
  }, []);

  return (
    <AppContext.Provider value={{ csrfToken, setCsrfToken }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;