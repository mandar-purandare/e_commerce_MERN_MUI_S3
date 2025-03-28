import { createContext, useCallback, useEffect, useReducer } from "react";
import { User } from "../types";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const LoginContext = createContext<any>({});

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

function AuthContext({ children }: any) {
  const initalLoggedInState = { user: null };
  const [state, dispatch] = useReducer(reducer, initalLoggedInState);
  const goTo = useNavigate();

  const login = (user: User) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user-token");
    toast.success("User logged out successfully");
    goTo("/login");
  };

  const GetCurrentUser = useCallback(async () => {
    const token = JSON.parse(localStorage.getItem("user-token")!);

    if (token && token !== "") {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/auth/get-current-user",
          { params: { token } }
        );
        if (response.data.success) {
          login(response.data.data);
        } else {
          toast.error(response.data.error);
        }
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
  }, []);

  useEffect(() => {
    GetCurrentUser();
  }, [GetCurrentUser]);
  return (
    <LoginContext.Provider value={{ login, logout, state, GetCurrentUser }}>
      {children}
    </LoginContext.Provider>
  );
}

export default AuthContext;
