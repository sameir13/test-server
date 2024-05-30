import React from "react";
import Link from "next/link";
import Image from "next/image";

const tableHeader = [
  { lable: "Date", align: "left" },
  { lable: "Name", align: "left" },
  { lable: "Category", align: "left" },
  { lable: "Author", align: "left" },
  { lable: "Actions", align: "center" },
];

const productData = [
  {
    createdAt: "2023-05-25T08:30:00Z",
    photo: "/images/photo1.jpg",
    title: "A Comprehensive Guide to React",
    categories: ["Programming", "JavaScript"],
    username: "john_doe",
    slug: "comprehensive-guide-react",
  },
  {
    createdAt: "2023-06-15T14:45:00Z",
    photo: "/images/photo2.jpg",
    title: "Understanding CSS Flexbox",
    categories: ["Web Development", "CSS"],
    username: "jane_smith",
    slug: "understanding-css-flexbox",
  },
  {
    createdAt: "2023-07-05T09:20:00Z",
    photo: "/images/photo3.jpg",
    title: "Mastering Python for Data Science",
    categories: ["Programming", "Python"],
    username: "alice_jones",
    slug: "mastering-python-data-science",
  },
  {
    createdAt: "2023-08-10T17:35:00Z",
    photo: "/images/photo4.jpg",
    title: "Exploring the Vue.js Framework",
    categories: ["Programming", "JavaScript"],
    username: "bob_martin",
    slug: "exploring-vuejs-framework",
  },
  {
    createdAt: "2023-09-20T11:00:00Z",
    photo: "/images/photo5.jpg",
    title: "Building Responsive Websites",
    categories: ["Web Development", "HTML", "CSS"],
    username: "charlie_brown",
    slug: "building-responsive-websites",
  },
];

const page = () => {
  return (
    <div>
      {/* dashboard vidoes home page tables  */}
      <div className="w-full mt-20">
        <div className="w-full  ">
          <div className="overflow-x-auto w-full  bg-[#0B192F]   border border-white/30 rounded-3xl shadow-lg flex-1 ">
            <div className="  p-4 flex justify-between items-center flex-col gap-3 lg:flex-row w-full">
              <h2 className="text-xl font-semibold bg-[#1A1DB1] px-3 py-1 rounded-2xl border border-white/30 shadow-2xl cursor-pointer">
                <span className="text-white">BGTV</span>
              </h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="">
                    <input
                      name="title"
                      // value={filterByName.title}
                      // onChange={searchInputHanler}
                      placeholder="Search here..."
                      className="relative border border-gray-200 text-gray-400 text-sm pl-3 px-2 py-[6px] lg:w-[12vw] w-[25vw] rounded-full focus:ring-2 transition-colors focus:outline-none focus:text-gray-400"
                    />
                    <span>
                      {/* {loading ? (
                      <i className="fa-solid fa-spinner absolute top-[30%] right-3 text-xs text-gray-500 dashboardSearchSlide"></i>
                    ) : (
                      <i className="absolute top-1/2 -translate-y-1/2 right-3 border-l pl-2 cursor-pointer text-gray-400 hover:text-gray-500 bx bx-search-alt-2"></i>
                    )} */}
                    </span>
                  </div>
                </div>
                <div className=" border border-white/25 bg-[#1A1DB1]  rounded-full shadow-lg cursor-pointer w-10 h-10 flex items-center justify-center  ">
                  <i className="fa-solid fa-pen text-white text-xl block"></i>
                </div>
              </div>
            </div>
            <table className="text-sm min-w-[1000px] w-full  text-left text-slate-100">
              <thead className="text-xs text-slate-100  bg-[#0B192F]">
                <tr>
                  {tableHeader.map((value, index) => {
                    return (
                      <th
                        scope="col"
                        key={index}
                        className={`px-6 py-3 text-lg text-${value.align}`}
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
                    <tr key={i} className="bg-[#0B192F] border border-white/15">
                      <td className="px-6 py-2 text-xs">
                        {new Date(v.createdAt).toLocaleDateString()}
                      </td>
                      <td
                        scope="row"
                        className="px-6 flex border-0 items-center py-2 font-medium text-slate-100 whitespace-nowrap"
                      >
                        <div className="w-10 h-10 mr-3 border border-slate-100 rounded-full overflow-hidden">
                          <img
                            className="w-full h-full object-cover"
                            src={
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrxE5ju4Mj9kq2dXf7JyKkwwoQbIzyeYjJ3g&s"
                            }
                            alt="Image Here"
                          />
                        </div>
                        {v.title.slice(0, 35) + "..."}
                      </td>
                      <td className="px-6 py-2"> {v.categories} </td>
                      <td className="px-6 py-2"> {v.username} </td>
                      <td className="px-6 py-2 text-lg text-center">
                        <Link href={`/blog/${v.slug}`}>
                          <i
                            title="View"
                            className="fa fa-solid fa-eye px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full text-gray-400 text-sm"
                          ></i>
                        </Link>
                        <Link href={`blog/${v.slug}`}>
                          <i
                            title="Edit"
                            className="fa-solid fa-pen-to-square px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full text-gray-400 text-sm"
                          ></i>
                        </Link>
                        <i
                          title="Delete"
                          // onClick={() => delPost(v.slug)}
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
                      ...filterByName,
                      page: filterByName.page - 1,
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
                      ...filterByName,
                      page: filterByName.page + 1,
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
      </div>
    </div>
  );
};

export default page;
