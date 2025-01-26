/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ducompagnon.fr"
            }
        ]
    }
};

export default nextConfig;
