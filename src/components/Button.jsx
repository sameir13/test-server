import Link from "next/link";
import React from "react";

const Button = ({ text, isButton, href, solid }) => {


  
  var styleSolid = `bg-primary inline-block text-sm font-[ar] py-[12px] bg-[#1A1DB1] px-10 rounded-lg text-white `;


  return (
    <>
      {isButton ? (
        <Button className={styleSolid}>{text || "Untitled"}</Button>
      ) : (
        <Link className={styleSolid} href={href || "/"}>
          {text || "Untitled"}
        </Link>
      )}
    </>
  );
};

export default Button;