import { createContext, useContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const authReducer = (state, { type, payload }) => {
    switch (type) {
      case "SAVE_REGISTER_DETAILS":
        localStorage.setItem(
          "MusicFlixLogin",
          JSON.stringify({
            isUserLoggedIn: true,
            token: payload.token,
            name: payload.user.name,
            email: payload.user.email,
          })
        );
        return {
          ...state,
          isUserLoggedIn: true,
          authToken: payload.token,
          name: payload.user.name,
          email: payload.user.email,
        };

      case "SAVE_LOGIN_DETAILS":
        localStorage.setItem(
          "MusicFlixLogin",
          JSON.stringify({
            isUserLoggedIn: true,
            token: payload.token,
            name: payload.user.name,
            email: payload.user.email,
          })
        );
        return {
          ...state,
          isUserLoggedIn: true,
          authToken: payload.token,
          name: payload.user.name,
          email: payload.user.email,
        };
      case "LOGIN_BY_LOCAL_STORAGE":
        return {
          ...state,
          isUserLoggedIn: true,
          authToken: payload.user.token,
          name: payload.user.name,
          email: payload.user.email,
        };
      case "LOG_OUT_HANDLER":
        localStorage.removeItem("MusicFlixLogin");
        return {
          ...state,
          currentUserId: null,
          isUserLoggedIn: false,
          name: "",
          email: "",
        };
      default:
        return state;
    }
  };

  const [authState, authDispatch] = useReducer(authReducer, {
    isUserLoggedIn: false,
    authToken: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    const memory = JSON.parse(localStorage.getItem("MusicFlixLogin"));
    if (memory?.isUserLoggedIn === true) {
      if (memory.token) {
        authDispatch({
          type: "LOGIN_BY_LOCAL_STORAGE",
          payload: { user: memory },
        });
      }
    }
  }, [authDispatch]);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
