// const path = require("path");
const name = '盛世政通Base';

// function resolve(dir) {
//   return path.join(__dirname, dir);
// }
module.exports = {
 pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '盛世政通Base'
    }
  },
  devServer: {
    open: true,
    proxy: {
      '/api': {
      // 要访问的跨域的域名
        target: 'http://127.0.0.1:8080/sszt-allranch/',
        // ws: true,
        secure: false, // 使用的是http协议则设置为false，https协议则设置为true
      changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    name: name
  },
  css: {
  loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/style/index.scss";@import "~@/assets/style/variables.scss";' // 引入scss全局变量
      }
    }
  }
}
