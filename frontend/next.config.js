/** @type {import('next').NextConfig} */
const path = require("path");

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "./src/app/styles")],
  },
};

module.exports = withPWA(nextConfig);
