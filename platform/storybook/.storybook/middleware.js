const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function expressMiddleware (router) {
    router.use('/api', createProxyMiddleware({
        target: 'https://ppqzm7uohd.execute-api.eu-west-2.amazonaws.com',
        changeOrigin: true
    }));

    router.use('/webcomponents', createProxyMiddleware({
        target: 'http://microfrontends-cdn.s3-website.eu-west-2.amazonaws.com',
        changeOrigin: true
    }));

    router.use('/assets/microfrontends', createProxyMiddleware({
        target: 'http://microfrontends-cdn.s3-website.eu-west-2.amazonaws.com',
        changeOrigin: true
    }));

    router.use('/assets/webcomponents', createProxyMiddleware({
        target: 'http://microfrontends-cdn.s3-website.eu-west-2.amazonaws.com',
        changeOrigin: true
    }));

    router.use('/microfrontends', createProxyMiddleware({
        target: 'http://microfrontends-cdn.s3-website.eu-west-2.amazonaws.com',
        changeOrigin: true
    }));
};

