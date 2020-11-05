module.exports = {
  outputDir: 'dist/broker',
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  },
  devServer: {
    proxy: {
      '/uicomponents': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/microfrontends': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/assets/microfrontends': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/assets/uielements': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/api': {
        target: 'http://localhost:9100',
        changeOrigin: true
      }
    }
  }
};
