import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate=useNavigate();
  return (
    <div className='mt-5 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto flex flex-col sm:flex-row border border-yellow-400 rounded-lg overflow-hidden'>
        {/* Left Side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 px-4'>
          <div className='text-[#414141] max-w-md'>
            <div className='flex items-center gap-2 mb-2'>
              <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
              <p className='font-medium text-sm md:text-base'>Get Big</p>
            </div>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug sm:py-3'>
              Save Bigger
            </h1>
            <div className='flex items-center gap-2 mt-4'>
              <p className='font-semibold text-sm md:text-base'>Shop Now</p>
              <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            </div>

            {/* CTA Button */}
            <button  onClick={() => navigate('/collection')} className='mt-6 px-6 py-3 bg-[#414141] text-white font-semibold rounded hover:bg-[#2f2f2f] transition-all duration-300'>
              Explore Collection
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className='w-full sm:w-1/2'>
          <img
            className='w-full h-64 sm:h-auto object-cover'
            src={assets.Hero_img}
            alt='Latest Arrivals'
          />
        </div>
      </div>
    </div>
  )
}
