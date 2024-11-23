const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDev = process.env.NODE_ENV === "development" ? true : false;

const envFile = isDev ? "./.env.development" : "./.env.production";

const plugins = [
  new HtmlWebpackPlugin({
    template: "./src/index.html", // 指定 HTML 模板
    favicon: "./src/public/favicon.png", // 指定 favicon 路径
  }),
  new Dotenv({ path: envFile }),
]

if (!isDev) {
  plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'server', // 在浏览器中展示报告
    openAnalyzer: true,    // 打包后自动打开报告页面
  }))
}

module.exports = {
  entry: "./src/index.tsx", // 入口文件改为 TypeScript
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js", // 打包后的文件名
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 将 @ 映射到 src 目录
    },
    extensions: [".ts", ".tsx", ".js"], // 添加 TypeScript 文件支持
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // 处理 TypeScript 文件
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.(js|jsx)$/, // 处理 JS 和 JSX 文件
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i, // 处理 CSS 文件
        use: ["style-loader", "css-loader"], // 使用 style-loader 和 css-loader
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // 匹配图片文件
        type: "asset/resource",
      },
    ],
  },
  plugins: plugins,
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8083,
  },
  mode: isDev ? "development" : "production",
};
