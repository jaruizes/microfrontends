const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function expressMiddleware (router) {
    const isLocal = process.env.STORYBOOK_ENV === 'local';
    const api = isLocal ? 'http://localhost:9100' : 'https://ppqzm7uohd.execute-api.eu-west-2.amazonaws.com';
    const mfserver = isLocal ? 'http://localhost:8080' : 'http://microfrontends-cdn.s3-website.eu-west-2.amazonaws.com';
    const apiTarget = {target: api, changeOrigin: true};
    const mfserverTarget = {target: mfserver, changeOrigin: true};

    router.use('/api', createProxyMiddleware(apiTarget));

    router.use('/uicomponents', createProxyMiddleware(mfserverTarget));

    router.use('/assets/microfrontends', createProxyMiddleware(mfserverTarget));

    router.use('/assets/uicomponents', createProxyMiddleware(mfserverTarget));

    router.use('/microfrontends', createProxyMiddleware(mfserverTarget));
};

