import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Suppress performance measurement errors in development
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Enable instrumentation to suppress performance errors
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
