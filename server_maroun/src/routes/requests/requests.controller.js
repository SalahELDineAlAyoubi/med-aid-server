const { json } = require('express');
const {
    getAllRequests,
    addNewRequests,
} =  require('../../models/requests.model');
function httpGetAllRequests(req,res){   
    return res.status(200).json(getAllRequests());
}
function httpAddNewRequest(req,res){
    const request = req.body;
    if(!request.name || !request.type || !request.dosage || !request.expirationDate){
        return res.status(400).json({
            error: 'Missing required request property',
        });
    }
    request.expirationDate = new Date(request.expirationDate);
    if(isNaN(request.expirationDate)){
        return res.status(400).json({
            error:'Invalid expiration date'
        })
    };

    const newRequest = addNewRequests(request);
    return res.status(201).json(newRequest);
}
module.exports = {
    httpAddNewRequest,
    httpGetAllRequests, 
}