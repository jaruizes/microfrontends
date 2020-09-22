const { createProxyMiddleware } = require('http-proxy-middleware');
const express  = require('express');
const bodyParser = require('body-parser');

const CARDS = require('../stories/mf-cards-summary/data/cards');

const expressMiddleWare = (router) => {
    router.get('/api/cards', (request, response) => {
        response.send(CARDS)
    });
};

module.exports = expressMiddleWare;


