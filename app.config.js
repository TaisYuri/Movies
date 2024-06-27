/* eslint-disable camelcase */
import 'dotenv/config';

const api_key = process.env.API_KEY;
const access_token = process.env.ACCESS_TOKEN;

export default {
  expo: {
    name: 'Movies',
    slug: 'Movies',
    icon: './src/assets/popcorn.png',
    version: '1.0.0',
    jsEngine: 'hermes',
    packagerOpts: {
      config: 'metro.config.js',
      sourceExts: ['js', 'jsx', 'ts', 'tsx', 'svg'],
    },
    assetBundlePatterns: ['**/*'],
    extra: {
      // eslint-disable-next-line camelcase
      api_key,
      access_token,
      eas: {
        projectId: '7d8718d2-abed-4263-bc19-5ed2bbb57097',
      },
    },
    ios: {
      bundleIdentifier: 'com.taisyuri.movies',
      buildNumber: '1.0.0',
      jsEngine: 'hermes',
    },
    android: {
      package: 'com.taisyuri.movies',
      versionCode: 1,
      jsEngine: 'hermes',
      hermesEnabled: true,
      api_key: process.env.API_KEY,
      access_token: process.env.ACCESS_TOKEN,
    },
    runtimeVersion: 'exposdk:47.0.0',

    updates: {
      url: 'https://u.expo.dev/7d8718d2-abed-4263-bc19-5ed2bbb57097',
    },
  },
};
