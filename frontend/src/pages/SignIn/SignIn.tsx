import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdError } from "react-icons/md";
import { mainUrl } from "../../assets/data";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLog } from "../../redux/slice";
import { toast, ToastContainer } from "react-toastify";

interface User {
  email: string;
  password: string;
}

export default function SignIn() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const onSubmit = async (userData: User) => {
    try {
      setLoading(true);
      const { data } = await axios.post(mainUrl + "sign-in", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      cookies.set("userData", data);
      dispatch(checkLog());
      navigate("/");
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.msg, { position: "top-left" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <main
        className="flex items-center justify-center px-4 dark:bg-darkBlueColor dark:text-white"
        style={{ height: "calc(100vh - 67.5px - 56px)" }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          action="#"
          className="sign-form grid gap-4 max-w-[500px] w-full sign-form"
        >
          {/* Email */}
          <input
            type="text"
            placeholder="Email"
            autoComplete="off"
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
            className="dark:bg-transparent"
          />
          {errors.email?.message && (
            <p className="font-bold text-lg text-red-500 flex items-center gap-1">
              <MdError fontSize={25} /> {errors.email.message}
            </p>
          )}
          {/* Password */}
          <input
            type="password"
            className="dark:bg-transparent"
            placeholder="Password"
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
          <p className="text-center">
            You Don't Have An Account ?{" "}
            <a href="/SignUp" className="duration-300 hover:text-redColor">
              Sign Up
            </a>
          </p>
          <a
            href="/ForgotPassword"
            className="duration-300 hover:text-redColor text-center"
          >
            You Don't Remember Your Password ?
          </a>
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
              "Login"
            )}
          </button>
        </form>
      </main>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
