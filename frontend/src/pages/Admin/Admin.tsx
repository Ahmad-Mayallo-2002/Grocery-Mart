import { Link, Outlet, useLocation } from "react-router-dom";
import { adminLinks } from "../../assets/data";

export default function Admin() {
  const { pathname } = useLocation();
  return (
    <>
      <main
        id="admin-panel"
        className="dark:bg-darkBlueColor dark:text-white grid grid-cols-[auto_1fr] lg:grid-cols-[200px_1fr]"
      >
        <aside className="p-4">
          <ul className="grid gap-4">
            {adminLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-2 text-2xl ${
                    pathname === link.path && "text-redColor"
                  } duration-300 hover:text-redColor`}
                >
                  <link.icon />
                  <span className="lg:block hidden">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </>
  );
}
