/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [process.env.URL_AWS_S3], 
    },
};

export default nextConfig;
