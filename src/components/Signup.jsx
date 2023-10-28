import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showErrorToast ,showSuccessToast} from '../utils/toastUtils';
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [accountType, setAccountType] = useState('user');
  const [password, setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const userstore = useSelector(state => state.userstore)
  let email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/
  let name_regex = /^[A-Za-z ]{4,}$/


  const handleSignUp = async (e) => {

    try{
        e.preventDefault();
        console.log()
        if(!name.match(name_regex)){
            showErrorToast("Please Enter Valid Name")   
        }
        else if(!email_regex.test(email)){
            showErrorToast("Please Enter Valid Email")
        }
        else if(!password.match(password_regex)){
            showErrorToast('Please Enter Valid Password and Should Be Greater Than Size 6')
        }
        else if(password !== confirmPassword){
            showErrorToast("Confirm Password and Password Should Be Same..!!!")
        }
        else if(name && email && accountType && password && confirmPassword){
            let resp = await axios.post('/api/user/signup',{name,email,accountType,password,confirmPassword,role:accountType})
            if(resp.status == 201 && resp.data.status  == 'green'){
                showSuccessToast('User Sign Up To The Mine Cart Please Login ')
                navigate('/login')
            }
            else{
                showErrorToast('Getting Error :' + JSON.stringify(resp.data.message))
            }
        }

    }catch(err){
        console.log(err)
        showErrorToast(JSON.stringify(err.message) + err.response.data.message)
    }
    
  };

  useEffect(()=>{
     
       // navigate("/home")
  })

  return (
    <div className="container mx-auto mt-10" style={{ height: 'calc(100vh - 134px)' }}>
      <div className="flex justify-center">
        <div className="w-full md:w-96 p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-5 flex justify-center">Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
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
                <option value="user">User</option>
                <option value="admin">Admin</option>
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
            <div className="mb-4">
              <label htmlFor="confirmpassword" className="block text-gray-600">Confirm Password:</label>
              <input
                type="text"
                id="confirmpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">Sign Up</button>
          </form>
          <p className="mt-4 text-gray-600">Already have an account? <a href="/login" className="text-blue-500">Log in here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;


