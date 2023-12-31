import React, { useEffect, useState } from 'react'
import { Link,NavLink } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { isLoggedIn,setUserLoggedOut } from '../utils/userLoggedIn';
import axios from 'axios';
import { setUser } from '../slices/userslice';
import { useNavigate } from 'react-router-dom';


const Nav = () => {
    const userstore = useSelector(state =>state.userstore)
    const cartstore = useSelector(state => state.cartstore)
    const [toggle,setToggle] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const myOrderHandler=()=>{
        navigate("/orders")
    }
    const myProductHandler =()=>{
        navigate("/products")
    }
    const logOutHandler = async () =>{
        await axios.get("/api/user/logout")
        setUserLoggedOut()
        dispatch(setUser([]))
        navigate("/login")
    }
    const changeStatus = () =>{
        if(toggle)setToggle(false)
        else setToggle(true)
    }

    useEffect(()=>{

        document.addEventListener('click',(e)=>{
            if(e.target.id !== 'optionmenu3' &&  e.target.id != 'optionmenu6' && e.target.id != "optionmenu2"){
                setToggle(false)
            }
        })
    })


  return (
    <div>

    <nav className="bg-gray-800 text-white p-4">
    <div className="container mx-auto flex items-center justify-between  flex-wrap">
      <div className="flex items-center">
        <img src="/cart2.svg" alt="Movie Listing App Logo" className="w-8 h-8 mr-2"/>
        <Link to="#" className="text-2xl font-bold">Mine-Cart</Link>
      </div>
      <div className="flex items-center">
        <div className="flex gap-4 items-center flex-wrap mt-4">
       
       
        
        
        <NavLink to="/" className= {({isActive})=> `${isActive ? "text-blue-400":"text-white"}`} >Home</NavLink>
        { (userstore.role == 'admin' || userstore.role == 'owner') &&  <NavLink to="/addProduct" className={({isActive})=> `${isActive ? "text-blue-400":"text-white"}`} >Add Product</NavLink> }
         
        <NavLink to="/about" className={({isActive})=> `${isActive ? "text-blue-400":"text-white"}`} >About</NavLink>
     

        <div>

        <div className='flex items-center'>
        <NavLink to="/cart" className={({isActive})=> `${isActive ? "text-blue-400":"text-white"}`} >Cart</NavLink>
        <span className="flex items-center ml-1 bg-green-400 rounded-full px-2 py-1 text-sm font-bold text-black"> <span> 
            <svg width="32" height="32" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" enable-background="new 0 0 76.00 76.00" xml:space="preserve">
                <path fill="#000000" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 46.7083,47.5C 48.8945,47.5 50.6667,49.2722 50.6667,51.4583C 50.6667,53.6445 48.8945,55.4167 46.7083,55.4167C 44.5222,55.4167 42.75,53.6445 42.75,51.4583C 42.75,49.2722 44.5222,47.5 46.7083,47.5 Z M 30.875,47.5C 33.0611,47.5 34.8333,49.2722 34.8333,51.4583C 34.8333,53.6445 33.0611,55.4167 30.875,55.4167C 28.6889,55.4167 26.9167,53.6445 26.9167,51.4583C 26.9167,49.2722 28.6889,47.5 30.875,47.5 Z M 25.3333,45.9167L 25.3333,41.1667L 22.1667,28.5L 19,28.5L 19,23.75L 26.9167,23.75L 26.9167,28.5L 57,28.5L 52.25,45.9167L 25.3333,45.9167 Z M 30.2417,41.1667L 48.925,41.1667L 50.825,33.25L 28.3417,33.25L 30.2417,41.1667 Z "/>
            </svg>
            </span><span>{cartstore.length}</span></span>
        </div>
        </div>

        {userstore.email ?
        <span className="text-bglightredcolor flex gap-2 items-center cursor-pointer select-none lowercase " onClick={changeStatus} id='optionmenu3'> 
          {userstore.email}
          <img style={{width:'16px',height:'10px'}} id="optionmenu6" src='/Vector.png'/> </span>
         :
        <span className="text-bglightredcolor">User not logged-in</span>
    }
               
       
       

        </div>
       { toggle && <div className=" relative inline-block text-left" id="optionmenu2 ">
          <div className="absolute right-0 z-10 mt-5 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div className="p-3 flex flex-col items-start gap-2"   role="none">
            <span className="text-black text-blue-500 hover:underline" onClick={myProductHandler}> My Products</span>
              <span className="text-black text-blue-500 hover:underline" onClick={myOrderHandler}> My Orders</span>
              <span className="text-black text-blue-500 hover:underline" onClick={logOutHandler}> Logout</span>
            </div>
          </div>
        </div>}       
      </div>
      
    </div>
    
</nav>

      
    </div>
  )
}

export default Nav;
