import React from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <img src={assets.logo} className='mb-5 w-32' alt="" />
          <p className='w-full md:w-2/3 text-gray-600'>
          </p>
        </div>

        <div>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>
              <NavLink to='/'>
                <p>首页</p>
              </NavLink></li>
            {/* <li>
              <NavLink to='/about'>
                <p>关于</p>
              </NavLink>
            </li> */}
            <li>
              <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>订单</p>
            </li>
            {/* <li>
              <NavLink to='/contact'>
                <p>联系</p>
              </NavLink></li> */}
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>知识产权 
          {new Date().getFullYear()} &copy; 幸蚁国际 - 版权所有</p>
      </div>

    </div>
  )
}

export default Footer
