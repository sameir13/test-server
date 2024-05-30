"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import { Merienda } from "next/font/google";
import { useRouter } from "next/navigation";
import { SessionData } from "@/app/context";
import { Toaster, toast } from "react-hot-toast";

const Meriend = Merienda({
  weight: "800",
  subsets: ["latin"],
});

const Dnav = () => {
  const router = useRouter();
  const [ShowForm, setShowForm] = useState(false);
  const { user } = useContext(SessionData);
  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/auth/logout");
      if (res?.data?.success) {
        toast.success("Signed Out");
        router.push("/");
        setShowForm(false);
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="relative  bg-[#1A1DB1]    bg-gradient-to-r  from-[rgba(12,192,232,0.45)]  to-[rgba(22,99,204,0.45)] ">
        <div className="flex items-center justify-between px-4 py-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center  ">
              <Link href={"/"} id="logo" className={Meriend.className}>
                <div className=" flex items-center gap-3">
                  <img
                    src="/assets/nav/logo.png"
                    alt=""
                    className=" mx-10 my-2 w-14"
                  />
                </div>
              </Link>
            </div>
          </div>
          {/* PROFILE START ============================*/}
          <>
            <div className="flex py-2 group relative items-center gap-2 pr-4">
              <Image
                src={user?.avatar ? user?.avatar : "/assets/home/download.jpg"}
                alt="image here"
                height={50}
                width={50}
                className="rounded-full h-9 w-9 object-cover cursor-pointer border border-gray-300"
              ></Image>
              <div className="leading-3">
                <p className="text-[14px] text-white mb-1 capitalize font-medium">
                  {user?.fullName || "User"}
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
                      onClick={() => setShowForm(true)}
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

      {/* DELETE POPUP MODEL-------------------------------------------------------------------- */}

      <div
        style={{
          visibility: ShowForm ? "visible" : "hidden",
          opacity: ShowForm ? "1" : "0",
          transition: ".4s",
        }}
        className="fixed z-10 top-0 left-0 w-full flex items-center justify-center h-screen border-red-600 backdrop-blur-[2px] bg-[#00000094] overflow-auto"
      >
        <div className=" relative w-full max-w-[400px] bg-[#0a061b]  rounded-lg py-10 px-4 shadow-2xl">
          <div className=" absolute right-3 top-3 flex items-end justify-end border-b-1 border-b-slate-500">
            <i
              onClick={() => setShowForm(false)}
              className="bx bx-x text-white text-xl cursor-pointer"
            ></i>
          </div>
          <div className=" flex flex-col items-center justify-center ">
            <p className=" text-md text-white mb-3">
              Are you sure you want delete?
            </p>
            <div className=" mt-3">
              <button
                onClick={() => setShowForm(false)}
                className=" border border-slate-500 text-slate-500 py-1 px-6 text-sm "
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className=" bg-indigo-400  border ml-4 border-indigo-400  text-white py-1 px-6 text-sm "
              >
                {" "}
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dnav;
