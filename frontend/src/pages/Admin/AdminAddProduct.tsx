import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { mainUrl, userData } from "../../assets/data.ts";
import axios from "axios";
import { MdError } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

interface Product {
  product_name: string;
  product_price: number;
  product_category: string;
  product_description: string;
  product_image: FileList;
}

interface Category {
  category_name: string;
  _id: string;
}

export default function AdminAddProduct() {
  const { token, id } = userData();
  const [image, setImage] = useState<string>();
  const [categories, setCategories] = useState<Category[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();
  const img = useRef<HTMLImageElement>(null);
  const paragraph = useRef<HTMLParagraphElement>(null);
  const handleChangeImage = (event: ChangeEvent) => {
    const file = event.target as HTMLInputElement;
    paragraph.current?.classList.add("hidden");
    img.current?.classList.remove("hidden");
    if (file.files) setImage(URL.createObjectURL(file.files[0]));
  };
  const onSubmit = async (_productData: Product, event: any) => {
    const form = new FormData(event.target);
    try {
      const { data } = await axios.post(mainUrl + "add-product", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          id: id,
        },
      });
      toast.success(data?.msg, { position: "top-left" });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(mainUrl + "get-categories");
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <>
      <h2 id="admin-heading">Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} action="#" className="grid gap-4">
        {/* Product Image */}
        <label
          htmlFor="image"
          className="cursor-pointer flex items-center justify-center h-[150px]"
        >
          <p
            ref={paragraph}
            className="bg-red-500 w-[200px] text-center p-4 rounded-lg text-white"
          >
            Select Image
          </p>
          <img
            ref={img}
            className="hidden h-[150px] w-full"
            src={image}
            alt=""
          />
          <input
            {...register("product_image", {
              onChange: handleChangeImage,
              required: {
                value: true,
                message: "Product Image is Required",
              },
            })}
            type="file"
            id="image"
            hidden
          />
        </label>
        {errors.product_image?.message && (
          <p className="font-bold text-lg text-red-500 flex items-center gap-1">
            <MdError fontSize={25} /> {errors.product_image.message}
          </p>
        )}
        {/* Product Name */}
        <input
          {...register("product_name", {
            required: {
              value: true,
              message: "Product Name is Required",
            },
          })}
          type="text"
          className="bg-transparent border-2 p-2"
          placeholder="Write Product Name"
        />
        {errors.product_name?.message && (
          <p className="font-bold text-lg text-red-500 flex items-center gap-1">
            <MdError fontSize={25} /> {errors.product_name.message}
          </p>
        )}
        {/* Product Price */}
        <input
          {...register("product_price", {
            required: {
              value: true,
              message: "Product Price is Required",
            },
          })}
          type="text"
          className="bg-transparent border-2 p-2"
          placeholder="Write Product Price"
        />
        {errors.product_price?.message && (
          <p className="font-bold text-lg text-red-500 flex items-center gap-1">
            <MdError fontSize={25} /> {errors.product_price.message}
          </p>
        )}
        {/* Product Category */}
        <select
          {...register("product_category", {
            required: {
              value: true,
              message: "Product Category is Required",
            },
          })}
          className="bg-transparent border-2 p-2"
        >
          <option value="" className="text-black">
            Select Product Category
          </option>
          {categories.map((category) => (
            <option
              className="text-black"
              value={category.category_name}
              key={category._id}
            >
              {category.category_name}
            </option>
          ))}
        </select>
        {errors.product_category?.message && (
          <p className="font-bold text-lg text-red-500 flex items-center gap-1">
            <MdError fontSize={25} /> {errors.product_category.message}
          </p>
        )}
        {/* Product Description */}
        <textarea
          {...register("product_description", {
            required: {
              value: true,
              message: "Product Description is Required",
            },
          })}
          className="bg-transparent resize-none h-[150px] border-2 p-2"
          placeholder="Write Product Description"
        ></textarea>
        {errors.product_description?.message && (
          <p className="font-bold text-lg text-red-500 flex items-center gap-1">
            <MdError fontSize={25} /> {errors.product_description.message}
          </p>
        )}
        <button className="my-button" type="submit">
          Add Product
        </button>
      </form>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
