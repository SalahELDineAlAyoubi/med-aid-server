const express  = require('express');
const { 
    httpAddNewRequest,
    httpGetAllRequests,
} = require('./requests.controller');

const requestsRouter = express.Router();

requestsRouter.get('/',httpGetAllRequests); 
requestsRouter.post('/', httpAddNewRequest);

module.exports = {
    requestsRouter,
}