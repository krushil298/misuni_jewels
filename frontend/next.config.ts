import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Seeded product and category artwork. Remove this once every image
      // has been replaced with a local file or a Supabase Storage URL.
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      // Supabase Storage, for images uploaded through the admin.
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
};

export default nextConfig;
