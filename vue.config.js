module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: '', 
  indexPath: 'index.html',
  lintOnSave: false,
  productionSourceMap: true,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html', 
      title: '后台管理系统'
    }
  },
  devServer: {
    port: 8081,
    hot: true,
    open: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: ''

  },
  pwa: {
    iconPaths: {
      favicon32: '',
      favicon16: '',
      appleTouchIcon: '',
      maskIcon: '',
      msTileImage: ''
    }
  },
  pluginOptions: {}
};