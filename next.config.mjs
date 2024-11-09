/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/userAccess',
          permanent: true,
        },
      ];
    },
  };
  
  export default nextConfig;
  