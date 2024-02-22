import Image from "next/image";
import React from "react";

const Page = () => {
  const loginJSON = [
    {
      labelText: "Email address",
      type: "email",
    },
    {
      labelText: "Password",
      type: "password",
    },
  ];

  return (
    <div className=" border border-red-300 flex h-[100vh] justify-center items-center">
      <div className=" m-auto w-[100%] border border-red-400 max-w-[700px] grid grid-cols-2 shadow-md">
        <div>
          <Image
            width={400}
            height={400}
            src={"/assets/home/form.jpg"}
            className="w-full h-auto object-cover"
          ></Image>
        </div>

        <form className=" p-9 rounded-[20px] ">
          <Image
            width={400}
            height={400}
            className="  w-[50px] shadow-lg p-1 "
            src={"/assets/home/navlogo.png"}
          ></Image>

          {loginJSON?.map((v, i) => (
            <div key={i}>
              <div className="flex flex-col my-5">
                <label
                  htmlFor=""
                  className=" text-xs block mb-3 text-blue-300 font-thin"
                >
                  {v.labelText}
                </label>
                <input
                  autoComplete="off"
                  className="border  text-sm text-gray-700  border-blue-300 bg-transparent px-4  py-2 rounded-3xl"
                  type={v.type}
                />
              </div>
            </div>
          ))}

          <button
            type="submit"
            className=" bg-[#1A1E5D] w-full text-white text-sm font-thin py-2 rounded-3xl mt-3"
          >
            Log in
          </button>

          <div className="LoginFormGetInTouch">Get In Touch</div>
          
        </form>
      </div>
    </div>
  );
};

export default Page;
