"use client";
import React from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

const Page = () => {
  const router = useRouter();

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
      <Toaster />
      <div className="  h-[100%] flex items-center rounded-3xl bg-white justify-center ">
        <div className="  flex flex-col gap-8 items-center ">
          <div className=" w-[100%]   ">
            <Image
              width={700}
              height={700}
              alt="Home page 3D image"
              src={"/assets/home/page.jpg"}
              className=" max-w-[100%]"
            ></Image>
          </div>
          <div className=" flex items-center gap-7 ">
            <button
              onClick={handleLogout}
              className=" bg-gray-300 text-white rounded-md shadow-lg px-5 py-1"
            >
              Logout
            </button>
            <button
              onClick={() => router.push("/dashboard/create")}
              className=" px-5 py-1 shadow-lg rounded-md bg-[#3E1E97] text-white"
            >
              Create Test
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
