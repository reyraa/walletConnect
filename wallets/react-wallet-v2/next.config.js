module.exports = {
  reactStrictMode: true,

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.net = false;
      config.resolve.fallback.fs = false;
      config.resolve.fallback.os = false;
      config.resolve.fallback.crypto = require.resolve('crypto-browserify');
      config.resolve.fallback.stream = require.resolve('stream-browserify');
      config.resolve.fallback.path = require.resolve('path-browserify');
    }

    return config
  },
}
