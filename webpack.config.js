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
    static: {
      directory: path.resolve(__dirname, "dist"), // Serve files from the 'dist' directory
    },
    // compress: true, // Enable gzip compression for everything served
    port: 9000, // Specify a port number
    // open: true, // Open the default browser when webpack-dev-server starts
    hot: true,
    watchFiles: ["./src/**/*"],
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
