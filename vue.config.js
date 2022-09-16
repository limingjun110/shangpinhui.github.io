module.exports = {
  // 在打包的时候去除map文件，减少文件大小，利于上线
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
      }
    }
  }
}
