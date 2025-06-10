import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [showPassword, setShowPassword] = useState(false);
  const { token, setToken, backendUrl } = useContext(ShopContext);  
  const navigate = useNavigate(); 

  const [name,setName]= useState('')
  const [password,setPassword]= useState('')
  const [email,setEmail]= useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // form logic here
    try {
        if(currentState==='Sign Up'){
          const response= await axios.post(backendUrl+'/api/user/register',{name,email,password})
          if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          }
          else{
            toast.error(response.data.message)
          }
        }
        else{
          const response= await axios.post(backendUrl+'/api/user/login',{email,password})
          if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          }
          else{
            toast.error(response.data.message)
          }
        }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  };

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] max-w-md mx-auto mt-16 gap-5 px-6 py-8 bg-white shadow-lg rounded-xl"
    >
      {/* Title */}
      <div className="flex items-center gap-3 mb-3">
        <p className="text-3xl font-semibold text-gray-800">{currentState}</p>
        <div className="h-[2px] w-10 bg-gray-800 rounded" />
      </div>

      {/* Name Field (Only for Sign Up) */}
      {currentState === 'Sign Up' && (
        <input onChange={(e)=>setName(e.target.value)} value={name}
          type="text"
          className="w-full px-4 py-2 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Full Name"
          required
        />
      )}

      {/* Email Field */}
      <input onChange={(e)=>setEmail(e.target.value)} value={email}
        type="email"
        className="w-full px-4 py-2 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        placeholder="Email"
        required
      />

      {/* Password Field with toggle */}
      <div className="relative w-full">
        <input onChange={(e)=>setPassword(e.target.value)} value={password}
          type={showPassword ? 'text' : 'password'}
          className="w-full px-4 py-2 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Password"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 hover:text-black focus:outline-none"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {/* Eye Off icon */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-3.582-9-8s4-8 9-8c1.324 0 2.58.316 3.75.875m1.875 1.625A9.956 9.956 0 0121 11c0 1.74-.523 3.355-1.413 4.704m-3.105-3.104a3 3 0 11-4.243-4.242" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {/* Eye icon */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Options */}
      <div className="w-full flex justify-between text-sm text-gray-600">
        {currentState === 'Login' ? <p className="cursor-pointer hover:text-black transition">Forgot Password?</p> : ''}
        {currentState === 'Login' ? (
          <p
            onClick={() => setCurrentState('Sign Up')}
            className="cursor-pointer hover:text-black transition"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState('Login')}
            className="cursor-pointer hover:text-black transition"
          >
            Already have an account?
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-black text-white py-2 mt-4 rounded-md hover:bg-gray-900 transition"
      >
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
