import React from 'react';
import { useState } from 'react';
import { backendUrl } from '../App';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = ({setToken}) => {
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const onSubmitHandler = async(e) =>{
        try {
            e.preventDefault();
            const response= await axios.post(backendUrl+'/api/user/admin',{email,password})
            if(response.data.success){
              console.log(response)          
                setToken(response.data.token)
            }
            else{
              toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-yellow-200">
        <h1 className="text-3xl font-bold text-center text-yellow-600 mb-8">Admin Panel</h1>
        <form className="space-y-6" onSubmit={onSubmitHandler}>
          <div>
            <p className="text-yellow-700 font-medium mb-1">Email Address</p>
            <input onChange={(e) =>setEmail(e.target.value)} value={email}
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <p className="text-yellow-700 font-medium mb-1">Password</p>
            <input onChange={(e) =>setPassword(e.target.value)} value={password}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
