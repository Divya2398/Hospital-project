import trackSchema from "./tracking.model.js";


async function TrackId(req, res){
    try {

        let op = new trackSchema(req)
        let tracking = await op.save()

        return res.json({status:'success', message:"op created", result:tracking})
        
    } catch (error) {
        return res.json({status:'error found', message:error.message})
    }
}


async function GetOP(req, res){
    try {
      let get = await trackSchema.find()
      if(get.length){
        return res.json({status:'success', message:"op created", result:tracking})
      }else{
        return res.json({status:'failed', message:"data not found"})
      }
     
    } catch (error) {
        return res.json({status:'error found', message:error.message})
    }
}

async function GetOneOP(req, res){
    try {
      let trackId = req.track_id
      let one = await trackSchema.find({track_id:trackId})
      if(one){
        return res.json({status:'success', message:"op created", result:tracking})
      }else{
        return res.json({status:'failed', message:"data not found"})
      }
     
    } catch (error) {
        return res.json({status:'error found', message:error.message})
    }
}


export default{
    TrackId,
    GetOP,
    GetOneOP
}