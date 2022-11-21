import Service from './payment.service.js';

async function addPaymentDetails(req,res,next){
    await Service.addPaymentDetails(req, res, function(result){
        return res.json({message : result.message})
    })
}

async function updatePaymentDetails(req,res,next){
    await Service.updatePaymentDetails(req, res, function(result){
        return res.json({message : result.message})
    })
}

async function token(req,res,next){
    await Service.token(req, res, function(result){
        return res.json({message : result.message})
    })
}

async function transaction(req,res,next){
    await Service.transaction(req, res, function(result){
        return res.json({message : result.message})
    })
}

export default {
    addPaymentDetails,
    updatePaymentDetails,
    token,
    transaction,
}