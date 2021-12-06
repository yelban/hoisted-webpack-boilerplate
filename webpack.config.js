const path = require('path');
const webpack = require('webpack');
// const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const StylelintPlugin = require('stylelint-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const target = process.env.TARGET || 'web';

module.exports = {

  mode: env,

  target: env === 'development' ? 'web' : 'browserslist',

  entry: {
    index: path.resolve(__dirname, './src/public/js/index.js'),
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    // assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },

  devServer: {
    // hot: true,
    open: true,
    compress: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: ('babel-loader'),
            // loader: require.resolve('babel-loader'),
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          (env === 'development' ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //   publicPath: '../',
            // },
          }),
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, './dist/css/'),
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, 'postcss.config.js'),
                // plugins: [
                //     [
                //         "postcss-import", {}
                //     ],
                //     [
                //         "postcss-preset-env",
                //         {
                //             browsers: [
                //                 'last 2 versions',
                //                 'ie > 10',
                //             ],
                //             // stage: 0,
                //         },
                //     ],
                // ],
              },
            },
          },
        ],
      },
      {
        test: /\.(sa|sc)ss$/i,
        use: [
          (env === 'development' ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //   publicPath: '../',
            // },
          }),
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // type: 'asset/resource',
        type: 'asset',
        generator: {
          filename: 'assets/pic/[name]_[hash:6][ext][query]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 1 * 1024, // 1kb
          },
        },
        // loader: 'url-loader',
        // options: {
        //   limit: 1000,
        //   name: 'assets/pic/[name].[ext]',
        // },
        // type: 'javascript/auto',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name]_[hash:6][ext][query]',
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
      'process.env.TARGET': JSON.stringify(target),
    }),

    ...(env === 'production' ? [
      // new CssMinimizerPlugin(),
    ] : [
      // Development only plugins
    //   new webpack.HotModuleReplacementPlugin(),

    ]),

    new webpack.ProgressPlugin(),

    // new ESLintWebpackPlugin({
    //   // overrideConfigFile: path.resolve(__dirname, '.eslintrc.js'),
    //   // context: path.resolve(__dirname, './src/public/js'),
    //   // files: '**/*.js',
    // }),

    // new StylelintPlugin({
    //     // configFile: path.resolve(__dirname, '.stylelintrc.js'),
    //     // context: path.resolve(__dirname, '../src/public/css'),
    //     // files: '**/*.css',
    //     fix: true,
    // }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),

    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/public/index.html',
      inject: 'body',
      minify: env === 'production' ? {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      } : false,
    }),

  ],

  optimization: {
    // Webpack enable CSS optimization only in production mode
    // If you want to run it also in development set the optimization.minimize option to true
    // minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers
      // (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },

};
