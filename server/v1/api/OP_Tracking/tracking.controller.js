import Service from "./tracking.service.js";


async function TrackId(req, res, next){
   await Service.TrackId(req.body, res, function(result){
    return res.json({message:result.message})
   })
}


async function GetOP(req, res, next){
    await Service.GetOP(req.body, res, function(result){
        console.log(result)
        return res.json({message:result.message})
    })
}

async function GetOneOP(req, res, next){
    await Service.GetOneOP(req.body, res, function(result){
        console.log(result)
        return res.json({message:result.message})
    })
}

export default {
    TrackId,
    GetOP,
    GetOneOP
}