import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('登入');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [password, setPasword] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [telNum, setTelNum] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === '创建账号') {

        const response = await axios.post(backendUrl + '/api/user/register', { name, address, telNum, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }

      } else {

        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }

      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === '登入'
        ?
        ''
        :
        <>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='姓名' required />
          <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='详细住址' required />
          <input onChange={(e) => setTelNum(e.target.value)} value={telNum} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='手机号码' required />
        </>
      }
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='邮件箱' required />
      <input onChange={(e) => setPasword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='密码' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        {
          currentState === '登入'
            ? <p onClick={() => setCurrentState('创建账号')} className=' cursor-pointer'>创建账号</p>
            : <p onClick={() => setCurrentState('登入')} className=' cursor-pointer'>登入</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === '登入' ? '登入' : '创建账号'}</button>
    </form>
  )
}

export default Login
