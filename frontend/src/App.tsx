import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Error from "./pages/Error/Error";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Product from "./pages/Products/Product";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Home from "./pages/Home/Home";
import Landing from "./components/Landing";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import { useSelector } from "react-redux";
import { IRootState } from "./redux/store";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/Order/Order";
import Admin from "./pages/Admin/Admin";
import AdminHomePage from "./components/AdminHomePage";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminCategories from "./pages/Admin/AdminCategories";
import AdminCountries from "./pages/Admin/AdminCountries";
import AdminAddProduct from "./pages/Admin/AdminAddProduct.tsx";

function App() {
  const dark: boolean = useSelector(
    (state: IRootState) => state.firstSlice.dark
  );
  const isDark = () => {
    if (dark || JSON.parse(localStorage.getItem("dark") || "false")) {
      return "dark";
    } else {
      return "";
    }
  };
  return (
    <>
      <div id="darkMode" className={isDark()}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/" element={<Landing />} />
              <Route path="/About" element={<About />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Products" element={<Product />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path="/Products/:id" element={<SingleProduct />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Order" element={<Order />} />
              <Route path="/Admin" element={<Admin />}>
                <Route path="/Admin" element={<AdminHomePage />} />
                <Route path="/Admin/Users" element={<AdminUsers />} />
                <Route path="/Admin/Products" element={<AdminProducts />} />
                <Route path="/Admin/Categories" element={<AdminCategories />} />
                <Route path="/Admin/Countries" element={<AdminCountries />} />
                <Route
                  path="/Admin/AdminAddProduct"
                  element={<AdminAddProduct />}
                />
              </Route>
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
