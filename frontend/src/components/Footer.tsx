import { Link } from "react-router-dom";
import { footerCategory, footerContact, footerInfo } from "../assets/data";
import { FaAngleRight, FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <section id="newsletter" className="py-12 bg-blueColor">
        <div className="container grid gap-4 md:grid-cols-2 grid-cols-1 items-center">
          <div className="col md:text-start text-center">
            <h2 className="text-white mb-2 font-bold text-4xl">Newsletter</h2>
            <p className="text-gray-400">
              Excepteur sint occaecat cupidatat non proident, sunt.
            </p>
          </div>
          <div className="col">
            <form
              action="#"
              className="flex items-center gap-3 sm:flex-row flex-col"
            >
              <input
                type="text"
                placeholder="Email"
                className="border-0 outline-0 py-2 px-4 rounded-full grow"
              />
              <button
                type="submit"
                className=" rounded-full bg-redColor py-2 px-4 text-white w-[100px] hover:bg-darkBlueColor duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
      <footer
        className="py-16 dark:bg-darkBlueColor dark:text-white"
        id="footer-cols"
      >
        <div className="container grid gap-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
          {/* First Col */}
          <div className="col">
            <h3>contact</h3>
            <ul>
              {footerContact.map((value, index) => (
                <li key={index}>
                  <value.icon /> {value.text}
                </li>
              ))}
            </ul>
          </div>
          {/* Second Col */}
          <div className="col">
            <h3>information</h3>
            <ul>
              {footerInfo.map((value, index) => (
                <li key={index}>
                  <Link to="/">
                    <FaAngleRight /> {value}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Third Col */}
          <div className="col">
            <h3>category</h3>
            <ul>
              {footerCategory.map((value, index) => (
                <li key={index}>
                  <Link to="/">
                    <FaAngleRight /> {value}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Fourth Col */}
          <div className="col">
            <h3>profile</h3>
            <ul>
              <li>
                <Link to="/">
                  <FaAngleRight /> Home
                </Link>
              </li>
              <li>
                <Link to="/">
                  <FaAngleRight /> Today's Deals
                </Link>
              </li>
            </ul>
            <h4 className="my-4 text-[20px]">Follow Me</h4>
            <div className="my-accounts text-2xl flex items-center gap-4">
              <Link to="https://www.linkedin.com/in/ahmad-mayallo-86944b21b/">
                <FaLinkedinIn />
              </Link>
              <Link to="https://github.com/Ahmad-Mayallo-2002">
                <FaGithub />
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <footer className="border-t p-4 text-center font-[500] text-xl dark:bg-darkBlueColor dark:text-white">
        &copy; 2024 Grocery Mart, All Rights Reserved Design By Ahmad Mayallo
      </footer>
    </>
  );
}
