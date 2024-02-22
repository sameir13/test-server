"use client"
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter()
  return (
    <>
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
            <button className=" bg-gray-300 text-white rounded-md shadow-lg px-5 py-1">Logout</button>
            <button onClick={()=>router.push("/dashboard/create")} className=" px-5 py-1 shadow-lg rounded-md bg-[#3E1E97] text-white">Create Test</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
