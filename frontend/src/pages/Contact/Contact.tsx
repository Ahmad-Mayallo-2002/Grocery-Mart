import { FaGithub, FaLinkedinIn, FaPhone } from "react-icons/fa";
import { MdLocationOn, MdMail } from "react-icons/md";

export default function Contact() {
  return (
    <>
      {/* Hero Section */}
      <div id="hero" className="h-[400px] flex items-center justify-center">
        <h2 className="text-white font-bold text-5xl">Contact Us</h2>
      </div>
      {/* Content */}
      <div id="content" className="py-16 dark:bg-darkBlueColor dark:text-white">
        <div className="container grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="col">
            <h3 className="font-bold text-4xl">Contact Us</h3>
            <p className="text-gray-500 leading-[2] my-5">
              We enjoy discussing new projects and design challenges. Please
              share as much info, as possible so we can get the most out of our
              first catch-up.
            </p>
            <ul className="grid gap-4 text-gray-500">
              <li className="flex items-center gap-2">
                <MdLocationOn className="text-redColor" fontSize={24} />
                Egypt, Dumyat, Ezbet-Elborg Alfanar Street
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-redColor" fontSize={24} />
                +0201208943693
              </li>
              <li className="flex items-center gap-2">
                <MdMail className="text-redColor" fontSize={24} />
                ahmadmayallo02@gmail.com
              </li>
            </ul>
            <h4 className="my-6 uppercase text-2xl font-medium">Follow Me</h4>
            <div className="links flex items-center gap-4 text-2xl">
              <a
                href="https://github.com/Ahmad-Mayallo-2002"
                className="bg-white rounded-full p-2 text-blueColor hover:text-white hover:bg-blueColor duration-300"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/ahmad-mayallo-86944b21b/"
                className="bg-white rounded-full p-2 text-blueColor hover:text-white hover:bg-blueColor duration-300"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          <div className="col">
            <form action="#" className="grid gap-4">
              <input
                type="text"
                className="input-settings p-4 border-2 rounded-lg"
                placeholder="Username"
              />
              <input
                type="text"
                className="input-settings p-4 border-2 rounded-lg"
                placeholder="Email"
              />
              <input
                type="text"
                className="input-settings p-4 border-2 rounded-lg"
                placeholder="Subject"
              />
              <textarea
                className="textarea-settings p-4 border-2 rounded-lg h-[200px]"
                placeholder="Message"
              ></textarea>
              <button
                type="submit"
                className="rounded-lg text-redColor font-bold py-3 px-6 border-2 border-redColor hover:text-white hover:bg-redColor duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Google Map */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13605.519866829822!2d31.84053406185266!3d31.51372246627258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2seg!4v1730666649251!5m2!1sar!2seg"
        height="450"
        className="w-full"
        loading="lazy"
      ></iframe>
    </>
  );
}
