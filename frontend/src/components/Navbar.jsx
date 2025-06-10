import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const { setshowsearch, getCartCount,navigate,token,setToken,setCartItems} = useContext(ShopContext);

  const logout= ()=>{
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }
  return (
    <>
      <div className='mt-7 flex items-center justify-between py-5 font-medium bg-yellow-500 rounded'>
        <Link to='/'><img src={assets.logo} className='w-36' alt="" /></Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
          <NavLink 
            to='/' 
            className={({ isActive }) => `flex flex-col items-center gap-1 hover:text-black ${isActive ? 'underline font-semibold' : ''}`}
          >
            <p>Home</p>
          </NavLink>
          <NavLink 
            to='/collection' 
            className={({ isActive }) => `flex flex-col items-center gap-1 hover:text-black ${isActive ? 'underline font-semibold' : ''}`}
          >
            <p>Collection</p>
          </NavLink>
          <NavLink 
            to='/about' 
            className={({ isActive }) => `flex flex-col items-center gap-1 hover:text-black ${isActive ? 'underline font-semibold' : ''}`}
          >
            <p>About</p>
          </NavLink>
          <NavLink 
            to='/contact' 
            className={({ isActive }) => `flex flex-col items-center gap-1 hover:text-black ${isActive ? 'underline font-semibold' : ''}`}
          >
            <p>Contact</p>
          </NavLink>
        </ul>
        <div className='flex items-center gap-6 px-5'>
          <img onClick={() => setshowsearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
          <div className='group relative'>
            <img onClick ={()=>token ? null: navigate('/login') }src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
            {/*dropdown */}
            {token && 
            <div className='group-hover:block hidden absolute dropdown menu right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <p onClick={()=>navigate('/orders')}className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={logout}className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>}
            
          </div>
          <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]'>{getCartCount()}</p>
          </Link>
          <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
        </div>
      </div>

      {/* Sidebar background overlay */}
      {visible && (
        <div
          onClick={() => setVisible(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
        />
      )}

      {/* Sidebar menu for small screen */}
      <div className={`fixed top-0 right-0 bottom-0 w-64 bg-yellow-100 z-50 transform transition-transform duration-300 ease-in-out
        ${visible ? 'translate-x-0' : 'translate-x-full'}
        flex flex-col p-6 text-gray-800 overflow-y-auto`}>
        
        <div onClick={() => setVisible(false)} className='flex items-center gap-3 cursor-pointer mb-8'>
          <img className='h-6 rotate-180' src={assets.dropdown_icon} alt="Back" />
          <p className='font-semibold hover:text-black transition'>Back</p>
        </div>

        <NavLink
          to='/'
          onClick={() => setVisible(false)}
          className={({ isActive }) =>
            `py-3 px-4 rounded cursor-pointer transition-colors ${
              isActive ? 'bg-yellow-300 font-semibold' : 'hover:bg-yellow-200'
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to='/collection'
          onClick={() => setVisible(false)}
          className={({ isActive }) =>
            `py-3 px-4 rounded cursor-pointer transition-colors ${
              isActive ? 'bg-yellow-300 font-semibold' : 'hover:bg-yellow-200'
            }`
          }
        >
          Collection
        </NavLink>

        <NavLink
          to='/about'
          onClick={() => setVisible(false)}
          className={({ isActive }) =>
            `py-3 px-4 rounded cursor-pointer transition-colors ${
              isActive ? 'bg-yellow-300 font-semibold' : 'hover:bg-yellow-200'
            }`
          }
        >
          About
        </NavLink>

        <NavLink
          to='/contact'
          onClick={() => setVisible(false)}
          className={({ isActive }) =>
            `py-3 px-4 rounded cursor-pointer transition-colors ${
              isActive ? 'bg-yellow-300 font-semibold' : 'hover:bg-yellow-200'
            }`
          }
        >
          Contact
        </NavLink>
      </div>
    </>
  )
}

export default Navbar
