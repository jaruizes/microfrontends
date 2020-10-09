module.exports = {
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
