import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const DropDownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="relative inline-block text-left">
            <div>
                <i onClick={toggleDropdown} className="fa-solid fa-user text-gray-400 text-4xl cursor-pointer" />
            </div>
            {isOpen && (
                <div className="absolute right-0 ml-[200px] z-10 mt-4 w-[200px] rounded-md shadow-lg bg-gray-300 ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <div className='flex justify-center items-center hover:bg-gray-100 hover:scale-110 duration-300'>
                            <i className="fa-regular fa-user text-sm text-slate-400" />
                            <a href="#/" className="block px-4 py-2 text-sm text-gray-700 " role="menuitem">My Profile</a>
                        </div>
                        <div className='flex justify-center items-center hover:bg-gray-100 hover:scale-110 duration-300'>
                            <i className="fa-solid fa-gear text-sm text-slate-400" />
                            <a href="#/" className="block px-4 py-2 text-sm text-gray-700 " role="menuitem">Edit Profile</a>
                        </div>
                        <div className='flex justify-center items-center hover:bg-gray-100 hover:scale-110 duration-300'>
                            <i className="fa-solid fa-right-from-bracket text-sm text-slate-400" />
                            <Link to="/Login" className="block px-4 py-2 text-sm text-gray-700 " role="menuitem">Log In</Link>
                        </div>
                        <div className='flex justify-center items-center hover:bg-gray-100 hover:scale-110 duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
                                <path fill-rule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clip-rule="evenodd" />
                                <path fill-rule="evenodd" d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z" clip-rule="evenodd" />
                            </svg>
                            <Link to="/Signin" className="block px-4 py-2 text-sm text-gray-700 " role="menuitem">Sign In</Link>
                        </div>
                        <div className='flex justify-center items-center hover:bg-gray-100 hover:scale-110 duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
                                <path fill-rule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clip-rule="evenodd" />
                                <path fill-rule="evenodd" d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z" clip-rule="evenodd" />
                            </svg>
                            <Link to="/Admin" className="block px-4 py-2 text-sm text-gray-700 " role="menuitem">Admin Login</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default DropDownMenu;