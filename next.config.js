/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  },
};

module.exports = nextConfig;
