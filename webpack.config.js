const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const isDev = process.env.NODE_ENV === "development" ? true : false;
const envFile = isDev ? "./.env.development" : "./.env.production";
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
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 指定 HTML 模板
    }),
    new Dotenv({ path: envFile }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8083,
  },
  mode: "development", // 开发模式
};
