import React, { useState } from 'react'
import logo from '../Images/shopping-cart.png'
import DropdownMenu from './DropdownMenu'

export default function Navbar() {

    const naviget = [
        { Name: 'Hollywood', href: '#/' },
        { Name: 'Bollywood', href: '#/' },
        { Name: 'South', href: '#/' },
        { Name: 'Anime', href: '#/' },
    ]

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [menu, setMenu] = useState(false)

    const handleChange = () => {
        setMenu(!menu)
    }


    return (
        <div>

            <nav className='fixed w-full flex justify-between items-center text-black py-6 px-8 md:px- h-[70px]  bg-white drop-shadow-md'>

                <a href="#/">
                    <img className='w-[50px] hover:scale-105 transition-all cursor-pointer' src={logo} alt="logo" />
                </a>

                <ul className='hidden xl:flex items-center gap-12 font-semibold text-base'>

                    {
                        naviget.map((value,key) => (
                            <li key={key}><a className='p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer' href={value.href}>{value.Name}</a></li>
                        ))
                    }
                </ul>

                <div className='relative hidden sm:flex items-center justify-center gap-3'>
                    <i className="fa-solid fa-magnifying-glass absolute left-3 text-2xl text-gray-500" />
                    <input className='py-2 pl-10 rounded-xl border-2 border-blue-300 focus:bg-slate-100 focus:outline-sky-500' type="text" placeholder='Search...' />


                    <div className='flex justify-center items-center gap-4'>
                        {/* <i className="fa-solid fa-user text-2xl px-2 py-1 bg-gray-300 rounded-full hover:ring-2 ring-black" /> */}
                        <DropdownMenu />
                        <div onClick={() => setIsMenuOpen(!isMenuOpen)}>

                            {
                                menu ? (<i className="fa-solid fa-xmark block text-5xl cursor-pointer xl:hidden"
                                    onClick={handleChange} />) :
                                    (<i className="fa-solid fa-bars block text-5xl cursor-pointer xl:hidden"
                                        onClick={handleChange} />)
                            }

                        </div>
                    </div>


                </div>







                <div className={`absolute xl:hidden  top-[70px] left-0 w-full bg-white flex flex-col items-center gap-6 
                pb-5 font-semibold text-lg transform transition-transform ${isMenuOpen ? "opacity-100" : "opacity-0"}`}>

                    {
                        naviget.map((value,key) => (
                            <div key={key}><a className='p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer' href={value.href}>{value.Name}</a></div>
                        ))
                    }

                </div>


            </nav>
        </div>
    )
}
