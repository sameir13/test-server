"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

const Page = () => {
  const router = useRouter();

  const indexJson = [
    {
      tagName: "Blogs",
      tagCount: 143,
      icon: "bx bxl-blogger text-[20px] bg-cyan-200 text-cyan-700 p-2 rounded-md",
      bgColor : "bg-[#d5fbff]"
    },
    {
      tagName: "News & Events",
      tagCount: 812,
      icon: "bx bxs-news text-[20px]  bg-emerald-200 text-green-700 p-2 rounded-md",
      bgColor : "bg-green-100"
    },
    {
      tagName: "Courses",
      tagCount: 5,
      icon: "bx bxs-book-alt text-[20px]  bg-fuchsia-200 text-fuchsia-700 p-2 rounded-md",
      bgColor : "bg-purple-100"
    },
    {
      tagName: "Destinations",
      tagCount: 20,
      icon: "bx bx-globe  text-[20px] bg-rose-200 text-rose-700 p-2 rounded-md",
      bgColor : "bg-red-100"
    },
  ];

  return (
    <>
      <Toaster />
      <div className="max-w-[1300px] m-auto ">
        <div className=" flex  gap-3 flex-wrap   max-md:justify-center ">
          {indexJson?.map((v, i) => (
            <div key={i}  className={` cursor-pointer  shadow-lg flex-1 ${v.bgColor}`}>
              <div className="rounded-lg py-5 px-7 flex   transition-all  duration-300 ">
                <div className=" flex-1">
                  <h2 className=" text-slate-600 text-base mb-2">
                    {v.tagName}
                  </h2>
                  <span className=" text-slate-500 font-semibold text-lg">
                    {v.tagCount}
                  </span>
                  <p className=" my-2 text-sm text-slate-400 font-light">
                    <span className="text-[#22c55e]">0</span> Newly Added
                  </p>
                </div>
                <div>
                  <i className={v.icon}></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
