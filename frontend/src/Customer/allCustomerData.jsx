import { useEffect, useState } from 'react';
import loader from '../assets/loader.gif';
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { useNavigate } from "react-router";
import SliderComponent from './slider';
import { ToastContainer, toast } from 'react-toastify';

const AllCustomerData = () => {

    let url = import.meta.env.VITE_URL;

    const [value, setValue] = useState([]);
    const [sort, setSort] = useState("All");
    const [load1, setLoad1] = useState(false);

    const navigate = useNavigate();

    const getAllData = async () => {
        try {
            setLoad1(true);
            let URL = `${url}/data/getAllCustomerData?`;
            if (sort === "asc") {
                URL += "sort=asc";
            }
            if (sort === "desc") {
                URL += "sort=desc";
            }
            let data = await fetch(URL);
            let result = await data.json();
            // console.log(result);

            if (result.success) {
                setValue(result.result);
                setLoad1(false);
            }
            else {
                toast.error(result.message);
                setLoad1(false);
            }
        }
        catch (err) {
            toast.error("something went wrong...");
            setLoad1(false);
        }
    }

    useEffect(() => {
        getAllData();
    }, [sort]);

    const handleChange = async (e) => {
        try {
            let key = e.target.value;
            if (key) {
                let result = await fetch(`${url}/data/searchCustomerData/${key}`);
                let data = await result.json();
                // console.log(data);
                if (data.success) {
                    setValue(data.result);
                }
                else {
                    toast.error(result.message);
                }
            }
            else {
                getAllData();
            }
        }
        catch (err) {
            toast.error("something went wrong...");
        }
    }

    return (
        <>
        <ToastContainer />
            <SliderComponent />
            <div className="mt-8 w-full">
                <h1 className="text-2xl sm:text-3xl text-center mt-3 md:mt-5 underline">All Rooms Details</h1>
                <div className="w-60 m-auto xl:ml-[7.5%] flex flex-col gap-2 sm:w-130 mt-[2%] sm:flex-row justify-between ">
                    <input type="search" placeholder="Search here..." className="border w-60 h-10 text-xl rounded px-2 bg-gray-50" onChange={handleChange} />
                    <select name="" id="" className="border w-60 h-10 text-xl px-1 rounded bg-gray-50 outline-0" value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="">Sort by price</option>
                        <option value="asc">ascending</option>
                        <option value="desc">descending</option>
                    </select>
                </div>
                {load1 ? <div className="w-17 h-71 m-auto my-2"><img src={loader} alt="loader" className='w-full h-17' /></div> :
                    <div className="w-79  grid grid-cols-1 gap-5 sm:w-125 sm:grid-cols-2 md:w-190 md:grid-cols-3 lg:w-255 lg:grid-cols-4 xl:w-[1280px] xl:grid-cols-5 m-auto my-[2%] relative">
                        {
                            value.length ?
                                value?.map((item, i) => {
                                    return (
                                        <div className="border border-gray-300 w-79 sm:w-60 p-2 rounded-xl bg-white shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-500" key={item._id}>
                                            <div className="w-full h-40 border rounded-sm mb-2"><img src={item.url} alt="house-image" className="w-full h-full rounded-t-sm" /></div>
                                            <div className=" font-medium h-7 px-1">
                                                Area: <span className="font-normal">{String(item?.area).length>10?String(item?.area).slice(0,9)+"...":item?.area} sq ft</span>
                                            </div>
                                            <div className="  font-medium h-7 px-1">
                                                Rent: <span className="font-normal">₹{String(item?.rent).length>10?String(item?.rent).slice(0,9)+"...":item?.rent}</span>
                                            </div>
                                            <div className="  font-medium h-7 px-1 flex justify-between">
                                                <span>BHK: <span className="font-normal">{item?.bhk}</span></span>
                                            </div>
                                            <div className="  font-medium h-7 px-1">
                                                Availability: <span className="font-normal">{item?.availability == "Available" ? "Available" : <span className="bg-green-300 px-2 rounded-xl">Booked</span>}</span>
                                            </div>
                                            <div className="border border-gray-400 font-medium h-8 rounded-b-sm px-1 flex justify-center text-[18px]">
                                                <button className='text-green-500 cursor-pointer flex justify-center items-center gap-5 h-full w-full' onClick={() => navigate(`/singleCustomerData/${item._id}`)}>See more<LuSquareArrowOutUpRight /></button>
                                            </div>
                                        </div>
                                    );
                                })
                                :
                                <p className='text-2xl sm:text-3xl text-center w-full my-2 font-medium text-gray-600'>Data not found</p>
                        }
                    </div>
                }
            </div>
        </>
    );
};
export default AllCustomerData;