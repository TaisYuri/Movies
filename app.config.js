
import 'dotenv/config';

const api_key= process.env.API_KEY;

export default{
  expo: {
    name: "Movies",
    slug: "Movies",
    icon: "./src/assets/popcorn.png",
    version: "1.0.0",
    assetBundlePatterns: [
      "**/*"
    ],
    extra: {
      api_key:api_key,
      eas: {
        projectId: "7d8718d2-abed-4263-bc19-5ed2bbb57097"
      }
    },
    ios: {
      bundleIdentifier: "com.taisyuri.movies",
      buildNumber: "1.0.0"
    },
    android: {
      package: "com.taisyuri.movies",
      versionCode: 1
    },
    runtimeVersion: "1.0.0",
    updates: {
      url: "https://u.expo.dev/7d8718d2-abed-4263-bc19-5ed2bbb57097"
    }
  }
}
