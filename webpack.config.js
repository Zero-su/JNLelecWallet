var path = require('path')
var webpack = require('webpack')
var px2rem = require('postcss-px2rem');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
      main: path.resolve(__dirname, './src/main.js'),
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/build.js'
  },
  module: {
    rules: [
      {
          test : /\.vue$/,
          loader : 'vue-loader'
      },
      {
          test: /\.json$/,
          loader: 'json-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
          test : /\.scss$/,
          use: [
                    'style-loader',
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
                            plugins: (loader) => [
                                require('postcss-import')({root: loader.resourcePath}),
                                px2rem({remUnit:75})   //px转换成rem
                            ]
                        }
                    },
                    "sass-loader"
                ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'file-loader?name=images/[hash:8].[name].[ext]'
      }, {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
      }
    ]
  },
  plugins: [
     new webpack.LoaderOptionsPlugin({
       options: {
          vue : {
              js : 'babel-loader',
              css : 'style-loader!css-loader?importLoader=1!postcss-loader',
              scss : 'style-loader!css-loader!postcss-loader!sass-loader',
              postcss:[px2rem({remUnit:75})]
          }
       }
     }),
     new HtmlWebpackPlugin({
            // 生成html文件的名字，路径相对于输出文件所在的位置
            filename: './index.html',
            // 源文件，路径相对于本文件所在的位置
            template: path.resolve(__dirname, 'index.html'),
            // 需要引入entry里面的哪几个入口，如果entry里有公共模块，记住一定要引入
            chunks: ['main'],
            // 要把<script>标签插入到页面哪个标签里(body|true|head|false)
            inject: 'body'
        })
   ],
  resolve : {
        extensions: ['*', '.js', '.vue', '.jsx'], //后缀名自动补全
        alias : {
            vue : "vue/dist/vue.js",
            components : path.resolve('src/components/'),
            pages : path.resolve('src/pages/'),
            ajax : path.resolve('src/ajax/'),
            router:path.resolve('src/router/'),
            common:path.resolve('src/common/'),
            store:path.resolve('src/store/')
        }
    },
  devServer: {
    historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history      API，如果设置为true，所有的跳转将指向index.html
    noInfo: true,
    inline:true
  },
  performance: {
    hints: false
  }
}


if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = 'none'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ])
}

