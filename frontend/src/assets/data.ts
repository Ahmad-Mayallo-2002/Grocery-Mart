import { IconType } from "react-icons";
import { BiSolidCategory, BiWorld } from "react-icons/bi";
import { FaPhone, FaPlusCircle, FaProductHunt, FaUsers } from "react-icons/fa";
import { MdDashboard, MdLocationOn, MdMail } from "react-icons/md";
import Cookies from "universal-cookie";

interface navLink {
  name: string;
  path: string;
}

interface AdminLink {
  name: string;
  path: string;
  icon: IconType;
}

interface footerFirstCol {
  text: string;
  icon: IconType;
}

interface UserData {
  id: string;
  token: string;
  role: string;
}

export interface Product {
  _id: string;
  product_name: string;
  product_description: string;
  product_image: string;
  product_price: number;
  product_category: string;
}

const NavLinks: navLink[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Products",
    path: "/Products",
  },
  {
    name: "About Us",
    path: "/About",
  },
  {
    name: "Contact Us",
    path: "/Contact",
  },
  {
    name: "Orders",
    path: "/Order",
  },
];

const footerContact: footerFirstCol[] = [
  {
    text: "Egypt, Dumyat, Ezber-Elborg",
    icon: MdLocationOn,
  },
  {
    text: "ahmadmayallo02@gmail.com",
    icon: MdMail,
  },
  {
    text: "+020128943693",
    icon: FaPhone,
  },
];

const footerInfo: string[] = [
  "About Us",
  "Contact Us",
  "FAQ's",
  "Special Products",
];

const footerCategory: string[] = [
  "Fruits & Vegetables",
  "Meats & Seafood",
  "Bakery & Pastry",
  "Beverages",
  "Breakfast & Dairy",
];

const mainUrl: string = "http://localhost:5000/api/";

const userData = (): UserData => {
  const cookies = new Cookies();
  return cookies.get("userData") || { id: "", role: "", token: "" };
};

const adminLinks: AdminLink[] = [
  {
    name: "Home",
    path: "/Admin",
    icon: MdDashboard,
  },
  {
    name: "Users",
    path: "/Admin/Users",
    icon: FaUsers,
  },
  {
    name: "Products",
    path: "/Admin/Products",
    icon: FaProductHunt,
  },
  {
    name: "Categories",
    path: "/Admin/Categories",
    icon: BiSolidCategory,
  },
  {
    name: "Countries",
    path: "/Admin/Countries",
    icon: BiWorld,
  },
  {
    name: "Add Product",
    path: "/Admin/AdminAddProduct",
    icon: FaPlusCircle,
  },
];

export {
  NavLinks,
  footerContact,
  footerInfo,
  footerCategory,
  mainUrl,
  userData,
  adminLinks,
};
