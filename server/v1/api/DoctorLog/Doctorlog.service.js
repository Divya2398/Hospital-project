import doctorLogSchema from "./Doctorlog.model.js";
import specialists from '../Specialist/specialist.model.js';
import specialistDaySlotSchema from '../Specialist_day_slot/Specialist_day_slot.model.js';
import departmentSchema from '../Departments/department.model.js';
import Doctorlog from './Doctorlog.model.js'

// async function doctorLog(req,res,next){
//     try {
//         let data = await specialistDaySlotSchema.aggregate([{
//             $lookup: {
//                     from: "specialists",
//                     localField: "department_id",
//                     foreignField: "department_id",
//                     as: "specialistlog",
//                     }
            
   
//         }]).exec();
//         if(data){
//             return res.json({status : true,  message:"Single department detail fetched", data })
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }


async function doctorLog(req,res,next){
    try {
        let data = await specialistDaySlotSchema.aggregate([
            {
            $lookup : {
                from : "specialists",
                localField : "specialist_id",
                foreignField:"specialist_id",
                as:"details"  
            }
           
            },
            
            {$replaceRoot : {newRoot : {$mergeObjects: [{$arrayElemAt:["$details", 0]}, "$$ROOT"]}}},
            {$project:{"details":0}},
            ]).exec();
        if(data){
            return res.json({status : true,  message:"Single department detail fetched", data })
           
        }
    } catch (error) {
        console.log(error)
    }
}



export default {
    doctorLog
}