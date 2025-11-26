import { useEffect, useState } from 'react';
import loader from '../assets/loader.gif';
import { ToastContainer, toast } from 'react-toastify';
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router";

const AllData = () => {

    let url = import.meta.env.VITE_URL;
    const [value, setValue] = useState([]);
    const [sort, setSort] = useState("All");
    const [load1, setLoad1] = useState(false);
    const navigate = useNavigate();

    const getAllData = async () => {
        let URL = `${url}/data/getData?`;
        if (sort === "asc") {
            URL += "sort=asc";
        }
        if (sort === "desc") {
            URL += "sort=desc";
        }
        try {
            setLoad1(true);
            let data = await fetch(URL, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });
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
            setLoad1(false);
            toast.error("something went wrong...");
        }
    }

    useEffect(() => {
        getAllData();
    }, [sort]);

    const handleDelete = async (index) => {
        var confirmation = confirm("Are you sure...");
        if (confirmation) {
            try {
                let data = await fetch(`${url}/data/deleteData/${index}`, {
                    method: "delete",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                    }
                });
                let result = await data.json();
                if (result.success) {
                    toast.success(result.message);
                    getAllData();
                }
                else {
                    toast.error(result.message);
                }
            }
            catch (err) {
                toast.error("something went wrong...");
            }
        }
        else {
            toast.error("data not delete...");
        }
    }

    const handleChange = async (e) => {
        try {
            let key = e.target.value;
            if (key) {
                let result = await fetch(`${url}/data/searchAdminData/${key}`, {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                    }
                });
                let data = await result.json();
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
        <div>
            <ToastContainer />
            <h1 className="text-2xl sm:text-3xl text-center mt-3 md:mt-5 underline">My Rooms Details</h1>
            <div className="w-60 flex flex-col gap-2 sm:w-130 m-auto xl:ml-[16.5%] mt-[2%] sm:flex-row justify-between">
                <input type="search" placeholder="Search here..." className="border w-60 h-10 text-xl rounded-xl px-2 bg-gray-50" onChange={handleChange} />
                <select name="" id="" className="border w-60 h-10 text-xl px-1 rounded-xl bg-gray-50  outline-0" value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="">Sort by price</option>
                    <option value="asc">ascending</option>
                    <option value="desc">descending</option>
                </select>
            </div>
            {load1 ? <div className="w-17 h-71 m-auto my-2"><img src={loader} alt="loader" className='w-full h-17' /></div> :
                <div className="w-79 md:w-[665px] xl:w-252 m-auto my-[2%] flex flex-wrap gap-7">
                    {
                        value.length ?
                            value?.map((item, i) => {
                                return (
                                    <div className="border border-gray-300 w-79 p-2 rounded-xl bg-white shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-500" key={item._id}>
                                        <div className="w-full h-50 border border-gray-300 rounded-sm mb-2"><img src={item.url} alt="" className="w-full h-full rounded-t-sm" /></div>
                                        <div className=" text-xl font-medium h-8 px-1 ">Title: <span className="font-normal">{(item?.title).length>16?(item?.title).slice(0,15)+"...":item?.title}</span></div>
                                        <div className=" text-xl font-medium h-8 px-1 ">
                                            Area: <span className="font-normal">{String(item?.area).length>10?String(item?.area).slice(0,9)+"...":item?.area} sq ft</span>
                                        </div>
                                        <div className=" text-xl font-medium h-8 px-1 ">
                                            Rent: <span className="font-normal">₹ {String(item?.rent).length>10?String(item?.rent).slice(0,9)+"...":item?.rent}</span>
                                        </div>
                                        <div className=" text-xl font-medium h-8 px-1 ">
                                            Pincode:  <span className="font-normal">{item?.pincode}</span>
                                        </div>
                                        <div className=" text-xl font-medium h-8 px-1 flex justify-between">
                                            <span>BHK: <span className="font-normal">{item?.bhk}</span></span>
                                        </div>
                                        <div className=" text-xl font-medium h-8 px-1">
                                            Contact No: <span className="font-normal">{item?.contact}</span>
                                        </div>
                                        <div className=" text-xl font-medium h-8 px-1">
                                            Availability: <span className="font-normal">{item?.availability == "Available" ? "Available" : <span className="bg-green-300 px-2 rounded-xl">Booked</span>}</span>
                                        </div>
                                        <div className="text-xl font-medium h-15 px-1  wrap-break-word">
                                            Address: <span className="font-normal">{(item?.address).length>45?(item?.address).slice(0,44)+"...":item?.address}</span>
                                        </div>
                                        <div className="border font-medium h-10 rounded-b-sm px-1 flex justify-around text-3xl">
                                            <button className='text-red-500 cursor-pointer' onClick={() => handleDelete(item._id)}><MdDeleteForever /></button>
                                            <button className='text-green-500 cursor-pointer' onClick={() => navigate(`/edit/${item._id}`)}><BiSolidEdit /></button>
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
    );
};
export default AllData;