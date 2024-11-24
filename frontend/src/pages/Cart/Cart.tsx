import axios from "axios";
import { useEffect, useState } from "react";
import { mainUrl, Product, userData } from "../../assets/data";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export interface Product_Cart {
  product_amount: number;
  product_id: Product;
  _id: string;
}

interface Country {
  _id: string;
  tax_rate: number;
  code: number;
  country: string;
}

export default function Cart() {
  const token = userData();
  const [getCart, setCart] = useState<Product_Cart[]>([]);
  const [orderLoading, setOrderLoading] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const country: Country = useSelector(
    (state: IRootState) => state.firstSlice.country
  );
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const { data } = await axios.get(mainUrl + "get-cart", {
        headers: {
          Authorization: `Bearer ${token.token}`,
          id: token.id,
        },
      });
      setCart(data);
      let test: number = 0;
      for (let i = 0; i < data.length; i++) {
        test += data[i].product_amount * data[i].product_id.product_price;
      }
      setTotalPrice(test);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFromCart = async (product_id: string) => {
    try {
      const { data } = await axios.delete(
        mainUrl + "delete-from-cart/" + product_id,
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
            id: token.id,
          },
        }
      );
      toast.success(data?.msg, { position: "top-left" });
      getData();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    }
  };
  const handleAddOrder = async () => {
    try {
      setOrderLoading(true);
      const { data } = await axios.post(
        mainUrl + "add-order",
        {
          total_price: (totalPrice * (1 + country.tax_rate)).toFixed(2),
          products: getCart,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
            id: token.id,
          },
        }
      );
      toast.success(data?.msg, { position: "top-left" });
      getData();
    } catch (error: any) {
      setOrderLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.msg);
    } finally {
      setOrderLoading(false);
    }
  };
  return (
    <>
      <main id="cart" className="dark:text-white dark:bg-darkBlueColor">
        <div className="container py-16">
          <h2 className="text-center font-bold text-[50px] mb-6">Cart</h2>
          <div>
            {!getCart.length ? (
              <div className="text-center">
                <h2 className="font-bold mb-4 text-[40px]">
                  No Products in Cart
                </h2>
                <a
                  href="/Products"
                  className="hover:text-redColor duration-300"
                >
                  Shop Now
                </a>
              </div>
            ) : (
              <div className="products_cart grid gap-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
                {getCart.map((product) => {
                  const { _id, product_amount, product_id } = product;
                  return (
                    <div key={_id} className="border-2 rounded-lg">
                      <div className="head">
                        <img
                          src={`/products_images/${product_id?.product_image}`}
                          className="h-[200px] rounded-t-[calc(.5rem-3px)] w-full"
                          alt={product?.product_id?.product_name}
                        />
                      </div>
                      <div className="body text-center p-4 grid gap-2">
                        <h3 className="font-bold text-xl">
                          {product_id.product_name}
                        </h3>
                        <p>Amount: {product_amount}</p>
                        <p>
                          Total Price:{" "}
                          {(product_id.product_price * product_amount).toFixed(
                            2
                          )}
                          $
                        </p>
                        <button
                          className="my-button"
                          onClick={() => handleDeleteFromCart(_id)}
                        >
                          Remove From Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <ul className="my-4 grid gap-2">
            <li>Total Price: {totalPrice.toFixed(2)}$</li>
            <li>Tax Rate: {(country.tax_rate * 100).toFixed(0)}%</li>
            <li>
              Final Price: {(totalPrice * (1 + country.tax_rate)).toFixed(2)}$
            </li>
          </ul>
          <button className="my-button block w-full" onClick={handleAddOrder}>
            {orderLoading ? (
              <div className="flex items-center justify-center gap-2">
                <AiOutlineLoading3Quarters
                  fontSize={20}
                  className="animate-spin"
                />{" "}
                Loading...
              </div>
            ) : (
              "Order Now"
            )}
          </button>
        </div>
      </main>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
