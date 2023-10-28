import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../slices/userslice';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { showErrorToast, showSuccessToast } from '../utils/toastUtils'

import { isLoggedIn,setUserLoggedOut } from '../utils/userLoggedIn';

const Login = () => {
    const [email, setEmail] = useState('');
    const [accountType, setAccountType] = useState('user');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/



    const handleLogIn = async (e) => {
        try {
            e.preventDefault();
            console.log(e)
            if(email.trim() == 0 || !email.match(email_regex)){
                showErrorToast("Please Enter Valid Email")
            }
            else if(!password.match(password_regex)){
                showErrorToast('Please Enter Valid Password and Should Be Greater Than Size 6')
            }
            else if (email.length > 0 && password && password.length >= 8) {
                const resp = await axios.post("/api/user/login", { email, password })
                if(resp.status == 200 && resp.data.status  == 'green'){
                    console.log(resp.data.data)
                    showSuccessToast(resp.data.message)
                    dispatch(setUser(resp.data.data))
                    navigate("/")
                }
                else{
                    showErrorToast('Getting Error :' + JSON.stringify(resp.data.message))
                }
            }
        }
        catch(err){
            console.log(err)
            showErrorToast(JSON.stringify(err.message) + err.response.data.message)
        }
    
  };

  useEffect(()=>{
    if(isLoggedIn()){
        navigate(window.location.pathname)
    }
  },[])

    return (
        <div className="container mx-auto mt-32" style={{ height: 'calc(100vh - 134px)' }}>
            <div className="flex justify-center">
                <div className="w-full md:w-96 p-6 bg-white rounded-lg shadow">
                    <h2 className="text-2xl font-semibold mb-5 flex justify-center">Login</h2>
                    <form onSubmit={handleLogIn}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-600">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-1 p-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="accountType" className="block text-gray-600">Account Type:</label>
                            <select
                                id="accountType"
                                value={accountType}
                                onChange={(e) => setAccountType(e.target.value)}
                                className="w-full mt-1 p-2 border rounded-lg"
                            >
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-1 p-2 border rounded-lg"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">Login</button>
                    </form>
                    <p className="mt-4 text-gray-600">Don't have an account? <a href="/signup" className="text-blue-500 cursor-pointer">Sign up here</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
