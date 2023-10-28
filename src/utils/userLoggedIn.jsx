import Cookies from "js-cookie";
// import { useDispatch,useSelector } from "react-redux";
// import { setUser } from "../slices/userslice";

//const dispatch = useDispatch()
const loginCookie = Cookies.get('login')
const userInfo = Cookies.get('userInfo')


export const isLoggedIn = () => (loginCookie && userInfo)

// export const setUserLoggedIn = () => {
//     let userData= JSON.parse(Cookies.get('userInfo'))
//     dispatch(setUser(userData))
// }

export const setUserLoggedOut = ()=>{
    Cookies.remove('userInfo')
    Cookies.remove('login')
    
}

export const getUserInfo = () =>{
    return JSON.parse(Cookies.get('userInfo'))
}
 
