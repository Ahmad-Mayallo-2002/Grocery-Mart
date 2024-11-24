import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { mainUrl } from "../../assets/data";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface User {
  username: string;
  email: string;
  password: string;
  image: any;
  phone: number;
  country: string;
}

interface Country {
  _id: string;
  country: string;
  code: number;
  tax_rate: number;
}

export default function SignUp() {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>(
    "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  );
  const [getCountries, setCountries] = useState<Country[]>();
  const navigate = useNavigate();
  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      setImage(URL.createObjectURL(input.files[0]));
      const fileReader = new FileReader();
      fileReader.readAsDataURL(input.files[0]);
      fileReader.onload = function () {
        setImage(String(fileReader.result));
      };
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const onSubmit = async (userData: User) => {
    try {
      setLoading(true);
      if (userData.image) userData.image = image;
      await axios.post(mainUrl + "sign-up", userData);
      navigate("/SignIn");
    } catch (error: any) {
      setLoading(false);
      alert(error?.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(mainUrl + "get-countries");
        setCountries(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <>
      <main
        className="flex items-center justify-center py-16 px-4 dark:bg-darkBlueColor dark:text-white"
        style={{ minHeight: "calc(100vh - 67.5px - 56px)" }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          action="#"
          className="sign-form grid gap-4 max-w-[500px] w-full"
        >
          {/* Image */}
          <label htmlFor="image" className="w-fit cursor-pointer block mx-auto">
            <img
              src={image}
              alt="User Image"
              className="w-[128px] h-[128px] rounded-full"
            />
          </label>
          <input
            {...register("image", {
              onChange: handleChangeImage,
            })}
            type="file"
            id="image"
            hidden
          />
          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            autoComplete="off"
            className="dark:bg-transparent"
            {...register("username", {
              required: {
                value: true,
                message: "Username is Required",
              },
              minLength: {
                value: 5,
                message: "Minimum Length is 5",
              },
              maxLength: {
                value: 15,
                message: "Maximum Length is 15",
              },
            })}
          />
          {errors.username?.message && (
            <p className="font-bold text-lg text-red-500 flex items-center gap-1">
              <MdError fontSize={25} /> {errors.username.message}
            </p>
          )}
          {/* Email */}
          <input
            type="text"
            placeholder="Email"
            autoComplete="off"
            className="dark:bg-transparent"
            {...register("email", {
              required: {
                value: true,
                message: "Email is Required",
              },
              pattern: {
                value: /^[A-Za-z]{5,20}[0-9!#$%^&*]+@gmail\.com$/,
                message: "Invalid Email Syntax",
              },
            })}
          />
          {errors.email?.message && (
            <p className="font-bold text-lg text-red-500 flex items-center gap-1">
              <MdError fontSize={25} /> {errors.email.message}
            </p>
          )}
          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="dark:bg-transparent"
            {...register("password", {
              required: {
                value: true,
                message: "Password is Required",
              },
              minLength: {
                value: 9,
                message: "Minimum Length is 9",
              },
              maxLength: {
                value: 20,
                message: "Maximum Length is 20",
              },
            })}
          />
          {errors.password?.message && (
            <p className="font-bold text-lg text-red-500 flex items-center gap-1">
              <MdError fontSize={25} /> {errors.password.message}
            </p>
          )}
          {/* Phone */}
          <input
            type="text"
            placeholder="Phone"
            className="dark:bg-transparent"
            autoComplete="off"
            {...register("phone", {
              required: {
                value: true,
                message: "Phone Number is Required",
              },
            })}
          />
          {errors.phone?.message && (
            <p className="font-bold text-lg text-red-500 flex items-center gap-1">
              <MdError fontSize={25} /> {errors.phone.message}
            </p>
          )}
          {/* Country */}
          <select
            id="country"
            className="text-gray-400 dark:bg-transparent"
            {...register("country", {
              required: {
                value: true,
                message: "Country is Required",
              },
            })}
          >
            <option value="">Country</option>
            {getCountries?.map((value) => (
              <option value={value._id} key={value.code}>
                {value.country}
              </option>
            ))}
          </select>
          {errors.country?.message && (
            <p className="font-bold text-lg text-red-500 flex items-center gap-1">
              <MdError fontSize={25} /> {errors.country.message}
            </p>
          )}
          <p className="text-center">
            You Already Have An Account ?{" "}
            <a href="/Login" className="duration-300 hover:text-redColor">
              Login
            </a>
          </p>
          <button
            type="submit"
            className="px-6 py-2 border-2 border-redColor text-redColor hover:text-white hover:bg-redColor duration-300 rounded-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <AiOutlineLoading3Quarters
                  fontSize={20}
                  className="animate-spin"
                />{" "}
                Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </main>
    </>
  );
}
