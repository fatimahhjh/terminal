module.exports = {
  // outputDir: "static",
  publicPath: process.env.NODE_ENV === "production" ? "/static/dist/" : "",
  devServer: {
    port: 8031,
    open: true,
    hotOnly:false,
    proxy: {
      // '/staff/': {
      //   target: 'http://127.0.0.1:60000',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/staff/': '/fake/'
      //   }
      // }
      '/': { //将www.exaple.com印射为/apis
                target: 'http://192.168.43.30:6000', // 接口域名 真实地址
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    '^/': '/' //需要rewrite的,
                }
            },
    }
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
  }
}