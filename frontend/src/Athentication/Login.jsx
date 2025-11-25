import { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { Link, useNavigate } from "react-router";
import { BiLoaderAlt } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
const Login = () => {

    const [inputValue, setInputValue] = useState({
        email: "",
        password: ""
    });

    let url = import.meta.env.VITE_URL;

    let navigate = useNavigate();

    const [error, setError] = useState(false);
    const [load, setLoad] = useState(false);

    const handleChange = (event) => {
        setInputValue({ ...inputValue, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!inputValue.email || !inputValue.password) {
            setError(true);
            return;
        }
        else if (inputValue.email.trim() && inputValue.password.trim()) {
            try {
                setLoad(true);
                let result = await fetch(`${url}/auth/login`, {
                    method: "post",
                    body: JSON.stringify(inputValue),
                    headers: { "Content-type": "application/json" }
                });
                let data = await result.json();
                //console.log(data);
                if (data.success) {
                    console.log(data.auth);
                    console.log(data.user);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", JSON.stringify(data.auth));
                    toast.success(data.message);
                    navigate("/");
                    setLoad(false);
                }
                else {
                    toast.error(data.message);
                    setLoad(false);
                }
            }
            catch (err) {
                console.log(err);
                toast.error("something went wrong...");
                setLoad(false);
            }
        }
        else {
            toast.warn("white space is not allowed...");
        }
    }

    return (
        <><ToastContainer />
            <div className="h-[calc(100vh-100px)] flex justify-center items-center">
                <div className="w-79 border border-gray-300 rounded-xl p-4 sm:p-6 sm:w-100 bg-white shadow hover:shadow-xl transition-all duration-500">
                    <h1 className="text-center text-3xl text-gray-600">Login here</h1>
                    <h2 className="text-center text-xl text-gray-600 mb-3 sm:text-2xl">Login to your account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="bg-gray-100 border text-xl flex justify-center items-center gap-2 sm:gap-4 rounded p-1 mt-3 sm:mt-5">
                            <MdOutlineMailOutline className="text-3xl text-gray-500" /><input type="email" placeholder="Enter Email ID..." className="focus:outline-0 w-[75%]" name="email" value={inputValue.email} onChange={handleChange} />
                        </div>
                        {error && !inputValue.email && <p className="ml-1 text-red-500">Please Enter Email...</p>}

                        <div className="bg-gray-100 border text-xl flex justify-center items-center gap-2 sm:gap-4 rounded p-1 mt-3 sm:mt-5">
                            <TbLockPassword className="text-3xl text-gray-500" /><input type="password" placeholder="Enter Password..." className="focus:outline-0 w-[75%]" name="password" value={inputValue.password} onChange={handleChange} />
                        </div>
                        {error && !inputValue.password && <p className="ml-1 text-red-500">Please Enter Password...</p>}

                        <div className="bg-gray-100 border text-xl flex justify-center items-center gap-4 rounded p-1 hover:bg-gray-200 mt-3 sm:mt-5">


                            {load ?
                                <button className="flex justify-center items-center gap-5 h-full w-full disabled:opacity-50 disabled:cursor-not-allowed" disabled={load}>Login in...<BiLoaderAlt className="text-xl rotate-icon" /></button>
                                :
                                <button type="submit" className="w-full h-full cursor-pointer">Login</button>
                            }


                        </div>
                    </form>

                    <p className="mt-2"><Link to={"/forget"} className="sm:text-xl text-red-500 underline font-medium">forgot password?</Link></p>
                    <p className="text-center mt-2 mb-1 sm:text-xl text-gray-700">Don't have an account? <Link to={"/signup"} className="text-red-500 underline font-medium">Signup here</Link></p>
                </div>
            </div>
        </>
    );
};
export default Login;