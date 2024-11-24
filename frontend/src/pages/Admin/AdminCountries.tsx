import { useEffect, useState } from "react";
import axios from "axios";
import { mainUrl, userData } from "../../assets/data.ts";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Country {
  _id?: string;
  country: string;
  code: number;
  tax_rate: number;
}

export default function AdminCountries() {
  const { register, handleSubmit } = useForm<Country>();
  const [loading, setLoading] = useState<boolean>(false);
  const { token, id: userId } = userData();
  const [countries, setCountries] = useState<Country[]>([]);
  useEffect(() => {
    getData().then();
  }, []);
  const getData = async () => {
    try {
      const { data } = await axios.get(mainUrl + "get-countries");
      setCountries(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteCountry = async (id: string) => {
    try {
      const { data } = await axios.delete(mainUrl + "delete-country/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
          id: userId,
        },
      });
      await getData();
      toast.success(data?.msg, { position: "top-left" });
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (countryData: Country) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        mainUrl + "add-country",
        {
          country: countryData.country,
          tax_rate: Number(countryData.tax_rate),
          code: Number(countryData.code),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: userId,
          },
        }
      );
      toast.success(data?.msg);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.msg);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const onError = (errors: any) => {
    const errorsArray = [
      errors.country.message,
      errors.code.message,
      errors.tax_rate.message,
    ];
    errorsArray.forEach(
      (message) => message && toast.error(message, { position: "top-left" })
    );
  };
  return (
    <>
      <h2 id="admin-heading">All Countries</h2>
      <form
        action="#"
        onSubmit={handleSubmit(onSubmit, onError)}
        className="mb-4 gap-4 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1"
      >
        <input
          {...register("country", {
            required: {
              value: true,
              message: "Country is Required",
            },
          })}
          type="text"
          placeholder="Write Country Name"
          className="rounded-md border-2 outline-0 py-1.5 px-2 bg-transparent"
        />
        <input
          {...register("code", {
            required: {
              value: true,
              message: "Country Code is Required",
            },
          })}
          type="text"
          placeholder="Write Country Code"
          className="rounded-md border-2 outline-0 py-1.5 px-2 bg-transparent"
        />
        <input
          {...register("tax_rate", {
            required: {
              value: true,
              message: "Tax Rate is Required",
            },
          })}
          type="text"
          placeholder="write Tax Rate"
          className="rounded-md border-2 outline-0 py-1.5 px-2 bg-transparent"
        />
        <button className="my-button !p-1.5" type="submit">
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <AiOutlineLoading3Quarters
                fontSize={20}
                className="animate-spin"
              />{" "}
              Loading...
            </div>
          ) : (
            "Add Country"
          )}
        </button>
      </form>
      <div className="table-container md:overflow-x-visible overflow-x-auto md:w-full w-[calc(100vw-56px-4rem)]">
        <table id="countries-table" className="md:w-full w-[200%]">
          <thead>
            <tr>
              <td>No.</td>
              <td>Country</td>
              <td>Country Code</td>
              <td>Tax Rate</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, index) => (
              <tr key={country._id}>
                <td>{index + 1}</td>
                <td>{country.country}</td>
                <td>{country.code}</td>
                <td>{(country.tax_rate * 100).toFixed(0)}%</td>
                <td>
                  <button
                    className="my-button !p-1.5"
                    onClick={() =>
                      country._id && handleDeleteCountry(country._id)
                    }
                  >
                    <MdDelete fontSize={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>Total Countries:</td>
              <td>{countries.length}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
