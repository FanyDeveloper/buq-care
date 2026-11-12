import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // qualidades usadas pelos componentes <Image quality={...}>
    qualities: [75, 85, 88, 90, 92],
  },
};

export default nextConfig;
