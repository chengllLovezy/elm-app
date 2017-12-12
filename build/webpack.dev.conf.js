'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

/*增加express*/
// const express = require('express');
// const app = express();
//
// let dataJson = require('../json/nav.json');
//
// let router = express.Router();
// app.use('/api',router)


const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true,
    } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },

    /*增加before*/
    // before(app){
    //   app.get('/api/foodNav',(req, res)=>{
    //     res.json({
    //       status:0,
    //       data:dataJson.foodNavList
    //     })
    //   });
    //   app.get('/api/adsBanner',(req, res)=>{
    //     res.json({
    //       status:0,
    //       data:dataJson.adsBanner
    //     })
    //   });
    //   app.get('/api/hotRecommend',(req, res)=>{
    //     res.json({
    //       status:0,
    //       data:dataJson.hotRecommend
    //     })
    //   });
    //   // 品质优选
    //   app.get('/api/qualityOption',(req, res)=>{
    //     res.json({
    //       status:0,
    //       data:dataJson.qualityOption
    //     })
    //   });
    //   app.get('/api/seller',(req, res)=>{
    //     res.json({
    //       status:0,
    //       data:{
    //         seller:dataJson.seller,
    //         activityLists:dataJson.activityLists
    //       }
    //     })
    //   });
    //
    //   app.get('/api/shop',(req, res)=>{
    //     let sellerId = parseInt(req.query.sellerId);
    //     console.log(sellerId)
    //     let sellerLists = dataJson.seller.sellerLists;
    //     sellerLists.forEach(function (item,index) {
    //       if(sellerId === item.seller_id){
    //         console.log(item.seller_id)
    //         res.json({
    //           status:0,
    //           data:{
    //             seller:item,
    //             activityLists:dataJson.activityLists
    //           }
    //         })
    //       }
    //     });
    //
    //   })
    // }
    /*结束---*/
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${config.dev.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
