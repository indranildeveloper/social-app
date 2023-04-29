import { FC } from "react";
import Link from "next/link";

const Navbar: FC = () => {
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" href="/">
          Next Social
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/register">Register</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
