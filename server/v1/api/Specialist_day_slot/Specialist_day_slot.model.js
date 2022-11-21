import mongoose from 'mongoose';

const specialistDaySlotSchema = new mongoose.Schema({
    specialist_id:{type:String, require:true},
    department_id:{type:String, require:true}, 
    specialist_name:{type:String },
    available_day: {type : String },
    available_slot: [String],
    specialist_image : {type : String}
    },
{
    timestamps:true
});


export default mongoose.model('specialistDaySlotSchema', specialistDaySlotSchema)