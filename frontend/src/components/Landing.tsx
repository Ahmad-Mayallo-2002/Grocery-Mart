import { FaArrowRight, FaPlay } from "react-icons/fa";
import test from "../assets/video-image.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { mainUrl, Product } from "../assets/data";

export default function Landing() {
  const [getProducts, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          mainUrl + "get-products?limit=8&category=all"
        );
        setProducts(data?.products);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <>
      {/* Hero Section */}
      <div
        id="hero"
        className="py-12 h-[400px] flex items-center"
        style={{ height: "calc(100vh - 67.5px - 56px)" }}
      >
        <div className="container grid gap-4 md:grid-cols-2 grid-cols-1">
          <div className="col grid place-content-center md:text-start text-center">
            <p className="uppercase text-white">
              start your daily online shopping
            </p>
            <h2 className="mt-3 text-white font-bold text-4xl">
              Stay Home &amp; we will deliver your daily need's
            </h2>
            <a
              href="/Products"
              className="mt-5 mx-auto md:mx-[initial] hover:bg-[aqua] duration-300 block w-fit font-bold bg-redColor text-white py-2 px-4 rounded-lg"
            >
              Shop Now
            </a>
          </div>
          <div className="col">
            <img src="/banner-img.png" alt="Banner Image" />
          </div>
        </div>
      </div>
      {/* Video Section */}
      <div id="video" className="py-16 dark:bg-darkBlueColor dark:text-white">
        <div className="container">
          <div className="relative">
            <video
              onPlay={() =>
                document.getElementById("play_button")?.classList.add("hidden")
              }
              controls
              poster={test}
              className="cursor-pointer"
              id="myVideo"
            >
              <source src="/video.mp3" />
              <source src="/video.mp4" />
              Your Browser Not Support Video
            </video>
            <span
              onClick={() => {
                let video = document.getElementById(
                  "myVideo"
                ) as HTMLVideoElement;
                video.play();
              }}
              id="play_button"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              className="cursor-pointer bg-white absolute block flex items-center justify-center w-[100px] h-[100px] border-[5px] border-white rounded-full"
            >
              <FaPlay color="black" fontSize={40} />
            </span>
          </div>
        </div>
      </div>
      {/* Cashback Section */}
      <div
        id="cashback"
        className="py-16 grid md:grid-cols-2 grid-cols-1 dark:bg-darkBlueColor dark:text-white"
      >
        <div className="col min-h-[400px] flex justify-end">
          <div className="box p-4">
            <p className="font-bold">For Delivery</p>
            <h3 className="italic font-bold text-4xl mt-2 mb-8">
              <span>20%</span> Cashback
            </h3>
            <a
              href="/Products"
              className="flex items-center gap-2 text-redColor font-bold text-lg"
            >
              Show Now <FaArrowRight />
            </a>
          </div>
        </div>
        <div className="col min-h-[400px] flex items-center justify-center">
          <p className="uppercase py-4 bg-[#222] font-bold px-5 border-4 border-white rounded-lg text-white">
            Organic Foods
          </p>
        </div>
      </div>
      {/* Special Deals */}
      <div id="deals" className="py-16 dark:bg-darkBlueColor dark:text-white">
        <div className="container">
          <h2 id="special-heading">Special Deals</h2>
          <div className="box h-[750px] grid md:grid-cols-2 gap-8 grid-cols-1">
            <div className="col grid gap-8">
              <div className="box-1 flex flex-col justify-between">
                <div className="circle rounded-full p-4 bg-blueColor text-white text-center w-[100px] h-[100px] flex items justify-center flex-col text-xl">
                  <p>30%</p>
                  <p>Off/-</p>
                </div>
                <h3 className="font-bold text-white text-3xl uppercase">
                  we offer <span className="block ms-8">best products</span>
                </h3>
              </div>
              <div className="box-2">
                <h3 className="font-bold text-white text-3xl uppercase">
                  best storage <span className="block ms-8">for groceries</span>
                </h3>
              </div>
            </div>
            <div className="col">
              <div className="box-3">
                <div className="box uppercase text-3xl font-bold">
                  <h3 className="text-white">big deals</h3>
                  <h3 className="text-redColor">save up</h3>
                  <h3 className="text-white">to</h3>
                  <h3 className="text-redColor">30%</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Top Products */}
      <div
        id="top-products"
        className="py-16 bg-[#fafafb] dark:bg-darkBlueColor dark:text-white"
      >
        <div className="container">
          <h2 id="special-heading">Top Products</h2>
          <div className="products grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {getProducts.map((value) => (
              <div key={value._id} className="card shadow border rounded-xl">
                <img
                  src={"/products_images/" + value.product_image}
                  alt="Product Image"
                  className="h-[200px] w-full rounded-t-xl"
                />

                <div className="body text-center p-4">
                  <h3 className="text-center font-extrabold text-xl">
                    {value.product_name}
                  </h3>
                  <p className="my-2">{value.product_price}$</p>
                  <a
                    href={"/Products/" + value._id}
                    className="border-2 border-redColor py-2 block px-6 rounded-lg text-redColor hover:text-white hover:bg-redColor duration-300"
                  >
                    Add To Cart
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Top Brands */}
      <div
        id="top-brands"
        className="py-16 dark:bg-darkBlueColor dark:text-white"
      >
        <div className="container">
          <h2 id="special-heading">Top Brands</h2>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4">
            {[1, 2, 3, 4, 5].map((value) => (
              <figure key={value} className="mx-auto">
                <img src={`/brand-${value}.png`} />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
