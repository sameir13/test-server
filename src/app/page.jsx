"use client";
import React from "react";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter()
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsLogin({ ...isLogin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const login = await axios.post("/api/auth/login", isLogin, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (login?.data?.success) {
        toast.success("User Logged In");
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className=" border border-red-300 flex h-[100vh] justify-center items-center">
        <div className=" m-auto w-[100%]  max-w-[700px] grid grid-cols-2 globalShadow gap-5 py-10 px-9">
          <div className="flex ">
            <Image
              width={400}
              height={400}
              src={"/assets/home/form.jpg"}
              className="w-full h-auto object-cover"
              alt="Home page image"
            ></Image>
          </div>

          <form onSubmit={handleSubmit} className=" rounded-[20px]  ">
            <div className="flex flex-col my-6">
              <label
                htmlFor="email"
                className=" text-xs block mb-3 text-[#8965EA] font-thin"
              >
                Email address
              </label>
              <input
                autoComplete="off"
                className="border  text-sm text-gray-700  border-[#8965EA] bg-transparent px-4  py-2 rounded-3xl"
                type={"email"}
                value={isLogin.email}
                onChange={handleChange}
                name="email"
                id="email"
              />
            </div>

            <div className="flex flex-col my-6 relative">
              <label
                htmlFor=""
                className=" text-xs block mb-3 text-[#8965EA] font-thin"
              >
                Password
              </label>
              <input
                autoComplete="off"
                className="border  text-sm text-gray-700   border-[#8965EA] bg-transparent px-4  py-2 rounded-3xl"
                type={showPass ? "text" : "password"}
                value={isLogin.password}
                onChange={handleChange}
                name="password"
                id="password"
              />
              <i
                onClick={() => setShowPass(!showPass)}
                className={
                  showPass
                    ? " fa-regular fa-eye-slash absolute  bottom-[10px]  text-[#8965EA] cursor-pointer right-3"
                    : "fa-regular fa-eye absolute  bottom-[10px]  text-[#8965EA] cursor-pointer right-3"
                }
              ></i>
            </div>

            <button
              type="submit"
              className=" bg-[#8965EA] w-full text-white text-sm font-thin py-2 rounded-3xl mt-3"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            <div className="LoginFormGetInTouch">Get In Touch</div>

            <div className=" flex items-center gap-2 justify-center mt-5">
              <div className="bg-[#316FF6] w-[30px]  cursor-pointer  h-[30px] flex items-center justify-center p-1 rounded-[100%]">
                <i className="fa-brands text-white fa-facebook-f "></i>
              </div>
              <div className=" bg-black w-[30px]  cursor-pointer  h-[30px] flex items-center justify-center p-1 rounded-[100%]">
                <i className="fa-brands text-white fa-x-twitter"></i>
              </div>
              <div className="instaCss w-[30px]  cursor-pointer  h-[30px] flex items-center justify-center p-1 rounded-[100%]">
                <i className="fa-brands text-white fa-instagram"></i>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
