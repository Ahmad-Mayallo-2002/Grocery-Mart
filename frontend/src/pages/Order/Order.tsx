import axios from "axios";
import { useEffect, useState } from "react";
import { mainUrl, userData } from "../../assets/data";
import { Product_Cart } from "../Cart/Cart";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { toast, ToastContainer } from "react-toastify";

interface Orders {
  status: string;
  order_date: Date;
  total_price: number;
  products: Product_Cart[];
  _id: string;
}

export default function Order() {
  const [orders, setOrders] = useState<Orders[]>([]);
  const { token, id } = userData();
  const { tax_rate } = useSelector(
    (state: IRootState) => state.firstSlice.country
  );

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const { data } = await axios.get(mainUrl + "get-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
          id: id,
        },
      });
      console.log(data);
      let pendingOrders = data.orders.filter(
        (order: Orders) => order.status === "Shipped"
      );
      setOrders(pendingOrders);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancelOrDeliverOrder = async (
    orderId: string,
    status: string
  ) => {
    try {
      const { data } = await axios.patch(
        mainUrl + "cancel-or-deliver-order/" + orderId,
        { status: status },
        {
          headers: {
            Authorization: "Bearer " + token,
            id: id,
          },
        }
      );
      toast.success(data?.msg, { position: "top-left" });
      getData();
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <>
      <main id="order" className="py-16 dark:bg-darkBlueColor dark:text-white">
        <div className="container">
          <h2 className="text-center mb-6 font-bold text-5xl">My Orders</h2>
          <div className="orders grid gap-4 ">
            {!orders.length ? (
              <div className="text-center">
                <h2 className="font-bold mb-4 text-[40px]">No Orders</h2>
                <a
                  href="/Products"
                  className="hover:text-redColor duration-300"
                >
                  Order Now
                </a>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="rounded-lg border-2 p-2">
                  <div className="products grid gap-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
                    {order.products.map((product) => (
                      <div key={product._id} className="border-2 rounded-lg">
                        <div className="head">
                          <img
                            src={
                              "products_images/" +
                              product.product_id.product_image
                            }
                            className="w-full h-[200px] rounded-t-[calc(.5rem-3px)]"
                            alt={product.product_id.product_name}
                          />
                        </div>
                        <div className="body p-4 text-center grid gap-2">
                          <h4 className="font-bold text-lg">
                            {product.product_id.product_name}
                          </h4>
                          <p>Amount: {product.product_amount}</p>
                          <p>
                            Price:{" "}
                            {(
                              product.product_amount *
                              product.product_id.product_price
                            ).toFixed(2)}
                            $
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <h3 className="font-bold text-center text-xl my-3">
                    Total Price:{" "}
                    {(order.total_price * (1 + tax_rate)).toFixed(2)}$
                  </h3>
                  <div className="buttons flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleCancelOrDeliverOrder(order._id, "Cancelled")
                      }
                      className="my-button grow"
                    >
                      Cancelled Order
                    </button>
                    <button
                      onClick={() =>
                        handleCancelOrDeliverOrder(order._id, "Delivered")
                      }
                      className="my-button grow hover:!bg-[#080] !border-[#080] !text-[#080]"
                    >
                      Delivered Order
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
