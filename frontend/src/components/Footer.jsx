import React from 'react'
import { assets } from '../assets/assets'

export const Footer = () => {
  return (
    <div >
        <div className='flex felx-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
            <div className=''>
                <img src={assets.logo} className='mb-5 w-32' alt="" />
                <p className='w-full md:ww-2/3 text-gray-600'>
                   MuscleFuel  provides premium gym supplements designed to support muscle growth, 
                   boost energy, and enhance recovery. With quality ingredients and science-backed formulas,
                   they help fitness enthusiasts achieve their best performance.
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <p className='text=xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91 9007490217</li>
                <li>mymail@gmail.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025 @ MuscleFuel.com - All Right Reserived</p>
        </div>
    </div>
  )
}
