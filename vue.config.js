module.exports = {
  //axios域代理，解决axios跨域问题
  baseUrl: '/',
  devServer: {
    proxy: {
      '': {
        target: 'http://http://192.168.81.200:8090',
        // target: 'http://192.168.0.108:8090',
        changeOrigin: true,
        ws: true,
        pathRewrite: {

        }
      }
    }
  }
}
