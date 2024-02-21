import React from "react";

const Input = () => {
  return (
    <div className=" max-w-[600px] m-auto my-12 relative bg-white">
      <input
        type="text"
        placeholder="Search.."
        className={``}
      />
      <label className="absolute rounded-sm bg-white text-sm text-gray-500  duration-300 transform -translate-y-4 scale-[0.85] top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[0.85] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
        Program
      </label>
    </div>
  );
};

export default Input;
