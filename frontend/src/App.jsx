import AddData from "./Admin/addData";
import AllData from "./Admin/allData";
import EditData from "./Admin/editData";
import ForgotPassword from "./Athentication/ForgotPassword";
import Login from "./Athentication/Login";
import Navbar from "./Athentication/Navbar";
import Signup from "./Athentication/Signup";
import { BrowserRouter, Routes, Route } from 'react-router'
import AllCustomerData from "./Customer/allCustomerData";
import SingleCustomerData from "./Customer/singleCustomerData";
import Form from "./Customer/form";
import SliderComponent from "./Customer/slider";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<AllCustomerData/>} />
          <Route path={"/form"} element={<Form/>} />
          <Route path={"/add"} element={<AddData/>} />
          <Route path={"/all"} element={<AllData/>} />
          
          <Route path={"/singleCustomerData/:id"} element={<SingleCustomerData/>} />
          <Route path={"/edit/:id"} element={<EditData/>} />
          <Route path={"/forget"} element={<ForgotPassword />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;