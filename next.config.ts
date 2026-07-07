import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
  },
  sassOptions: {
    implementation: 'sass',
    // This tells Sass to use the modern API and silences fallback warnings
    silenceDeprecations: ['legacy-js-api'], 
  },
};

export default nextConfig;
