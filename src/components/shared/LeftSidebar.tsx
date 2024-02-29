import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";

const LeftSidebar = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { mutate: signOut, isSuccess } = useSignOutAccount();

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-10">
        <Link to="/" className="items-center">
          <img
            src="/public/assets/images/logo.svg"
            alt="logo"
            className="flex flex-center rounded-full"
            width={170}
            height={170}
          />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-4 items-center">
          <img
            src={user.imageUrl || "/public/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-14 w-14 rounded-full"
          />

          <div>
            <p className="font-bold">{user.name}</p>
            <p className="text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-5">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname == link.route;

            return (
              <li key={link.label} className={`leftsidebar-link ${isActive && "bg-primary-500"}`}>
                <NavLink to={link.route}
                  className="flex gap-4 py-4 px-4 group">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white 
                    ${isActive && "invert-white"}`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button 
        variant="ghost" 
        className="shad-button_ghost" 
        onClick={() => signOut()}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-semibold lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
