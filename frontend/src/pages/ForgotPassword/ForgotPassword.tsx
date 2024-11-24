import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { mainUrl } from "../../assets/data";
import { MdError } from "react-icons/md";

interface User {
  email: string;
  password: string;
  newPassword: string;
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const onSubmit = async (data: User) => {
    try {
      const { data: resultData } = await axios.patch(
        mainUrl + "update-password",
        data
      );
      console.log(resultData);
      navigate("/SignIn");
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  return (
    <>
      <main
        className="flex items-center justify-center dark:bg-darkBlueColor dark:text-white"
        style={{ height: "calc(100vh - 67.5px - 56px)" }}
      >
        <form
          action="#"
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 max-w-[500px] w-full"
        >
          <input
            type="text"
            placeholder="Write Your Email"
            className="outline-0 border-2 rounded-lg py-2 px-4 dark:bg-transparent"
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
          <input
            type="password"
            className="outline-0 border-2 rounded-lg py-2 px-4 dark:bg-transparent"
            placeholder="New Password"
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
          <input
            type="password"
            className="outline-0 border-2 rounded-lg py-2 px-4 dark:bg-transparent"
            placeholder="Confirm New Password"
            {...register("newPassword", {
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
          {errors.newPassword?.message && (
            <p className="font-bold text-lg text-red-500 flex items-center gap-1">
              <MdError fontSize={25} /> {errors.newPassword.message}
            </p>
          )}
          <button
            type="submit"
            className="px-6 py-2 border-2 border-redColor text-redColor hover:text-white hover:bg-redColor duration-300 rounded-lg"
          >
            Confirm
          </button>
        </form>
      </main>
    </>
  );
}
