"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

// ASIDE LINKS ADDED
var adminNavLinks = [
  { href: "/dashboard", lable: "Dashboard", icon: "fa-solid fa-chart-simple" },

  {
    href: "/dashboard/videos",
    lable: "Videos",
    icon: "bx bxs-video-recording",
  },

  {
    href: "/dashboard/user",
    lable: "Users",
    icon: "fa-solid fa-headphones-simple",
  },
];

const Aside = () => {
  const pathname = usePathname();

  const [toggle, setToggle] = useState(true);

  // set the Toggle Value False if window width should be md, or sm -------
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setToggle(false);
      } else {
        setToggle(true);
      }
    };

    // Set initial toggle state based on the window width
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // bg-gradient-to-r from-[rgba(46,136,255,0.45)] to-[rgba(12,192,232,0)]

  return (
    <aside
      style={{
        transition: ".6s",
        width: toggle ? "200px" : "48px",
      }}
      className={` pt-4 overflow-hidden flex flex-col justify-between bg-[#1A1DB1]    bg-gradient-to-r from-[rgba(12,192,232,0.45)] to-[rgba(46,136,255,0.45)] ${
        toggle ? "pr-4" : "pr-0"
      }`}
    >
      <div className="flex flex-col relative ">
        <div className="flex flex-1 flex-col justify-between h-full my-10">
          <ul className="text-sm">
            {adminNavLinks.map((v, i) => {
              return (
                <ul key={i}>
                  <Link
                    href={v.href}
                    className={`relative mb-2 py-1.5 px-4 flex items-center rounded-none lg:rounded-r-full  group cursor-pointer ${
                      pathname === v.href
                        ? "group cursor-pointer lg:bg-[#06060F] md:bg-transparent"
                        : ""
                    }`}
                  >
                    <i
                      className={`${v.icon} text-base ${
                        pathname === v.href ? "text-white" : "text-white"
                      }`}
                    ></i>
                    <div
                      style={{
                        opacity: toggle ? "1" : "0",
                        transition: ".5s",
                      }}
                      className={`ml-3 ${
                        pathname === v.href
                          ? "text-white font-medium"
                          : "text-white"
                      }`}
                    >
                      {v.lable}
                    </div>
                  </Link>
                </ul>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="pl-2 mb-3">
        <span onClick={() => setToggle(!toggle)}>
          <i
            style={{
              transition: ".5s",
            }}
            className={`asideAnimate px-2 bg-gray-50 text-gray-600 active:bg-gray-300 cursor-pointer text-lg p-1 rounded-lg ${
              toggle ? "fa-solid fa-angle-left" : "fa-solid fa-angle-right"
            }`}
          ></i>
        </span>
      </div>
    </aside>
  );
};

export default Aside;
