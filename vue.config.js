module.exports = {
  publicPath: "/toychamp/",
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
};
