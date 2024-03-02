"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { Merienda } from "next/font/google";
import { useRouter } from "next/navigation";
import { SessionData } from "@/app/context";

const Meriend = Merienda({
  weight: "800",
  subsets: ["latin"],
})
const Dnav = () => {
  const router = useRouter();
  const { user } = useContext(SessionData);
  const handleLogout = async () => {
    try {
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (!confirmLogout) return;
      const res = await axios.post("/api/auth/logout");
      if (res?.data?.success) {
        toast.success("Signed Out");
        router.push("/");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <div className="relative">
        <div className="flex items-center justify-between px-4 py-0">
          <div className="flex items-center gap-4">
            <i
              onClick={() => alert("Roko Zara Sabar Karo!")}
              className="fa-solid fa-bars-staggered text-gray-500 text-lg"
            ></i>
            <div className="flex items-center">
              <Link href={"/"} id="logo" className={Meriend.className}>
                Readable
              </Link>
            </div>
          </div>
          {/* PROFILE START ============================*/}
          <>
            <div className="flex py-2 group relative items-center gap-2 pr-4">
              <Image
                src={user?.avatar}
                alt="image here"
                height={50}
                width={50}
                className="rounded-full h-9 w-9 object-cover cursor-pointer border border-gray-300"
              ></Image>
              <div className="leading-3">
                <p className="text-[14px] text-black mb-1 capitalize font-medium">
                  {user?.fullName}
                </p>
                <span className="text-[11px] cursor-pointer text-red-500 hover:text-red-600">
                  {user?.isAdmin ? "Admin" : "User"}
                </span>
              </div>

              {/* Profile Model Here  */}
              <div
                className={`shade pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 opacity-0 group-hover:top-[100%] transition-all duration-500 bg-white absolute left-0 top-[130%] overflow-hidden rounded-md h-fit min-w-[100px] z-[1000000]`}
              >
                <ul className="px-4 py-4">
                  <li className="flex flex-col gap-2">
                    <Link
                      className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-2"
                      href="/dashboard/profile"
                    >
                      <i className="fa-solid fa-user"></i> Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-2"
                    >
                      <i className="fa-solid fa-gear"></i> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default Dnav;
