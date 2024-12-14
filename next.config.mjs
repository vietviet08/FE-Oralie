/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        domains: [process.env.URL_AWS_S3, process.env.URL_TT],
    },
};

export default nextConfig;
