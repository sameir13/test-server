/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URI:
      "mongodb+srv://test:123@cluster0.ya051ny.mongodb.net/test?retryWrites=true&w=majority",
  },
};

export default nextConfig;
