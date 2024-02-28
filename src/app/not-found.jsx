import Image from "next/image";

const Page = () => {
  return (
    <div className="  bg-white flex h-[100%] justify-center items-center ">
      <div className=" w-[30%]">
        <Image
          src={"/assets/notFound/404.webp"}
          width={400}
          height={400}
          alt="Not found Image"
          className=" w-full h-auto"
        ></Image>
      </div>
    </div>
  );
};

export default Page;
