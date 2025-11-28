import { useEffect, useRef, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { Link, useNavigate } from 'react-router';
import { BiLoaderAlt } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    let url = import.meta.env.VITE_URL;

    const [error, setError] = useState(false);
    const [load, setLoad] = useState(false);
    const [otp, setOtp] = useState(new Array(6).fill(""));

    const inputRef = useRef([]);
    let navigate = useNavigate();

    const [start, setStart] = useState(false);
    const [time, setTime] = useState(600);
    const [sendEmail, setSendEmail] = useState(false);
    const [fillOtp, setFillOtp] = useState(false);

    const handleSendOTP = async (event) => {
        event.preventDefault();
        if (!email) {
            setError(true);
            return;
        }
        else if (email.trim()) {
            if (event.type === "click") {
                setStart(true);
                setTime(600);
            }
            try {
                setLoad(true);
                let result = await fetch(`${url}/auth/sendOtp`, {
                    method: "post",
                    body: JSON.stringify({ email }),
                    headers: { "Content-type": "application/json" }
                });
                let data = await result.json();
                if (data.success) {
                    toast.success(data.message);
                    setSendEmail(true);
                    setLoad(false);
                }
                else {
                    toast.error(data.message);
                    setLoad(false);
                }
            }
            catch (err) {
                setLoad(false);
                toast.error("something went wrong...");
            }
        }
        else {
            toast.warn("white space is not allowed...");
        }
    }

    // for Submit OTP 
    const handleChangeOTP = (value, index) => {
        if (isNaN(value)) return;
        let newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < inputRef.current.length - 1) {
            inputRef.current[index + 1].focus();
        }
    }

    const handleKeyDown = (event, index) => {
        if (event.key == "Backspace" && index > 0 && event.target.value == "") {
            inputRef.current[index - 1].focus();
        }
    }

    const handlePaste = (event, index) => {
        const pasteData = event.clipboardData.getData("text").slice(0, 6);
        let sliceData = pasteData.split("");
        let valData = sliceData.every((v) => !isNaN(v) && v !== "");
        if (sliceData.length == 6 && valData) {
            setOtp(sliceData);
            inputRef.current[5].focus();
        }
    }

    const handleSubmitOTP = (event) => {
        event.preventDefault();
        setFillOtp(true);
    }

    // for time

    useEffect(() => {
        if (!start) return;
        let interval = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    setStart(false);
                    return 0;
                }
                else {
                    return (prev - 1);
                }
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [start]);

    let minute = Math.floor(time / 60);
    let second = time % 60;

    // for reste password
    const handleResetPassword = async (event) => {
        event.preventDefault();
        let resetPasswordOtp = otp.join("");
        if (!email || !newPassword || !resetPasswordOtp) {
            setError(true);
            return;
        }
        else if (newPassword.length < 5) {
            toast.warn("Please enter greater than 4 character/digit in password...");
        }
        else if (email.trim() && newPassword.trim() && resetPasswordOtp.trim()) {
            try {
                setLoad(true);
                let result = await fetch(`${url}/auth/resetPassword`, {
                    method: "post",
                    body: JSON.stringify({ email, newPassword, resetPasswordOtp }),
                    headers: { "Content-type": "application/json" }
                });
                let data = await result.json();
                if (data.success) {
                    toast.success(data.message);
                    navigate("/login");
                    setLoad(false);
                }
                else {
                    toast.error(data.message);
                    setLoad(false);
                }
            }
            catch (err) {
                setLoad(false);
                toast.error("something went wrong...");
            }
        }
        else {
            toast.warn("white space is not allowed...");
        }
    }

    useEffect(() => {
        if (sendEmail && !fillOtp) {
            inputRef.current[0].focus();
        }
    }, [sendEmail, fillOtp]);

    useEffect(() => {
        let auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");
        }
    }, []);

    return (
        <>
            <ToastContainer />
            <div className="my-10 lg:my-20 bg-gray-100 flex justify-center items-center">
                <div className="w-79 border border-gray-300 rounded-xl p-4 sm:p-6 sm:w-100 bg-white shadow hover:shadow-xl transition-all duration-500">

                    {/* for email */}
                    {!sendEmail && <><h1 className="text-center text-2xl lg:text-3xl text-gray-600">Reset Password</h1>
                        <h2 className="text-center lg:text-xl text-gray-600 mb-3">Enter Your registered email address</h2>
                        <form onSubmit={handleSendOTP}>
                            <div className="bg-gray-100 border lg:text-xl flex justify-center items-center gap-2 sm:gap-4 rounded p-1 mt-3 sm:mt-5">
                                <MdOutlineMailOutline className="text-2xl lg:text-3xl text-gray-500" /><input type="email" placeholder="Enter Email ID..." className="focus:outline-0 w-[75%]" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            {error && !email && <p className="ml-1 text-red-500">Please Enter Email...</p>}
                            <div className="bg-gray-100 border lg:text-xl flex justify-center items-center gap-4 rounded p-1 hover:bg-gray-200 mt-3 sm:mt-5">
                                {load ?
                                    <button className="flex justify-center items-center gap-5 h-full w-full disabled:opacity-50 disabled:cursor-not-allowed" disabled={load}>Sending...<BiLoaderAlt className="text-xl rotate-icon" /></button>
                                    :
                                    <button type="submit" className="w-full h-full cursor-pointer">Send OTP</button>
                                }
                            </div>
                        </form>
                        <p className="mt-2 ml-1 lg:text-xl mb-1 txt-red-500"> <Link to={"/login"} className="text-red-500 underline sm:text-xl font-medium">Back to Login</Link></p></>}

                    {/* for otp */}
                    {sendEmail && !fillOtp && <><h1 className="text-center text-2xl lg:text-3xl text-gray-600">Reset Password OTP</h1>
                        <h2 className="text-center text-gray-600 mb-3 text-[15px]">Enter the 6-digit code sent to your email</h2>
                        <form onSubmit={handleSubmitOTP}>
                            <div className="flex justify-between">
                                {otp?.map((v, index) => {
                                    return (
                                        <input
                                            key={index}
                                            className="border h-10 w-10 text-2xl sm:h-12 sm:w-12 sm:text-3xl rounded text-center"
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={'1'}
                                            value={otp[index]}
                                            onChange={(e) => handleChangeOTP(e.target.value, index)}
                                            ref={(input) => inputRef.current[index] = input}
                                            onKeyDown={(event) => handleKeyDown(event, index)}
                                            onPaste={(event) => handlePaste(event, index)}
                                        />
                                    )
                                })}
                            </div>
                            <div className="bg-gray-100 border lg:text-xl flex justify-center items-center gap-4 rounded p-1 hover:bg-gray-200 mt-3 sm:mt-5">
                                <button className="h-full w-full rounded-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled={!otp.every((v) => v !== "")}>Submit OTP</button>
                            </div>
                        </form>
                        <div className="mt-3 mb-1 flex justify-between items-center lg:text-xl px-1">
                            <span className="txt-red-500"><Link to={"/login"} className="text-red-500 underline lg:text-xl font-medium">Back to Login</Link></span>
                            <div> {start ? `Resend In: ${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}` : <button className="cursor-pointer" onClick={handleSendOTP}>Resent OTP</button>}</div>
                        </div></>}

                    {/* for reset password */}
                    {sendEmail && fillOtp && <>
                        <h1 className="text-center text-2xl lg:text-3xl text-gray-600">New Password</h1>
                        <h2 className="text-center lg:text-xl text-gray-600 mb-3">Enter the new password below</h2>
                        <form onSubmit={handleResetPassword}>
                            <div className="bg-gray-100 border lg:text-xl flex justify-center items-center gap-2 sm:gap-4 rounded p-1 mt-3 sm:mt-5">
                                <TbLockPassword className="text-2xl lg:text-3xl text-gray-500" /><input type="password" placeholder="Enter Password..." className="focus:outline-0 w-[75%]" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            {error && !newPassword && <p className="ml-1 text-red-500">Please Enter Password...</p>}
                            <div className="bg-gray-100 border lg:text-xl flex justify-center items-center gap-4 rounded p-1 hover:bg-gray-200 mt-3 sm:mt-5">
                                {load ?
                                    <button className="flex justify-center items-center gap-5 h-full w-full disabled:opacity-50 disabled:cursor-not-allowed" disabled={load}>Reseting...<BiLoaderAlt className="text-xl rotate-icon" /></button>
                                    :
                                    <button type="submit" className="w-full h-full cursor-pointer">Reset Password</button>
                                }
                            </div>
                        </form>
                        <p className="mt-2 ml-1 lg:text-xl mb-1 txt-red-500"><Link to={"/login"} className="text-red-500 underline font-medium">Back to Login</Link></p>
                    </>}
                </div>
            </div>
        </>
    );
};
export default ForgotPassword;