const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const filename = (ext) => isProd? `[name].[contenthash].${ext}` : `[name].${ext}`
const babelOptions = (preset) => {
    const opts = {
        presets: ['@babel/preset-env']
      }

    if(preset){
        opts.presets.push(preset)
    }
    return opts
}

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: 'index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/favicon.ico"),
                    to: path.resolve(__dirname, "dist")
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }), 
        new ESLintPlugin({

        })
    ]
    
    if(isProd){
        base.push(new BundleAnalyzerPlugin())
    }
    return base
}
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main:['@babel/polyfill', './index.js'],
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            "@": path.resolve(__dirname, 'src'),
            "@core": path.resolve(__dirname, 'src/core')
        }
    },
    optimization: {
      splitChunks: {
          chunks: "all"
      },
      runtimeChunk: 'single',
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserWebpackPlugin()
      ],   
    },
    devServer: {
        // historyApiFallback: true,
        // open: true,
        hot: isDev,
        port: 3000
    },
    devtool: isProd ? false : 'source-map',
    plugins: plugins(),
    module:{
        rules: [
            {
                test: /.s?css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", 'sass-loader'],
            },
            {
                test: /.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
            },
            
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelOptions()
                  }
              },
        ]
    }
}