import React, { useEffect, useState, useContext } from 'react'
import ProfileIcon from '../components/ProfileIcon'
import { ShopContext } from '../context/ShopContext';

const UserProfile = () => {

    const { navigate, token, setToken, setCartItems } = useContext(ShopContext);
    const [user, setUser] = useState(null);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
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
                    <h1 className="text-xl font-semibold text-gray-700">{user.name}</h1>
                    <p className="text-gray-500">{user.email}</p>
                </div>
                <div className="mt-6 flex justify-around">
                    <button className="bg-gray-300 text-gray-700 py-2 px-4 hover:bg-gray-400" onClick={logout}>退出</button>
                </div>
            </div>
        </>

    )
}

export default UserProfile
