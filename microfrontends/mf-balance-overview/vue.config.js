module.exports = {
    outputDir: 'dist/mf-balance-overview/v1',
    devServer: {
        proxy: {
            '^/api': {
                target: 'https://ppqzm7uohd.execute-api.eu-west-2.amazonaws.com',
                ws: true,
                changeOrigin: true
            }
        }
    }
};
