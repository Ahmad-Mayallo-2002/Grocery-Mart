import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { mainUrl, Product as SingleProduct } from "../../assets/data";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Product() {
  const length = 9;
  const [getProducts, setProducts] = useState<SingleProduct[]>([]);
  const [getCategories, setCategories] = useState<{ category_name: string }[]>(
    []
  );
  const [getCategory, setCategory] = useState<string>("all");
  const [getLength, setLength] = useState<number>(0);
  const [getSkip, setSkip] = useState<number>(0);
  const getData = async () => {
    try {
      const { data: products } = await axios.get(
        mainUrl +
          `get-products?limit=${length}&skip=${getSkip}&category=${getCategory}`
      );
      const { data: categories } = await axios.get(mainUrl + "get-categories");
      setProducts(products?.products);
      if (getCategory === "all") {
        setLength(products?.length);
      }
      setCategories(categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [getSkip, getCategory]);
  const goPrev = () => {
    if (getSkip === 0) {
      setSkip(getLength - (getLength % length));
    } else {
      setSkip((value) => (value -= length));
    }
  };
  const goNext = () => {
    if (getSkip === getLength - (getLength % length)) {
      setSkip(0);
    } else {
      setSkip((value) => (value += length));
    }
  };
  const handleChange = async (event: ChangeEvent) => {
    const input = event.target as HTMLInputElement;
    setCategory(input.value);
    setLength(getProducts.length);
  };
  return (
    <>
      {/* Hero Section */}
      <div id="hero" className="h-[400px] flex items-center justify-center">
        <h2 className="font-bold text-5xl text-white">Our Products</h2>
      </div>
      {/* Products */}
      <div
        id="products"
        className="py-16 dark:bg-darkBlueColor dark:text-white"
      >
        <div className="container">
          <div className="row grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4">
            {/* First Column */}
            <div className="col p-4 border-2 rounded-lg">
              <h3 className="font-bold mb-4 text-3xl">Categories</h3>
              <ul className="grid gap-2">
                <li>
                  <label
                    htmlFor={"category-0"}
                    className="cursor-pointer flex items-center gap-2 capitalize"
                  >
                    <input
                      type="radio"
                      name="categories"
                      value="all"
                      id={"category-0"}
                      defaultChecked
                      onChange={handleChange}
                    />
                    all
                  </label>
                </li>
                {getCategories.map((category, index) => (
                  <li key={index}>
                    <label
                      htmlFor={"category-" + (index + 1)}
                      className="cursor-pointer flex items-center gap-2 capitalize"
                    >
                      <input
                        type="radio"
                        name="categories"
                        value={category.category_name}
                        id={"category-" + (index + 1)}
                        onChange={handleChange}
                      />
                      {category.category_name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            {/* Second Column */}
            <div className="col p-4 border-2 rounded-lg">
              <div className="next-prev flex items-center justify-between mb-4">
                <button
                  onClick={goPrev}
                  id="prev"
                  className="rounded-full border-2 border-blueColor p-2 text-blueColor duration-300 hover:text-white hover:bg-blueColor"
                >
                  <FaArrowLeft fontSize={30} />
                </button>
                <button
                  onClick={goNext}
                  id="next"
                  className="rounded-full border-2 border-blueColor p-2 text-blueColor duration-300 hover:text-white hover:bg-blueColor"
                >
                  <FaArrowRight fontSize={30} />
                </button>
              </div>
              <div className="content grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
                {getProducts.map((product) => {
                  const { product_image, product_name, product_price, _id } =
                    product;
                  return (
                    <div className="card border rounded-lg" key={_id}>
                      <img
                        src={"/products_images/" + product_image}
                        className="h-[250px] w-full bg-[aqua] rounded-t-lg"
                        alt={product_name}
                      />
                      <div className="body p-4 text-center grid gap-2">
                        <h3 className="text-redColor font-bold text-xl">
                          {product_name}
                        </h3>
                        <p className="text-gray-500">{product_price}$</p>
                        <a
                          className="block border-2 rounded-lg text-redColor py-2 px-6 border-redColor hover:text-white hover:bg-redColor duration-300 font-bold"
                          href={"/Products/" + _id}
                        >
                          show more
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
