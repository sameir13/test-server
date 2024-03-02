/** @type {import('next').NextConfig} */
const nextConfig = {


  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "**",
      },
    ],
  },


  env: {
    MONGO_URI:
      "mongodb+srv://test:123@cluster0.ya051ny.mongodb.net/test?retryWrites=true&w=majority",
      SECURE_URL: "CODEWITHEDIFY",
  },
};

export default nextConfig;
