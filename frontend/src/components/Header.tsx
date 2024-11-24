import { useRef } from "react";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavLinks, userData } from "../assets/data";
import { useDispatch, useSelector } from "react-redux";
import { activeDarkMode } from "../redux/slice";
import { IRootState } from "../redux/store";
import UserList from "./UserList";

export default function Header() {
  const { role } = userData();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ulRef = useRef<HTMLUListElement>(null);
  const handleClick = () => {
    ulRef.current?.classList.toggle("h-[214px]");
    ulRef.current?.classList.toggle("mt-4");
  };
  const { dark, logged } = useSelector(
    (state: IRootState) => state?.firstSlice
  );

  const handleDarkMode = () => dispatch(activeDarkMode());

  return (
    <>
      {/* Header */}
      <header className="p-2 dark:bg-darkBlueColor dark:text-white">
        <div className="container flex items-center justify-between md:flex-row flex-col gap-y-4">
          <div className="box flex items-center gap-3">
            {logged ? (
              <UserList />
            ) : (
              <>
                <Link to="/SignIn">Sign In</Link>
                <Link to="/SignUp">Sign Up</Link>
              </>
            )}
          </div>
          <div className="text text-center">
            <h1 className="font-bold text-2xl">Grocery Mart</h1>
            <p className="uppercase text-[13px]">online grocery shopping</p>
          </div>
          <div className="buttons flex items-center gap-6">
            <button
              onClick={() => navigate("/Cart")}
              className="relative text-white bg-redColor p-2 rounded-lg text-[24px]"
            >
              <FaCartShopping />
            </button>

            <button
              onClick={handleDarkMode}
              className="text-white bg-redColor p-2 rounded-lg text-[24px]"
            >
              {dark || JSON.parse(localStorage.getItem("dark") || "") ? (
                <FaSun />
              ) : (
                <FaMoon />
              )}
            </button>
          </div>
        </div>
      </header>
      {/* Navbar */}
      <nav className="p-3 bg-blueColor">
        <div className="container flex items-center justify-between md:flex-nowrap flex-wrap">
          <button
            onClick={handleClick}
            className="text-white bg-redColor p-2 rounded-lg text-[24px] md:hidden block"
          >
            <FaBars fontSize={24} />
          </button>
          <ul
            ref={ulRef}
            className="flex md:items-center duration-300 md:mt-0 gap-4 md:w-fit w-full md:flex-row flex-col md:h-fit h-0 overflow-hidden"
          >
            {NavLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`text-[20px] hover:text-[aqua] duration-300 ${
                    pathname === link.path ? "text-[aqua]" : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {role === "admin" && (
              <li>
                <Link
                  to="/Admin"
                  className={`text-[20px] hover:text-[aqua] duration-300 ${
                    pathname === "/Admin" ? "text-[aqua]" : "text-white"
                  }`}
                >
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
