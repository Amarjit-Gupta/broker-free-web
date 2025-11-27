import { Link, useNavigate } from 'react-router';
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { useState } from 'react';
const Navbar = () => {

    const [menu, setMenu] = useState(false);

    let auth = localStorage.getItem("user");

    let userName = auth ? JSON.parse(auth) : "";
    let uname = userName ? (userName.name).slice(0, 1) : "";

    const navigate = useNavigate();

    const handleLogout = () => {
        setMenu(false);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div className="h-20 lg:h-25 w-full bg-gray-100 sticky top-0 left-0 shadow flex justify-between items-center px-7 z-40">
            <p className="text-gray-700 font-medium text-2xl lg:text-3xl">Rental Hub</p>
            <button className='border p-1 rounded block lg:hidden text-xl' onClick={() => setMenu(!menu)}>{menu ? <RxCross2 /> : <RxHamburgerMenu />}</button>
            {auth ?
                <div className={`flex text-xl gap-13 fixed flex-col bg-gray-100 top-20 w-full z-40 items-center pt-5 h-full lg:flex-row lg:h-8 lg:pt-0 lg:w-167 lg:static lg:top-0 transition-all duration-500 ${menu ? "right-0" : "-right-[100%]"}`}>
                    <div><Link to={"/"} onClick={() => setMenu(false)}>Home</Link></div>
                    <div><Link to={"/about"} onClick={() => setMenu(false)}>About Us</Link></div>
                    <div><Link to={"/contact"} onClick={() => setMenu(false)}>Contact Us</Link></div>
                    <div className='relative drop-main cursor-pointer'>dashboard
                        <div className='bg-gray-200 absolute w-30 text-center rounded drop-child'>
                            <p className='py-1'><Link to={"/myRoom"} onClick={() => setMenu(false)}>My Rooms</Link></p>
                            <p className='py-1'><Link to={"/add"} onClick={() => setMenu(false)}>Add Room</Link></p>
                        </div>
                    </div>
                    <div className='flex flex-col lg:flex-row items-center'><button className='border px-3 rounded bg-white hover:bg-gray-100' onClick={handleLogout}>logout</button> <div className="border h-9 w-9 flex justify-center items-center rounded-full mt-5 lg:mt-0 ml-0 lg:ml-2 text-xl font-medium bg-black text-white">{uname}</div> </div>
                </div>
                :
                <div className={`flex text-xl gap-13 fixed flex-col bg-gray-100 top-20 w-full z-50 items-center pt-5 h-full lg:flex-row lg:h-8 lg:pt-0 lg:w-152 lg:static lg:top-0 transition-all duration-500 ${menu ? "right-0" : "-right-[100%]"}`}>
                    <div><Link to={"/"} onClick={() => setMenu(false)}>Home</Link></div>
                    <div><Link to={"/about"} onClick={() => setMenu(false)}>About Us</Link></div>
                    <div><Link to={"/contact"} onClick={() => setMenu(false)}>Contact Us</Link></div>
                    <div className='relative drop-main cursor-pointer'>dashboard
                        <div className='bg-gray-200 absolute w-30 text-center rounded drop-child'>
                            <p className='py-1'><Link to={"/myRoom"} onClick={() => setMenu(false)}>My Rooms</Link></p>
                            <p className='py-1'><Link to={"/add"} onClick={() => setMenu(false)}>Add Room</Link></p>
                        </div>
                    </div>
                    <div><button className='border px-3 rounded bg-white hover:bg-gray-100'><Link to={"/login"} onClick={() => setMenu(false)}>login</Link></button></div>
                </div>
            }
        </div>
    );
};
export default Navbar;