import React from "react";
import Button from "./Button";

const Landing = () => {
  return (
    <div className=" flex items-center justify-center  min-h-full flex-col">
      <h1 className=" text-white  text-4xl   md:text-[70px] font-bold mb-9 text-center">
        Welcome to BGTV
      </h1>
      <Button text={"Get Started"} solid={true} />
    </div>
  );
};

export default Landing;
