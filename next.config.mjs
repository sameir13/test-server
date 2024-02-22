/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URI:
      "mongodb+srv://test:123@cluster0.ya051ny.mongodb.net/test?retryWrites=true&w=majority",
      SECURE_URL: "CODEWITHEDIFY",
  },
};

export default nextConfig;
