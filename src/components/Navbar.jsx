import React from 'react'

const Navbar = () => {
  return (
    <>
    <header>
        <nav className="flex justify-between bg-violet-900 text-white py-3">
            <div className="logo mx-9">
                <span className="font-bold">i-Task</span>
            </div>
            <ul className="flex gap-9 mx-9">
                <li className="cursor-pointer hover:font-bold transition-all">Home</li>
                <li className="cursor-pointer hover:font-bold transition-all" >Your Tasks</li>
            </ul>
        </nav>
    </header>
    </>
  )
}

export default Navbar
