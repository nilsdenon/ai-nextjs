/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'photofolio.damienpierre.com',
            port: '',
            
          },
        ],
      },
};

export default nextConfig;
