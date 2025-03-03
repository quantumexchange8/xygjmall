import React, { useEffect, useState, useContext } from 'react'
import ProfileIcon from '../components/ProfileIcon'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserProfile = () => {

    const { navigate, backendUrl, setToken, setCartItems } = useContext(ShopContext);
    const [user, setUser] = useState(null);
    const [currentState, setCurrentState] = useState('default');

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    const updateProfile = async (event) => {
        event.preventDefault();
        try {
            if (currentState === 'updateProfile') {
                const response = await axios.post(backendUrl + '/api/user/update', {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    telNum: user.telNum,
                    address: user.address
                })
                if (response.data.success) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));

                    toast.success("个人资料更换成功");


                    setTimeout(
                        () => {
                            window.location.reload();
                        }, 3000
                    )
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
        const userData = JSON.parse(localStorage.getItem('user'));

        if (userData) {
            setUser(userData);
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="bg-white shadow-md mt-10 max-w-sm w-full mx-auto p-6">
                <ProfileIcon />
                <div className="text-center mt-5">
                    {
                        currentState === 'updateProfile'
                            ?
                            <>
                                <input
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    value={user.name}
                                    type="text"
                                    className='w-full px-3 py-2 border border-gray-800'
                                    placeholder='姓名'
                                    required
                                />
                                <input
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    value={user.email}
                                    type="text"
                                    className='w-full px-3 py-2 border border-gray-800'
                                    placeholder='邮箱'
                                    required
                                />
                                <input
                                    onChange={(e) => setUser({ ...user, telNum: e.target.value })}
                                    value={user.telNum}
                                    type="text"
                                    className='w-full px-3 py-2 border border-gray-800'
                                    placeholder='详细住址'
                                    required
                                />
                                <input
                                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                                    value={user.address}
                                    type="text"
                                    className='w-full px-3 py-2 border border-gray-800'
                                    placeholder='手机号码'
                                    required
                                />
                            </>
                            :
                            <>
                                <h1 className="text-xl font-semibold text-gray-700">{user.name}</h1>
                                <p className="text-gray-500">{user.email}</p>
                                <p className="text-gray-500">{user.telNum}</p>
                                <p className="text-gray-500">{user.address}</p>
                            </>
                    }


                </div>
                <div className="mt-6 flex justify-around">
                    {
                        currentState === 'updateProfile'
                            ?
                            <button className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-700" onClick={updateProfile}>完成</button>
                            :
                            <button className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-700" onClick={() => setCurrentState('updateProfile')}>更换个人资料</button>
                    }

                    <button className="bg-gray-300 text-gray-700 py-2 px-4 hover:bg-gray-400" onClick={logout}>退出</button>
                </div>
            </div>
        </>

    )
}

export default UserProfile
