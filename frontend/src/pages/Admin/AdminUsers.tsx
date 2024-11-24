import axios from "axios";
import { useEffect, useState } from "react";
import { mainUrl, userData } from "../../assets/data";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface User {
  username: string;
  email: string;
  image: string;
  phone: number;
  country: {
    country: string;
    code: number;
    tax_rate: number;
  };
}

export default function AdminUsers() {
  const limit = 5;
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [length, setLength] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);
  const { token, id } = userData();
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          mainUrl + `get-users?limit=${limit}&skip=${skip}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              id: id,
            },
          }
        );
        setUsers(data?.users);
        setLength(data?.length);
      } catch (error) {
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [skip]);
  const handlePrev = () => {
    if (skip === 0) {
      setSkip(length - (length % limit || limit));
    } else {
      setSkip((value) => (value -= limit));
    }
  };

  const handleNext = () => {
    if (skip === length - (length % limit || limit)) {
      setSkip(0);
    } else {
      setSkip((value) => (value += limit));
    }
    console.log(skip);
  };
  return (
    <>
      <h2 id="admin-heading">All Users</h2>
      {loading ? (
        <div className="w-full grid place-content-center h-[300px]">
          <AiOutlineLoading3Quarters fontSize={70} className="animate-spin" />
        </div>
      ) : (
        <div className="table-container md:overflow-x-visible overflow-x-auto w-[calc(100vw - 56px - 2rem)]">
          <table
            cellPadding={10}
            className="md:w-full w-[200%]"
            id="users-table"
          >
            <thead className="font-bold">
              <tr>
                <td className="border">No.</td>
                <td className="border">Image</td>
                <td className="border">Username</td>
                <td className="border">Country</td>
                <td className="border">Phone</td>
                <td className="border">Action</td>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.username}>
                  <td className="border">{index + 1}</td>
                  <td className="border">
                    <img
                      src={user.image}
                      className="rounded-full w-[50px] h-[50px]"
                      alt=""
                    />
                  </td>
                  <td className="border">{user.email}</td>
                  <td className="border">{user.country.country}</td>
                  <td className="border">{user.phone}</td>
                  <td className="border">
                    <button className="my-button !p-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="font-bold">
              <tr>
                <td className="border" colSpan={5}>
                  Total Users:{" "}
                </td>
                <td className="border">{length}</td>
              </tr>
            </tfoot>
          </table>
          <div className="buttons mt-4 flex justify-between items-center">
            <button onClick={handlePrev} className="my-button !p-2">
              Prev
            </button>
            <button onClick={handleNext} className="my-button !p-2">
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
