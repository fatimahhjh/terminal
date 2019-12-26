module.exports = {
  // outputDir: "static",
  publicPath: process.env.NODE_ENV === "production" ? "/static/dist/" : "",
  devServer: {
    port: 8031,
    open: true,
    hotOnly:false,
    proxy: {
      '/apps/onekey/api/': {
        target: 'http://127.0.0.1:60000',
        changeOrigin: true,
        pathRewrite: {
          '^/apps/onekey/api/': '/fake/apps/onekey/api/'
        }
      }
    }
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
  }
}