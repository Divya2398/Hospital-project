import Service from "./appointment.service.js";

async function appointment(req, res, next){
    await Service.appointment(req.body, res, function(result){
        console.log(result)
        return res.json({message:result.message})
    })
}

async function Booked(req, res, next){
    await Service.Booked(req.body, res, function(result){
        return res.json({message:result.message})
    })
}

export default{
    appointment,
    Booked
}