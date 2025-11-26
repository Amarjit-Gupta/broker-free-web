import AddData from "./Admin/addData";
import AllData from "./Admin/allData";
import EditData from "./Admin/editData";
import ForgotPassword from "./Athentication/ForgotPassword";
import Login from "./Athentication/Login";
import Signup from "./Athentication/Signup";
import AllCustomerData from "./Customer/allCustomerData";
import SingleCustomerData from "./Customer/singleCustomerData";
import About from "./component/AboutUs";
import ContactUs from "./component/ContactUs";
import Error from "./component/Error";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router';
import PrivateComponent from "./component/PrivateComponent";
import { useEffect, useState } from "react";
import loader1 from './assets/loader1.gif'

const App = () => {

  const [mainLoader,setMainLoader] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setMainLoader(false);
    },2000);
  },[]);

  return (
    <>
    {mainLoader?<div className="h-[100vh] w-full fixed bg-black z-50">
      <img src={loader1} alt="loader..." className="h-35 w-45 absolute top-1/2 left-1/2 -translate-1/2" />
    </div>:""}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<AllCustomerData />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/contact"} element={<ContactUs />} />
          <Route path={"/singleCustomerData/:id"} element={<SingleCustomerData />} />
          <Route path={"/forget"} element={<ForgotPassword />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route element={<PrivateComponent />}>
            <Route path={"/add"} element={<AddData />} />
            <Route path={"/myRoom"} element={<AllData />} />
            <Route path={"/edit/:id"} element={<EditData />} />
          </Route>
          <Route path={"*"} element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};
export default App;