const webpack = require("webpack");
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    entry1: "./src/app/ui/login/login.js",
    entry2: "./src/app/ui/login/changePassword/changePassword.js",
    home: "./src/app/ui/home/home.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    allowedHosts: "all",
    static: {
      directory: path.resolve(__dirname, "./src/app/ui"), // Serve files from the 'dist' directory
    },
    port: 4000, // Specify a port number
    hot: false,
    liveReload: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        // loader: "html-loader",
        use: ["html-loader"],
      },
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   use: [
      //     {
      //       loader: "file-loader",
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      title: "login",
      template: "./src/app/ui/login/login.html", // Path to your HTML template
      filename: "index.html", // Output HTML file name
      inject: false,
    }),
    new htmlWebpackPlugin({
      title: "Change Password",
      template: "./src/app/ui/login/changePassword/changePassword.html", // Path to another HTML template
      filename: "changePassword.html", // Output HTML file name
      inject: false,
    }),
    new htmlWebpackPlugin({
      title: "Home",
      template: "./src/app/ui/home/home.html", // Path to another HTML template
      filename: "home.html", // Output HTML file name
      inject: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
