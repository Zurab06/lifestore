import { createContext,useContext,useEffect,useState } from "react"

const INITIAL_USER={
    name: '',
    id: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: '',
}
const INITIAL_STATE={
  user: INITIAL_USER,
  isLoading:false,
  isAuthenticated:false,
  setUser: ()=>{},
setIsAuthenticated:()=>{},
checkAuthUser: async ()=> false as boolean
}
const AuthContext = createContext<IContextType>(INITIAL_STATE)
const AuthContext = () => {
  return (
    <div>AuthContext</div>
  )
}

export default AuthContex