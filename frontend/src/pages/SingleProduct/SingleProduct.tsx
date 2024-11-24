import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mainUrl, Product, userData } from "../../assets/data";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SingleProduct() {
  const { id } = useParams();
  const user = userData();
  const [getProduct, setProduct] = useState<Product>();
  const [getQuantity, setQuantity] = useState<number>(1);
  const [getTotalPrice, setTotalPrice] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleMinus = () => {
    if (getQuantity > 1) setQuantity((value) => (value = value - 1));
  };
  const handlePlus = () => setQuantity((value) => (value = value + 1));
  const handleAddCart = async (product_amount: number, product_id: string) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        mainUrl + "add-to-cart",
        { product_amount: product_amount, product_id: product_id },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            id: user.id,
          },
        }
      );
      toast.success(data?.msg, { position: "top-left" });
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.msg, { position: "top-left" });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const { data: productData } = await axios.get(
          mainUrl + "get-products/" + id
        );
        setProduct(productData);
        setTotalPrice(productData?.product_price);
      } catch (error) {
        console.log(error);
        navigate("/Error");
      }
    };
    getData();
  }, []);

  return (
    <>
      <main className="dark:bg-darkBlueColor dark:text-white">
        <div className="container py-16">
          <div className="row grid gap-4 md:grid-cols-2 grid-cols-1">
            <div className="col">
              <img
                src={"/products_images/" + getProduct?.product_image}
                className="h-[400px] w-full rounded-lg"
                alt="Product Image"
              />
            </div>
            <div className="col">
              <h2 className="font-bold text-3xl mb-4">
                {getProduct?.product_name}
              </h2>
              <div className="paragraphs text-gray-500 mb-4 leading-[2]">
                <p>{getProduct?.product_description}</p>
                <p>Type: {getProduct?.product_category}</p>
                <p>{getProduct?.product_price}$</p>
              </div>
              <div className="flex items-center border-2 rounded-lg w-fit">
                <button onClick={handleMinus} className="px-2 h-full">
                  <FaMinus fontSize={24} />
                </button>
                <p className="text-[24px] font-bold border-r-2 border-l-2 px-2">
                  {getQuantity}
                </p>
                <button onClick={handlePlus} className="px-2">
                  <FaPlus fontSize={24} />
                </button>
              </div>
              <p className="mt-4 font-bold text-xl">
                Total Price: {(getTotalPrice * getQuantity).toFixed(2)}$
              </p>
              <button
                onClick={() => handleAddCart(getQuantity, String(id))}
                className="mt-4 my-button"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <AiOutlineLoading3Quarters
                      fontSize={20}
                      className="animate-spin"
                    />
                    Loading...
                  </div>
                ) : (
                  "Add To Cart"
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
