import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      {/* Hero Left Side */}
      <img className='w-full sm:w-1/2' src={assets.doctor_img} alt="" />
      {/* Hero Right Side */}
      <img className='w-full sm:w-1/2' src={assets.beautypack_img} alt="" />
    </div>
  )
}

export default Hero
