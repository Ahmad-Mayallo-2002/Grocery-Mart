import { useEffect, useRef, useState } from "react";
import { mainUrl, userData } from "../assets/data";
import axios from "axios";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { checkLog, getCountry } from "../redux/slice";

interface User {
  _id: string;
  email: string;
  username: string;
  image: string;
}

export default function UserList() {
  const ulRef = useRef<HTMLUListElement>(null);
  const { id, token } = userData();
  const [getUserData, setUserData] = useState<User>();
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(mainUrl + "get-users/" + id, {
          headers: {
            Authorization: `Bearer ${token}`,
            id: id,
          },
        });
        setUserData(data);
        dispatch(getCountry(data.country));
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <>
      <div className="relative">
        <button onClick={() => ulRef.current?.classList.toggle("scale-0")}>
          <img
            src={getUserData?.image}
            className="w-[55px] h-[55px] rounded-full"
            alt="User Image"
          />
        </button>
        <ul
          ref={ulRef}
          className="!text-black md:origin-top-left origin-[50%_0%] scale-0 absolute min-w-[250px] bg-white top-[55px] md:left-0 left-[calc(50%-125px)] duration-300"
        >
          <li className="p-3">Username: {getUserData?.username}</li>
          <li className="p-3">Email: {getUserData?.email}</li>
          <hr />
          <li>
            <a
              href="/"
              onClick={() => {
                const cookies = new Cookies();
                cookies.remove("userData");
                dispatch(checkLog());
              }}
              className="block p-3 hover:bg-[#f3f3f3]"
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
