/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverActions: { bodySizeLimit: "25mb" },
    // The site reads data/db.json at request time; make sure it ships with the server bundle (Vercel).
    outputFileTracingIncludes: { "/**": ["./data/db.json"] },
  },
};

export default nextConfig;
