"use client";
import axios from "axios";
import { SessionData } from "@/app/context";
import { Toaster, toast } from "react-hot-toast";
import React, { useContext, useState } from "react";

const page = () => {
  const { user } = useContext(SessionData);
  const [userImage, setUserImage] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [register, setRegister] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    isAdmin: false,
  });

  const handleRegister = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      var newtype = type === "checkbox" ? checked : value;
      setRegister({ ...register, isAdmin: newtype });
      return;
    }

    setRegister({ ...register, [name]: value });
  };

  const uploadImageToCloudinary = async () => {
    try {
      const data = new FormData();
      data.append("file", userImage);
      data.append("upload_preset", "blog-image");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dmyrswz0r/image/upload",
        {
          body: data,
          method: "POST",
        }
      );
      const jsonRes = await res.json();
      console.log(jsonRes.secure_url);
      return jsonRes.secure_url;
    } catch (error) {
      alert("Something wrong! while Uplading images");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsloading(true);
      var imageURL = await uploadImageToCloudinary();
      const res = await axios.post("/api/auth/register", {
        ...register,
        avatar: imageURL,
      });
      if (res.status === 201) {
        toast.success("Registered!!!!!!");
        setRegister({
          fullName: "",
          email: "",
          phone: "",
          gender: "",
          password: "",
          isAdmin: false,
        });
        setUserImage(null);
        setShowForm(false);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setIsloading(false);
    }
  };

  const registerJson = [
    {
      placeholder: "full name",
      type: "text",
      value: register.fullName,
      name: "fullName",
      required: false,
    },
    {
      placeholder: "email",
      type: "email",
      value: register.email,
      name: "email",
      required: false,
    },
    {
      placeholder: "phone number",
      type: "number",
      value: register.phone,
      name: "phone",
      required: false,
    },
    {
      placeholder: "password",
      type: "password",
      name: "password",
      value: register.password,
      required: false,
    },
  ];

  return (
    <>
      <Toaster />
      <div className="bg-white relative mt-4 max-w-5xl m-auto rounded-lg">
        {/* Edit and Update Buttons ================================ */}
        <div className="flex justify-end items-end gap-3 pt-6 px-4">
          {user?.isAdmin && (
            <button
              onClick={() => setShowForm(true)}
              href="/portal/profile/edit"
              className=" border rounded-md text-gray-600 bg-gray-100  border-gray-200 hover:bg-gray-50 text-sm flex gap-1 items-center px-3 py-1 transition-all duration-150:"
            >
              <i className="fa-solid fa-pen-to-square text-gray-500"></i>
              Add User
            </button>
          )}
        </div>
        {/* User Full Information ================================== */}
        <div className="shade rounded-lg py-10 flex items-center flex-col justify-center">
          {user ? (
            <div>
              <div className="max-w-full m-auto">
                <div className="h-fit w-fit border-[10px] border-[#eeeeee9c] rounded-full max-w-full m-auto">
                  <img
                    alt="image here"
                    src={
                      user.avatar ||
                      "data:image/png;base64,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"
                    }
                    className="h-60 w-60 border-[10px] object-cover border-[#c9c9c9cc] rounded-full"
                  />
                </div>
              </div>

              {/* User Info ----------------------------------------------- */}
              <div className="flex items-center justify-center flex-col mt-6">
                <h1 className="capitalize text-3xl mb-3 text-slate-800 font-bold tracking-wider">
                  {user.fullName}
                </h1>
                <h2 className="text-[#6c757d] text-xs uppercase tracking-wide">
                  {user.userName}
                </h2>
              </div>
              {/* Inner Divs ----------------------------------------------- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {/* Email ----------------------------------------------- */}
                <div className="px-6 py-2 flex items-center gap-4 shadow-md rounded-lg">
                  <i className="fa-solid fa-envelope text-xl text-gray-400"></i>
                  <div>
                    <p className="text-xs text-[#00000084] mb-1">Email</p>
                    <span className="text-[#444] text-sm">{user.email}</span>
                  </div>
                </div>
                {/* Phone ----------------------------------------------- */}
                <div className="px-4 py-2 flex items-center gap-2 shadow-md rounded-lg">
                  <i className="fa-solid fa-phone text-gray-400"></i>
                  <div>
                    <p className="text-xs text-[#00000084] mb-1">Phone</p>
                    <span className="text-[#444] text-sm">
                      +92 {user.phone}
                    </span>
                  </div>
                </div>
                {/* User Role ---------------------------------------------- */}
                <div className="px-6 py-2 flex items-center gap-3 shadow-md rounded-lg">
                  <i className="fa-solid fa-user-secret text-lg text-gray-400"></i>
                  <div>
                    <p className="text-xs text-[#00000084] mb-1">User Role</p>
                    <span className="text-[#444] text-sm">
                      {user.isAdmin ? "Admin" : "User"}
                    </span>
                  </div>
                </div>
                {/* Gender ----------------------------------------------- */}
                <div className="px-4 py-2 flex items-center gap-3 shadow-md rounded-lg">
                  <i className="fa-solid fa-user text-gray-400 text-lg"></i>
                  <div>
                    <p className="text-xs text-[#00000084] mb-1">Gender</p>
                    <span className="text-[#444] text-sm">
                      {user.gender || "Male"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <span className="text-red-600 text-2xl">
              Opps! Profile Not Found...
            </span>
          )}
        </div>
      </div>

      {/* Model for the adding user and for user and updating it-------------------- */}
      <div
        style={{
          visibility: showForm ? "visible" : "hidden",
          opacity: showForm ? "1" : "0",
          transition: ".4s",
        }}
        className="fixed z-10 top-0 left-0 w-full h-screen   backdrop-blur-[2px] bg-[#00000094] overflow-auto"
      >
        <form action="" className="" autoComplete="off" onSubmit={handleSubmit}>
          <div
            className={`${
              showForm ? "scale-100 opacity-100" : "scale-0 opacity-0"
            } bg-white duration-500 mx-auto mb-2 mt-8 relative  p-4 w-full max-w-[100%] md:max-w-[700px] m-auto border rounded-lg max-h-[92vh] overflow-x-auto`}
          >
            {/* go-back btn------------------------------------------------ */}
            <div
              onClick={() => setShowForm(false)}
              className=" bg-slate-300 absolute group  right-3 flex hover:bg-slate-300 cursor-pointer rounded-[100%] p-1 top-2  "
            >
              <i class="bx bx-x text-lg  group-hover:text-black transition-all duration-150 text-slate-500"></i>
            </div>

            {/* -------------------------- UPLOAD NEW BLOG HERE -------------------------------------- */}
            <div className="p-6 ">
              <div className=" relative group  m-auto mb-7 border-4 border-slate-400 shadow-xl w-[150px] h-[150px] rounded-[100%] overflow-hidden ">
                <img
                  className="w-full h-full object-cover"
                  src={
                    userImage
                      ? URL.createObjectURL(userImage)
                      : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALAAAACUCAMAAAAEVFNMAAAAMFBMVEXk5ueutLe+wsXn6eqrsbTU19nh4+S4vcDHy820ubzR1Nbc3+DAxcfM0NLq7O3Z3N2JvUspAAAENklEQVR4nO2c23LjIAxAbYursfH//+2CkybNHZAi0R2fh047+3JGI4MAaYfh4ODg4ODg4ODg4ODg4ODvAjAMJnH+tW+SYdjm1S0Zt85bGHp2Btjc5Ed1ZbTTGnqNM8Dqx1GNt6S//dyjMgSn7mWv0inM0oK3gHEPsb1R9mtXyRy1f6e7K9stSmv+AMPySXdXXjqJMYSP4f0JcpB2zcDndLgY+00+yKBLdXdl+dWiyjcZC8e4Lr4Zv4n6br7SN+WxERQ2xd/bb2O59ThO9b7J2EmlMcwtvgktYwymOoHPIbZCaVy0IT81lkmKrVE3G0uEGJq+uLPwIrBSbO2+Cf4QR4sS5i81Dcp39NyVJjiU76hm5hAbixSeeLMYNM535P7sYMWlcAqxZhU2zbvcRZh3nWgtI37DuncEbIBTiFkjXH0yeiLMeVYCRyC8MoYYU/hc4CyAgOCbGydG4UghbDmFCXxHz5jDkSCFD+H/S5jAd7Scwn9tWQNk+b7DunFQbM2stymtt2q/hVlv2HCXEidh1jOSQfuOirWAxx6a8xUm720V+qtjLYcRd9lXYearn4DdOrgvtWFCBtjx+jY80N3B/sAION+JWRd9WcV9eZnBfHactfAFxMrGfju8Y5ofDdQk8uwFc3OEhV70W8t4ueaftqVNWSHd1ocDyTaalqOSzApxofrpgL2IuKP24lWuu+NClbFapHWHKmPpfDhR/uUxH4teEuei5irlhXp9HoFQkBZqkW9jvJIOpZ+UuwnvCRicf91Srrzrrw0ewmqfKitlu2uBPwFmW9Sdc/rTbaZL3R2IYZ78+fDkvV9WE/u1PQExT8torTczxO5t8/gJxCvQ37d2IbsZneeQJmut9+nHNOVxJGM6086iQa+LPQ8h3X5zO35a9RZMD9NfEYJ2J9e321z6Zz+5eRtEszqtCc7m6a4Pm9x1ifN20SDToZ3y4HHVLdO22rAPJoHRrjiyT5yXmXXKLhpn3w53FSj7ZeNSBrM8zvk1OI+Wo4BLu9jzEqfNWX+5zADQC5nurvzdwcCcDJS6u7L92sUKmNdTnzjlr7x3wFA+N1drrBx9Kqds+Ep4z8pWE29/Ed/g/AHSdg/Atwt/RFm6cx8E3AhEofE4EwU5BvK17IUyzc0mQX9+sTHF+yisbL77sAQ2yJGgf6rG2CJ3avz4Q7UxKsbsvsg8Rrx1YoybQwxBwDevbq3rMcV0SZNx68sCxShBE23j8AIf3A9tr9HIkUSccUMakzRhtxtXl26CCbFT3W8utUJcqDyaUrRgo6id30e3VuKNqxZj6QzOVLW2IfsUSagZEER3gpJQ0cIdKcY08JS3RBO05BNQfiZlPca9obiUJ5n4JKC4aMPPPBBReEPf8N8jfQe1FmYEwaARCWop25572OZOlNYT0oXPlULhSfVC4dbhpl4oFIZuKPPtm3+Mgjt8yd+5mgAAAABJRU5ErkJggg=="
                  }
                />

                {userImage && (
                  <label className="absolute -bottom-6 left-1/2 -translate-x-1/2 group-hover:bottom-0 group-hover:opacity-100 opacity-0 transition-all cursor-pointer">
                    <i
                      onClick={() => setUserImage("")}
                      className={
                        "bx bx-trash bg-[#0000007c] text-white w-[200px] py-1 text-center"
                      }
                    ></i>
                  </label>
                )}

                {!userImage && (
                  <label
                    htmlFor="photo"
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 group-hover:bottom-0 group-hover:opacity-100 opacity-0 transition-all cursor-pointer"
                  >
                    <i
                      className={
                        "fa-solid fa-camera bg-[#0000007c] text-white w-[200px] py-1 text-center"
                      }
                    ></i>
                  </label>
                )}

                <input
                  type="file"
                  id="photo"
                  className="hidden"
                  onChange={(e) => setUserImage(e.target.files[0])}
                />
              </div>

              <div className=" grid  place-items-center gap-2 grid-cols-2 w-[100%]">
                {registerJson?.map((v, i) => (
                  <div key={i}>
                    <input
                      type={v.type}
                      name={v.name}
                      id={v.name}
                      value={v.value}
                      placeholder={v.placeholder}
                      onChange={handleRegister}
                      className="formInps"
                    />
                  </div>
                ))}
                <div className=" flex items-center gap-5">
                  <div className="  flex items-center gap-3 bg-blue-100 px-3 py-2 rounded-3xl ">
                    <input
                      type="radio"
                      value={"Male"}
                      name="gender"
                      onChange={handleRegister}
                      className=" border-none"
                    />
                    <label className=" text-sm text-slate-500" htmlFor="Male">
                      Male
                    </label>
                  </div>

                  <div className="  flex items-center gap-3 bg-blue-100 rounded-3xl px-3 py-2 ">
                    <input
                      type="radio"
                      value={"Female"}
                      name="gender"
                      onChange={handleRegister}
                      className=" border-none"
                    />
                    <label className=" text-sm  text-slate-500" htmlFor="Male">
                      Female
                    </label>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-indigo-200 px-3 py-2 w-fit  rounded-3xl">
                  <input
                    type="checkbox"
                    value={register.isAdmin}
                    name="isAdmin"
                    onChange={handleRegister}
                    className=" border-none rounded-md"
                  />
                  <label className="text-sm text-slate-600" htmlFor="">
                    Admin
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className=" w-full max-w-[100%] md:max-w-[700px] m-auto">
            <button
              type="submit"
              disabled={isLoading}
              className=" bg-indigo-300 w-full py-2  rounded-md  text-md text-white shadow-lg  "
            >
              {isLoading ? "Wait.." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;
