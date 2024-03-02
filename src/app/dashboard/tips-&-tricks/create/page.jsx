"use client";
import axios from "axios";
import { useContext } from "react";
import React, { useState } from "react";
import { Rating } from "primereact/rating";
import { SessionData } from "@/app/context";
import { Editor } from "@tinymce/tinymce-react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const [file, setFile] = useState("");
  const { user } = useContext(SessionData);
  const [isFetching, setIsFetching] = useState(false);
  
  const [tricksData, setTricksData] = useState({
    title: "",
    metaTitle: "",
    metaDesc: "",
    desc: "",
    imgAlt: "",
    rating: 0,
    category: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setTricksData({ ...tricksData, [name]: value });
  };

  const UploadImageToCloudinary = async () => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "blog-image");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dmyrswz0r/image/upload",
        {
          body: data,
          method: "POST",
        }
      );
      const jsonImg = await res.json();
      return jsonImg.secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsFetching(true);
      const imageURL = await UploadImageToCloudinary();
      const res = await axios.post("/api/tips/add-tips", {
        ...tricksData,
        imgUrl: imageURL,
        author: user?._id,
      });
      if (res?.data?.success) {
        toast.success("Posted");
        router.push("/dashboard/tips-&-tricks");
        setTricksData({
          title: "",
          metaTitle: "",
          metaDesc: "",
          desc: "",
          imgAlt: "",
          rating: 0,
          category: "",
        });
        setFile("");
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div>
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="shadow-lg bg-white p-6 w-full max-w-[700px] m-auto rounded-lg"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-3xl font-bold border-b border-b-neutral-200 pb-2">
              Add <span className="text-indigo-600">Tips & Tricks</span>
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-1 lg:grid-cols-1">
              {/* Blog Title --------------*/}
              <div className="col-span-full">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                    <input
                      required
                      type="text"
                      onChange={handleInput}
                      value={tricksData.title}
                      name="title"
                      autoComplete="off"
                      id="title"
                      placeholder="Enter the title"
                      className="block flex-1 p-2 border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              {/*  Meta Title --------------*/}
              <div className="col-span-full">
                <label
                  htmlFor="metaTitle"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Meta Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                    <input
                      required
                      type="text"
                      autoComplete="off"
                      name="metaTitle"
                      onChange={handleInput}
                      value={tricksData.metaTitle}
                      id="metaTitle"
                      placeholder="Enter the Meta Title"
                      className="block flex-1 p-2 border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              {/* Rating --------------*/}
              <div className=" relative flex items-center gap-1 flex-col my-4 border py-7">
                <label
                  htmlFor=""
                  className=" top-[-11px] px-2 text-indigo-500 text-sm left-5 absolute bg-white"
                >
                  Rating
                </label>

                <Rating
                  className="text-indigo-600"
                  value={tricksData.rating}
                  onChange={(e) =>
                    setTricksData({ ...tricksData, rating: e.value })
                  }
                  cancel={false}
                />
              </div>

              {/* Category */}
              <div className="my-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <select
                  className=" w-full mt-2 block bg-transparent border rounded-lg text-sm text-slate-400 py-2  border-slate-300"
                  name="category"
                  value={tricksData.category}
                  onChange={handleInput}
                  id="category"
                >
                  <option value="Reading">Reading</option>
                  <option value="Writing">Writing</option>
                  <option value="Listening">Listening</option>
                </select>
              </div>

              {/*  Meta Description */}
              <div className="col-span-full">
                <label
                  htmlFor="Metadesc"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Meta Description
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                    <input
                      required
                      type="text"
                      name="metaDesc"
                      autoComplete="off"
                      onChange={handleInput}
                      value={tricksData.metaDesc}
                      id="metaDesc"
                      placeholder="Enter the Meta Description"
                      className="block flex-1 p-2 border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              {/* JODID FOR DESCRIPTION HERE */}
              <div className="col-span-full mt-2">
                <label htmlFor="desc" className=" block mb-2">
                  Description
                </label>
                <Editor
                  apiKey="ruv335lzevajkplnqsirffyzmr5zed52yl2g4rt36rv2phx3"
                  value={tricksData.desc}
                  onEditorChange={(content) =>
                    setTricksData({
                      ...tricksData,
                      desc: content,
                    })
                  }
                  init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo blocks " +
                      "bullist numlist " +
                      "table image removeformat code fullscreen",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </div>

              {/* IMAGES UPOLOAD HERE ------------------*/}
              <div className="col-span-full mt-2">
                <div className="avatar-upload">
                  {file ? (
                    <div className=" relative border border-slate-300 p-3 rounded-md my-3 ">
                      <i
                        class="bx bx-x  bg-slate-400 absolute top-[-10px] right-[-10px] text-lg rounded-[100%] text-white cursor-pointer p-1 "
                        onClick={() => setFile(null)}
                      ></i>
                      <Image
                        width={500}
                        height={400}
                        className=" w-full  h-auto object-contain aspect-[3/2]  "
                        src={URL.createObjectURL(file)}
                        alt="Image here"
                      ></Image>
                    </div>
                  ) : (
                    <>
                      <label
                        htmlFor="avatarinput"
                        style={{ cursor: "pointer" }}
                      >
                        <div className=" border-dotted border-2 hover:border-none cursor-pointer text-indigo-500 text-sm rounded-md hover:bg-indigo-300 transition-all duration-200 hover:text-white border-indigo-500 min-h-[10vh]  flex justify-center items-center">
                          Select Image
                        </div>
                      </label>
                      <input
                        id="avatarinput"
                        style={{ display: "none" }}
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </>
                  )}
                </div>
              </div>

              {/*  Image Alternate Text */}
              <div className="col-span-full mb-3">
                <label className="FormLabelControl" htmlFor="imgAlt">
                  Image Alternate Text
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                    <input
                      type="text"
                      autoComplete="off"
                      onChange={handleInput}
                      name="imgAlt"
                      value={tricksData.imgAlt}
                      id="imgAlt"
                      placeholder="Enter the Image Alternate"
                      className="block flex-1 p-2 border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SUBMIT AND RESET BUTTONS */}
            <div className="mt-4 mr-1">
              <button
                disabled={isFetching}
                type="submit"
                className="text-indigo-600 hover:bg-indigo-600 my-2 rounded-md text-center border border-indigo-600 cursor-pointer px-3 py-1 hover:text-white transition-colors"
              >
                {isFetching ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
