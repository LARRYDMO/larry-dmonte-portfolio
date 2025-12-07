import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');
const enableTurbopack = process.env.NEXT_PRIVATE_TURBOPACK !== '0' && process.env.TURBOPACK !== '0';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  // Keep turbopack custom loader when enabled; allow falling back to webpack when disabled via env.
  ...(enableTurbopack ? {
    turbopack: {
      rules: {
        "*.{jsx,tsx}": {
          loaders: [LOADER]
        }
      }
    },
  } : {}),
  webpack: (config) => {
    // Mirror the turbopack loader so webpack builds behave the same.
    config.module.rules.push({
      test: /\.[jt]sx?$/,
      use: [{ loader: LOADER }],
      exclude: /node_modules/,
    });
    return config;
  },
};

export default nextConfig;
