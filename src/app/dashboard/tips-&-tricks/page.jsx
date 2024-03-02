"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import queryStr from "query-string";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import React, { useEffect, useRef, useState } from "react";
import { format, render, cancel, register } from "timeago.js";

const tableHeader = [
  { lable: "Posting Time", align: "left" },
  { lable: "Title", align: "left" },
  { lable: "Rating", align: "left" },
  { lable: "Author", align: "left" },
  { lable: "Actions", align: "center" },
];

const Page = () => {
  const router = useRouter();
  const [Loading, setLoading] = useState(false);
  const [ShowForm, setShowForm] = useState(false);
  const [FilterByName, setFilterByName] = useState({ title: "", page: 1 });

  //-----------------------------------------------------------------
  const [productData, setProductData] = useState([]);
  const fetchData = async () => {
    const data = await axios.get("/api/tips");
    setProductData(data?.data?.tricks?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Input Hadler For Searching by Name ------------------------------------------/
  const searchInputHanler = (e) => {
    setFilterByName({ ...FilterByName, [e.target.name]: e.target.value });
  };

  // delete Product by Slug ------------------------------------------------------/
  const [tipSlug, setTipSlug] = useState();
  const handlStoreOjectID = (slug) => {
    setTipSlug(slug);
    setShowForm(true);
  };

  const delPost = async (slug) => {
    try {
      const del = await fetch(`/api/tips/${tipSlug}`, {
        method: "DELETE",
      });
      if (del?.ok) {
        toast.success("Deleted!!!");
        setShowForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [delPost]);

  return (
    <>
      <Toaster />
      {/* TABLE STARTED ---------------------------------------------------------------------------  */}
      <div className="w-full">
        <div className="overflow-x-auto w-full border rounded-2xl">
          <div className="bg-white p-4 flex justify-between items-center flex-col gap-3 lg:flex-row w-full">
            <h2 className="text-xl font-semibold">
              All <span className="text-indigo-600">Tests</span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="">
                  <input
                    name="title"
                    value={FilterByName.title}
                    onChange={searchInputHanler}
                    placeholder="Search here..."
                    className="relative border border-gray-200 text-gray-400 text-sm pl-3 px-2 py-[6px] lg:w-[12vw] w-[25vw] rounded-full focus:ring-2 transition-colors focus:outline-none focus:text-gray-400"
                  />
                  <span>
                    {Loading ? (
                      <i className="fa-solid fa-spinner absolute top-[30%] right-3 text-xs text-gray-500 dashboardSearchSlide"></i>
                    ) : (
                      <i className="absolute top-1/2 -translate-y-1/2 right-3 border-l pl-2 cursor-pointer text-gray-400 hover:text-gray-500 bx bx-search-alt-2"></i>
                    )}
                  </span>
                </div>
              </div>
              <div>
                <button
                  title="Add Blog"
                  className="popupBtn  text-indigo-400"
                  onClick={() => router.push("/dashboard/tips-&-tricks/create")}
                >
                  <i className="fa-solid fa-pen"></i>
                </button>
              </div>
            </div>
          </div>
          <table className="text-sm min-w-[1000px] w-full text-left text-gray-500">
            <thead className="text-xs text-gray-700 bg-gray-50">
              <tr>
                {tableHeader.map((value, index) => {
                  return (
                    <th
                      scope="col"
                      key={index}
                      className={`px-6 py-3 text-${value.align}`}
                    >
                      {value.lable}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {productData?.map((v, i) => {
                return (
                  <tr
                    key={i}
                    className="bg-white border-b border-gray-100 hover:bg-green-100"
                  >
                    <td className="px-6 py-2 text-xs">
                      {format(new Date(v.createdAt), "en_US")}
                    </td>
                    <td
                      scope="row"
                      className="px-6 flex border-0 items-center py-2 font-medium text-gray-600 whitespace-nowrap"
                    >
                      <div className="w-10 h-10 mr-3 border border-gray-100 rounded-full overflow-hidden">
                        <Image
                          width={500}
                          height={500}
                          priority="true"
                          className="w-10 h-10 "
                          src={v?.imgUrl}
                          alt="Image Here"
                        />
                      </div>
                      {v.title.slice(0, 15) + "..."}
                    </td>
                    <td className="px-6 py-2"> {v.rating} </td>
                    <td className="px-6 py-2"> Admin </td>
                    <td className="px-6 py-2 text-lg text-center">
                      <Link href={`/blog/${v.slug}`}>
                        <i
                          title="View"
                          className="fa fa-solid fa-eye px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full text-gray-400 text-sm"
                        ></i>
                      </Link>
                      <Link href={`/dashboard/tips-&-tricks/${v.slug}`}>
                        <i
                          title="Edit"
                          className="fa-solid fa-pen-to-square px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full text-gray-400 text-sm"
                        ></i>
                      </Link>
                      <i
                        title="Delete"
                        onClick={() => handlStoreOjectID(v.slug)}
                        className="fa fa-solid fa-trash px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full text-red-400 text-sm"
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Pagination start  ------------------------------ */}

          {/* <div className=" flex items-center justify-end pr-10 gap-5 w-full py-5 border-b border-gray-100 bg-gray-50">
            <span className=" whitespace-nowrap flex items-center justify-center text-sm text-slate-500">
              {productData?.page} of {productData?.ending} to{" "}
              {productData?.count}
            </span>
            <div className="flex border gap-4 px-4 py-1 rounded-full">
              <button disabled={productData?.starting == 1}>
                <i
                  onClick={() => {
                    setFilterByName({
                      ...FilterByName,
                      page: FilterByName.page - 1,
                    });
                  }}
                  className={`fa-solid fa-angle-left p-1 text-orange-600 text-xs border-r pr-4 ${
                    productData?.starting == 1
                      ? "cursor-not-allowed text-slate-300"
                      : "cursor-pointer hover:text-orange-500"
                  }`}
                ></i>
              </button>

              <button disabled={productData?.ending >= productData?.count}>
                <i
                  onClick={() => {
                    setFilterByName({
                      ...FilterByName,
                      page: FilterByName.page + 1,
                    });
                  }}
                  className={`fa-solid fa-angle-right text-orange-600 text-xs p-1 ${
                    productData?.ending >= productData?.count
                      ? "cursor-not-allowed text-slate-300"
                      : "cursor-pointer hover:text-orange-500"
                  }`}
                ></i>
              </button>
            </div>
          </div> */}
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
            <i onClick={()=>setShowForm(false)} className="bx bx-x text-white text-xl cursor-pointer"></i>
          </div>
          <div className=" flex flex-col items-center justify-center ">
            <p className=" text-md text-white mb-3">
              Are you sure you want delete?
            </p>
            <div className=" mt-3">
              <button onClick={()=>setShowForm(false)} className=" border border-slate-500 text-slate-500 py-1 px-6 text-sm ">
                Cancel
              </button>
              <button onClick={delPost} className=" bg-indigo-400  border ml-4 border-indigo-400  text-white py-1 px-6 text-sm ">
                {" "}
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
