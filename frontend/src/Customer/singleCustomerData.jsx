import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router";
import loader from '../assets/loader.gif';
import { MdPermIdentity } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { LiaAddressCardSolid } from "react-icons/lia";
import { RxCross2 } from "react-icons/rx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BiLoaderAlt } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';

const SingleCustomerData = () => {

    let url = import.meta.env.VITE_URL;

    const [title, setTitle] = useState("");
    const [area, setArea] = useState("");
    const [rent, setRent] = useState("");
    const [pincode, setPincode] = useState("");
    const [bhk, setBhk] = useState("");
    const [contact, setContact] = useState("");
    const [availability, setAvailability] = useState("");
    const [address, setAddress] = useState("");
    const [fileurl, setFileurl] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [dataId, setDataId] = useState("");

    const navigate = useNavigate();

    const [load, setLoad] = useState(false);
    const [show, setShow] = useState(false);
    const [load1, setLoad1] = useState(false);

    const [inputValue, setInputValue] = useState({
        name: "",
        phone: "",
        address: ""
    });

    const [error, setError] = useState(false);

    let id = useParams();
    let index = id.id;

    const getSingleData = async () => {
        try {
            setLoad1(true);
            let data = await fetch(`${url}/data/getSingleCustomerData/${index}`);
            let result = await data.json();
            // console.log(result);

            if (result.success) {
                let d1 = result?.result;
                setTitle(d1?.title);
                setArea(d1?.area);
                setRent(d1?.rent);
                setPincode(d1?.pincode);
                setBhk(d1?.bhk);
                setContact(d1?.contact);
                setAvailability(d1?.availability);
                setAddress(d1?.address);
                setFileurl(d1?.url);
                setUserEmail(d1?.userEmail);
                setDataId(d1?._id);
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
        getSingleData();
    }, []);

    const handleChange = (event) => {
        setInputValue({ ...inputValue, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!inputValue.name || !inputValue.phone || !inputValue.address) {
            setError(true);
            return;
        }
        else if (inputValue.phone.length !== 10) {
            toast.warn("please enter 10 digit in contact no...");
            return;
        }
        else if (isNaN(inputValue.phone)) {
            toast.warn("please enter only number in contact no...");
            return;
        }
        else if (inputValue.name.trim() && inputValue.phone.trim() && inputValue.address.trim()) {
            try {
                setLoad(true);
                let name = inputValue.name;
                let phone = inputValue.phone;
                let address = inputValue.address;

                let result = await fetch(`${url}/data/sendMail`, {
                    method: "post",
                    body: JSON.stringify({ name, phone, address, userEmail, dataId }),
                    headers: { "Content-type": "application/json" }
                });
                let data = await result.json();
                if (data.success) {
                alert(data.message);
                    navigate("/");
                    setShow(false);
                    setLoad(false);
                }
                else {
                    toast.error(data.message);
                    setShow(false);
                    setLoad(false);
                }
            }
            catch (err) {
                toast.error("something went wrong...");
                setShow(false);
                setLoad(false);
            }
        }
        else {
            toast.warn("white space is not allowed...");
        }
    }

    return (
        <div className="border">
            <ToastContainer />
            <h1 className="text-2xl sm:text-3xl text-center mt-3 md:mt-5 underline">Single Property Details</h1>
            {load1 ? <div className="w-17 h-88 m-auto my-2"><img src={loader} alt="loader" className='w-full h-17' /></div> :
                <div className='my-[2%]'>
                    <div className="border border-red-500 lg:w-200 lg:flex-row p-2 rounded-xl m-auto flex justify-between flex-col w-79 bg-white shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
                        <div className="w-74.5 lg:w-80 h-50 lg:h-80 border border-gray-500 rounded-sm">{fileurl && <img src={fileurl} alt="" className="w-full h-full rounded-sm" />}</div>
                        <div className="mt-1 lg:mt-0 w-74 lg:w-110  border border-red-500 flex flex-col gap-1">
                            <div className="border text-xl font-medium h-8 px-1">Title: <span className="font-normal"> {(title).length>16?(title).slice(0,15)+"...":title}</span></div>
                            <div className="border text-xl font-medium h-8 px-1">
                                Area: <span className="font-normal">{String(area).length>10?String(area).slice(0,9)+"...":area} sq ft</span>
                            </div>
                            <div className="border text-xl font-medium h-8 px-1">
                                Rent: <span className="font-normal">₹ {String(rent).length>10?String(rent).slice(0,9)+"...":rent}</span>
                            </div>
                            <div className="border text-xl font-medium h-8 px-1">
                                Pincode:  <span className="font-normal">{pincode}</span>
                            </div>
                            <div className="border text-xl font-medium h-8 px-1 flex justify-between">
                                <span>BHK: <span className="font-normal">{bhk}</span></span>
                            </div>
                            <div className="border text-xl font-medium h-8 px-1">
                                Contact No: <span className="font-normal">{contact}</span>
                            </div>
                            <div className="border text-xl font-medium h-8 px-1">
                                Availability: <span className="font-normal">{availability == "Available" ? "Available" : <span className="bg-green-300 px-2 rounded-xl">Booked</span>}</span>
                            </div>
                            <div className="border text-xl font-medium h-15 px-1">
                                Address: <span className="font-normal">{(address).length>45?(address).slice(0,44)+"...":address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="border font-medium rounded text-xl lg:w-200 m-auto mt-[1%] flex justify-between flex-col-reverse lg:flex-row w-79 gap-1">
                        <div className="border text-gray-700 w-70 flex items-center justify-center gap-4 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded py-1 m-auto lg:m-0" onClick={() => navigate("/")}><FaArrowLeftLong />Go Back</div>
                        <div className="border text-gray-700 w-40 bg-green-200 hover:bg-green-300 flex justify-center items-center rounded py-1 m-auto lg:m-0" > {availability == "Available" ? <button className='cursor-pointer h-full w-full' onClick={() => setShow(true)}>Book Now</button> : <button className='text-red-400 cursor-not-allowed h-full w-full' disabled={true}>Unavailable</button>}</div>
                    </div>
                </div>
            }

            <div className={`h-screen w-full bg-gray-500/50 fixed left-0 flex justify-center items-center ${show ? "top-0" : "x1"}`}>
                <div className="w-79 border border-gray-300 rounded-xl p-4 sm:pt-6 sm:pb-8 sm:px-6 sm:w-100 bg-white">
                    <button className="border float-right p-1 font-medium rounded cursor-pointer" onClick={() => setShow(false)}><RxCross2 /></button>
                    <h2 className="text-center text-xl text-gray-600 mb-3 sm:text-2xl">Fill Details</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="bg-gray-100 border border-gray-500 text-xl flex justify-center items-center gap-2 sm:gap-4 rounded p-1 mt-3 sm:mt-5">
                            <MdPermIdentity className="text-3xl text-gray-700" /><input type="text" placeholder="Enter Name..." className="focus:outline-0 w-[75%]" name="name" value={inputValue.name} onChange={handleChange} />
                        </div>
                        {error && !inputValue.name && <p className="ml-1 text-red-500">Please Enter Name...</p>}
                        <div className="bg-gray-100 border border-gray-500 text-xl flex justify-center items-center gap-2 sm:gap-4 rounded p-1 mt-3 sm:mt-5">
                            <IoIosContact className="text-3xl text-gray-700" /><input type="tel" placeholder="Enter Phone No..." className="focus:outline-0 w-[75%]" name="phone" value={inputValue.phone} onChange={handleChange} />
                        </div>
                        {error && !inputValue.phone && <p className="ml-1 text-red-500">Please Enter Phone No...</p>}
                        <div className="bg-gray-100 border border-gray-500 text-xl flex justify-center items-center gap-2 sm:gap-4 rounded p-1 mt-3 sm:mt-5">
                            <LiaAddressCardSolid className="text-3xl text-gray-700" /><textarea className="w-[75%] resize-none outline-0" name="address" value={inputValue.address} onChange={handleChange} placeholder="Enter Your Address..."></textarea>
                        </div>
                        {error && !inputValue.address && <p className="ml-1 text-red-500">Please Enter Address...</p>}
                        <div className="bg-gray-100 border border-gray-500 text-xl flex justify-center items-center gap-4 rounded p-1 hover:bg-gray-200 mt-3 sm:mt-5">
                            {load ?
                                <button className="flex justify-center items-center gap-5 h-full w-full disabled:opacity-50 disabled:cursor-not-allowed" disabled={load}>Submit in...<BiLoaderAlt className="text-xl rotate-icon" /></button>
                                :
                                <button type="submit" className="w-full h-full cursor-pointer">Submit</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default SingleCustomerData;