import { useReducer } from "react"
import { AuthContext } from "./AuthContext"
import { authReducer } from "./authReducer"
import { Types } from "../types/Types"

// const initialState = {
//   logged: false,
// }

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    logged: !!user,
    user: user,
  }
}

export const AuthProvider = ({ children }) => {

  const [authState, dispatch] = useReducer(authReducer, {}, init);

  const login = (name = '') => {
    const user = { id: 'ABD', name };
    const action = { type: Types.login, payload: user }

    localStorage.setItem('user', JSON.stringify(user));

    dispatch(action);
  }

  const logout = () => {
    localStorage.removeItem('user');
    const user = { id: 'ABD', payload: ''};
    const action = { type: Types.logout, payload: user};

    dispatch(action);
  }

  return (
    <AuthContext.Provider value={{
      ...authState,
      login: login,
      logout: logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
