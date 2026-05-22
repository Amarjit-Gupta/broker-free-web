import bg from "../assets/about-bg.jpg";
import { FaShieldAlt } from "react-icons/fa";
import { IoMdHeadset } from "react-icons/io";
import { PiCalendarDotsBold } from "react-icons/pi";

const About = () => {
    return (
        <div>
            <div className="h-62 md:h-88 w-full px-5 bg-cover bg-center relative" style={{backgroundImage: `url(${bg})`}}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white w-79 md:w-160 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold">Your New Home Journey Starts Here</h1>
                    <p className="mt-3 text-sm md:text-base">
                        Find thoughtfully curated homes, modern amenities, and spaces designed for
                        comfort — all in one place, to help you choose a home that truly fits
                        your lifestyle.
                    </p>
                </div>
            </div>
            <div className="w-full flex justify-center px-5 py-10">
                <div className="max-w-2xl text-center">
                    <h2 className="text-3xl font-bold mb-3">Our Mission</h2>
                    <p className="text-gray-700 text-base leading-relaxed">
                        Our mission is to simplify the home-finding journey by offering reliable listings,
                        trusted guidance, and thoughtfully designed experiences — so you can discover a space
                        that feels secure, comfortable, and truly your own.
                    </p>
                </div>
            </div>
            <div className=" flex flex-wrap w-70 gap-7 md:w-148 lg:w-225 m-auto mb-7">
                <div className="border border-gray-300 py-3 w-70 bg-white rounded-xl shadow hover:shadow-xl transition-all duration-500">
                    <div className="text-5xl text-gray-500 my-2 h-13 w-13 m-auto"><FaShieldAlt /></div>
                    <div className="text-center">
                        <p className="text-2xl text-gray-800 font-medium">Verified Listings:</p>
                        <p>Authentic Photos & details</p>
                    </div>
                </div>
                <div className="border border-gray-300 py-3 w-70 bg-white rounded-xl shadow hover:shadow-xl transition-all duration-500">
                    <div className="text-5xl text-gray-500 my-2 h-13 w-13 m-auto"><PiCalendarDotsBold /></div>
                    <div className="text-center">
                        <p className="text-2xl text-gray-800 font-medium">Easy Booking:</p>
                        <p>Secure your home in a few clicks</p>
                    </div>
                </div>
                <div className="border border-gray-300 py-3 w-70 bg-white rounded-xl shadow hover:shadow-xl transition-all duration-500">
                    <div className="text-5xl text-gray-500 my-2 h-13 w-13 m-auto"><IoMdHeadset /></div>
                    <div className="text-center">
                        <p className="text-2xl text-gray-800 font-medium">24/7 Support:</p>
                        <p>Dedicated assistance anytime</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
