const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;
console.log("Is dev ", isDev);

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssWebpackPlugin(), //deprecated
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const jsLoaders = () => {
  const loaders = ["babel-loader"];

  if (isDev) {
    loaders.push("eslint-loader");
  }

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    main: "./index.js",
    analytics: "./Analytics.ts",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/favicon.ico"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    // new BundleAnalyzerPlugin()
  ],
  resolve: {
    extensions: [".js", ".json", ".png"],
  },
  devServer: {
    port: 4200,
  },
  devtool: isDev ? "source-map" : "",
  optimization: optimization(),
  module: {
    rules: [
      {
        //если попадаются в импортах файлы, соответствующие регулярке
        test: /\.css$/,
        //то используй следующие лоадеры (идет справа налево, вот прикол)
        //css - позволяет понимать импорты с css,
        //style - прописывает стили из css в head у html (не нужен тк есть mini css)
        //minicss - складывает в css
        use: [MiniCssExtractPlugin.loader, /*"style-loader",*/ "css-loader"],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(ttf|wof|wof2|eot)/,
        use: ["file-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
};
