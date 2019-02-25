const path = require('path');
const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');  
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');   
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const pro = require('./webpack/webpack.pro.js'); //生产配置
const dev=require('./webpack/webpack.dev.js'); //开发配置

let config=process.env.NODE_ENV=='dev'?dev:pro; //配置切换
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}


const assetsPath = function (_path) {
  const assetsSubDirectory =  'production';

  return path.posix.join(assetsSubDirectory, _path)
}
console.log(process.env.NODE_ENV);

module.exports = {
    mode:process.env.NODE_ENV=='dev'?'development':'production',  //有development和production两种打包模式
    //写入
    entry:config.entry,
    //输出
    output:config.output,
    resolve: config.resolve,
    module:config.module,
    plugins: config.plugins,
    devServer: config.devServer
}