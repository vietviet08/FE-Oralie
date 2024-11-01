/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['oralie-bucket.s3.ap-southeast-1.amazonaws.com'], // Add your S3 bucket hostname here
    },
};

export default nextConfig;
