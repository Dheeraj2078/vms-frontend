const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    entry1: "./src/app/ui/login/login.js",
    entry2: "./src/app/ui/login/changePassword/changePassword.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        // loader: "html-loader",
        use: ["html-loader"],
      },
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
  ],
};
