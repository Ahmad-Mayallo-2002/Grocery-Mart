import { mainUrl, Product } from "../../assets/data.ts";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const limit: number = 9;
  useEffect(() => {
    getData();
  }, [skip]);
  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        mainUrl + `get-products?category=all&limit=${limit}&skip=${skip}`
      );
      setProducts(data?.products);
      setLength(data?.length);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteProduct = async (id: string) => {
    try {
      await axios.delete(mainUrl + "delete-product/" + id);
      toast.success("Product is Deleted", { position: "top-left" });
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  const goNext = () => {
    if (skip === length - (length % limit || limit)) {
      setSkip(0);
    } else {
      setSkip((skip) => (skip += limit));
    }
  };
  const goPrev = () => {
    if (skip === 0) {
      setSkip(length - (length % limit || limit));
    } else {
      setSkip((skip) => (skip -= limit));
    }
  };
  return (
    <>
      <h2 id="admin-heading">All Products</h2>
      <div className="flex items-center justify-between mb-4 text-2xl">
        <button
          onClick={goPrev}
          className="rounded-full p-2 border-2 duration-300 hover:bg-redColor hover:border-redColor hover:text-white"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={goNext}
          className="rounded-full p-2 border-2 duration-300 hover:bg-redColor hover:border-redColor hover:text-white"
        >
          <FaArrowRight />
        </button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center gap-2 text-[70px]">
          <AiOutlineLoading3Quarters className="animate-spin" /> Loading...
        </div>
      ) : !products.length ? (
        <div className="text-center text-3xl ">No Products</div>
      ) : (
        <div className="products grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {products.map((product) => (
            <div className="card border" key={product._id}>
              <img
                src={`/products_images/` + product.product_image}
                alt={product.product_name}
                className="h-[200px] w-full"
              />
              <div className="body p-4 grid gap-4 text-center">
                <h3 className="font-bold text-[22px] min-h-[65px]">
                  {product.product_name}
                </h3>
                <p>Price: {product.product_price}$</p>
                <p>Category: {product.product_category}</p>
              </div>
              <div className="foot p-4 pt-0">
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="my-button !p-2 w-full"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
