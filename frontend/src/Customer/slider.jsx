import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slide.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';
import slide4 from '../assets/slide4.jpg';
import slide5 from '../assets/slide5.jpg';
import slide6 from '../assets/slide6.jpg';


const SliderComponent = () => {

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className="h-50 md:h-95 w-full">
            <div className="slider-container">
                <Slider {...settings}>
                   <div className="slide1"><img src={slide1} alt="" className="w-full h-full object-cover" /></div>
                   <div className="slide2"><img src={slide2} alt="" className="w-full h-full object-cover" /></div>
                   <div className="slide3"><img src={slide3} alt="" className="w-full h-full object-cover" /></div>
                   <div className="slide4"><img src={slide4} alt="" className="w-full h-full object-cover" /></div>
                   <div className="slide5"><img src={slide5} alt="" className="w-full h-full object-cover" /></div>
                   <div className="slide6"><img src={slide6} alt="" className="w-full h-full object-cover" /></div>
                </Slider>
            </div>
        </div>
    );
};
export default SliderComponent;



const NextArrow = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="custom-next"
            style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                color: "white",
                padding: "8px",
                borderRadius: "50%",
            }}
        >
            <FaArrowRight />
        </button>
    );
};

const PrevArrow = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="custom-prev"
            style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                color: "white",
                padding: "8px",
                borderRadius: "50%",
            }}
        >
            <FaArrowLeft />
        </button>
    );
};