import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'

import { Home,Nav,Footer } from './components'
import Cookies from 'js-cookie'
import { useDispatch , useSelector } from 'react-redux'
import { setUser } from './slices/userslice'
import { showErrorToast,showSuccessToast } from './utils/toastUtils'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {isLoggedIn} from "./utils/userLoggedIn"



function App() {
  const [count, setCount] = useState(0)
  const userstore = useSelector(state => state.userstore )
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const setUserLoggedIn = () => {
    let userData= JSON.parse(Cookies.get('userInfo'))
    dispatch(setUser(userData))
  }
  

  useEffect(()=>{
    let login = isLoggedIn()
    if(login){
      setUserLoggedIn()
    }
    else{
      if(window.location.pathname != "/signup"){
        navigate('/login')
      }   
    }
  },[])


  return (
    <>
    <Nav/>
    <Outlet/>
    <ToastContainer/>
    <Footer/>
    </>
  )
}

export default App
