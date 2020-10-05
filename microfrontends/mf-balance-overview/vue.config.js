module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:3015',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/': ''
                }
            }
        }
    }
};
