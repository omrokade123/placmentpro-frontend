import {
 createContext,
 useContext,
 useState
} from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [loading] = useState(false); 
  // no hydration call needed

  /* LOGIN */
  const login = (token, userData) => {

    localStorage.setItem("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setToken(token);
    setUser(userData);
  };

  /* LOGOUT */
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () =>
  useContext(AuthContext);
