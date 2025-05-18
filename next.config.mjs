/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.com",
            },
            {
                protocol: "https",
                hostname: "**.com.vn",
            },
            {
                protocol: "https",
                hostname: "**.*",
            },
            {
                protocol: "http",
                hostname: "**.*",
            }
        ],
        unoptimized: true,
    },
};

export default nextConfig;
