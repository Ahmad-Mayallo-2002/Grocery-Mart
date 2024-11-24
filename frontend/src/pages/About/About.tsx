import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function About() {
  return (
    <>
      <main className="dark:bg-darkBlueColor dark:text-white">
        {/* Hero Section */}
        <div id="hero" className="h-[400px] flex items-center justify-center">
          <h2 className="text-white font-bold text-5xl">About Us</h2>
        </div>
        {/* Content Section */}
        <div id="content" className="py-16">
          <div className="container grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="col">
              <h3 className="font-bold text-3xl mb-3">
                Best Offers & Best Deals In Our Mart!
              </h3>
              <p className="text-gray-500 leading-[2]">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
              <p className="text-gray-500 leading-[2] my-3">
                Sunt in culpa qui officia deserunt mollit anim id est
                laborum.Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla ariatur in
                reprehenderit.
              </p>
              <a
                href="/Products"
                className="block w-fit py-3 px-5 text-white font-bold bg-redColor rounded-lg hover:bg-[aqua] duration-300"
              >
                View Our Products
              </a>
            </div>
            <div className="col">
              <img src="/about.jpg" className="rounded-lg" alt="About Image" />
            </div>
          </div>
        </div>
        {/* My Section */}
        <div id="me" className="py-16">
          <div className="container">
            <h2 id="special-heading">Meet Developer</h2>
            <div className="card shadow-lg rounded-2xl text-center w-fit mx-auto border-2">
              <figure className="relative overflow-hidden" id="my-card">
                <img
                  src="/me.jpg"
                  alt="My Image"
                  className="mx-auto rounded-t-2xl"
                  width="250px"
                />
                <figcaption
                  id="my-card-links"
                  className="py-2 absolute bottom-0 w-full"
                  style={{ background: "rgb(0 0 0/ .25)" }}
                >
                  <h4 className="mb-3 font-bold text-center text-white text-2xl">
                    Follow Me
                  </h4>
                  <div className="links flex items-center gap-4 justify-center text-2xl">
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
                </figcaption>
              </figure>
              <div className="body p-4">
                <h3 className="font-bold text-xl mb-3">Ahmad Mayallo</h3>
                <p className="text-gray-500">Full Stack Developer</p>
              </div>
            </div>
          </div>
        </div>
        {/* End Section */}
        <div id="end" className="py-16">
          <div className="container text-center">
            <h2 className="text-center text-3xl">
              Are You Ready For Deals? Flat{" "}
              <span className="text-redColor">30% Offer</span> on Mobiles
            </h2>
            <p className="text-gray-500 mt-6 mb-8 max-w-[600px] mx-auto">
              Itaque earum rerum hic tenetur a sapiente delectus, ut aut
              reiciendis voluptatibus maiores alias consequatur aut perferendis
              doloribus asperiores repellat.
            </p>
            <a
              href="/Products"
              className="text-redColor border-2 border-redColor py-3 px-6 rounded-lg hover:bg-redColor hover:text-white duration-300"
            >
              Shop Now
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
