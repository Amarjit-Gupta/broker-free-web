import house from '../assets/house.png';
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { GrContactInfo } from "react-icons/gr";
import {Link} from 'react-router';

const Footer = () => {
    return (
        <div className=' bg-gray-200 pb-3'>
            <div className="border border-red-500 p-5 w-full flex justify-around items-center flex-col-reverse gap-3 lg:flex-row">
                <div className="border border-red-500 h-15 md:h-20 w-79 md:w-90 flex items-center justify-between">
                    <div className="border h-full w-15 md:w-20"><img src={house} alt="house-image" className='h-full w-full scale-200' /></div>
                    <div className="border h-13 w-60 md:w-66">
                        <p className='text-xl md:text-2xl text-gray-800'>Find Your Perfect Home</p>
                        <p className='text-[12px] md:text-[14px] text-gray-800'>Explore neighborhods, discover properties</p>
                    </div>
                </div>
                <div className="border border-red-500 w-68"><p className='text-2xl'>Find Your Perfect space</p> <p className=''>Browse verified listings with confidence—your perfect home is just a click away.</p></div>
                <div className="border border-red-500 w-45">
                    <div className="border text-center text-xl text-gray-600 flex justify-around items-center font-medium">Get In Touch <GrContactInfo className='text-2xl' /></div>
                    <div className="border mt-2 text-3xl flex justify-between text-gray-600">
                        <Link to={"#1"}><FaLinkedin className='cursor-pointer hover:-translate-y-0.5 transition-all duration-500' /></Link>
                        <Link to={"#2"}><FaSquareWhatsapp className='cursor-pointer hover:-translate-y-0.5 transition-all duration-500' /></Link>
                        <Link to={"#3"}><FaFacebook className='cursor-pointer hover:-translate-y-0.5 transition-all duration-500' /></Link>
                        <Link to={"#4"}><FaInstagramSquare className='cursor-pointer hover:-translate-y-0.5 transition-all duration-500' /></Link>
                    </div>
                    <div className='border border-red-500 mt-2 text-gray-800'><span className="font-medium">Address:</span> Mumbai, Maharashtra India</div>
                </div>
            </div>
            <p className='text-xl text-center md:text-2xl text-gray-700'>Copyright 2025 © All Right Reserved.</p>
        </div>
    );
};
export default Footer;