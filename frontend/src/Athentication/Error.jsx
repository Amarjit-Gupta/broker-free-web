import { useNavigate } from 'react-router';
import error from '../assets/error.png';
const Error = () => {

    const navigate = useNavigate();

    return(
        <div className="border border-red-500 h-106 w-full relative">
            <img src={error} alt="error 404 page" className='absolute top-1/2 left-1/2 -translate-1/2' />
            <button className="text-gray-600 font-medium px-3 py-1 border text-xl cursor-pointer absolute top-[75%] left-1/2 -translate-x-1/2 rounded hover:bg-gray-200" onClick={()=>navigate("/")}>Go back</button>
        </div>
    );
};
export default Error;