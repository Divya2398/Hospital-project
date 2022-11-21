import Service from './Doctorlog.service.js'

async function doctorLog(req,res){
    await Service.doctorLog(req, res, function(result){
        return res.json({message : result.message})
    })
}

export default {
    doctorLog,
}