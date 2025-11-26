import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { BiLoaderAlt } from "react-icons/bi";

const ContactUs = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [load, setLoad] = useState(false);

    const [error, setError] = useState(false);

    let url = import.meta.env.VITE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            setError(true);
            return;
        }
        else if (name.trim() && email.trim() && message.trim()) {
            try {
                setLoad(true);
                let result = await fetch(`${url}/data/contactMe`, {
                    method: "post",
                    body: JSON.stringify({ name, email, message }),
                    headers: { "Content-type": "application/json" }
                });
                let data = await result.json();
                // console.log(data);
                if (data.success) {
                    toast.success(data.message);
                    setLoad(false);
                    setName("");
                    setEmail("");
                    setMessage("");
                }
                else {
                    toast.error(data.message);
                    setLoad(false);
                }
            }
            catch (err) {
                toast.error("something went wrong...");
                setLoad(false);
            }
        }
        else {
            toast.warn("white space is not allowed...");
        }
    }

    return (
        <>
            <ToastContainer />
            <div className=" my-12">
                <p className="text-center text-3xl text-gray-500 font-medium">Contact Us</p>
                <form onSubmit={handleSubmit}>
                    <div className="w-79 sm:w-113 m-auto  my-5">
                        <div className="border border-gray-500 h-10 rounded">
                            <input type="text" placeholder="Enter Name..." className="w-full h-full text-xl px-2 bg-gray-100 hover:bg-gray-200 rounded" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        {error && !name && <p className="ml-1 text-red-500">Please Enter name...</p>}
                        <div className="border border-gray-500 h-10 rounded mt-4 sm:mt-6">
                            <input type="email" placeholder="Enter Email Id..." className="w-full h-full text-xl px-2 bg-gray-100 hover:bg-gray-200 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        {error && !email && <p className="ml-1 text-red-500">Please Enter Email Id...</p>}
                        <div className="border border-gray-500 h-25 rounded mt-4 sm:mt-6">
                            <textarea name="" id="" placeholder="Enter message..." className="w-full h-full text-xl px-2 resize-none bg-gray-100 hover:bg-gray-200 rounded" value={message} onChange={(e) => setMessage(e.target.value)} ></textarea>
                        </div>
                        {error && !message && <p className="ml-1 text-red-500">Please Enter message...</p>}
                        <div className="border border-gray-500 h-10 rounded mt-4 sm:mt-6 bg-gray-100 hover:bg-gray-200">
                            {load ?
                                <button className="flex justify-center items-center gap-5 h-full w-full disabled:opacity-50 disabled:cursor-not-allowed" disabled={load}>Submit in...<BiLoaderAlt className="text-xl rotate-icon" /></button>
                                :
                                <button type="submit" className="w-full h-full cursor-pointer">Submit</button>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
export default ContactUs;
