import mongoose from "mongoose";
import crypto from "crypto"

const track = new mongoose.Schema({
    track_id:{type:String, require:false},
    entry_time:{type:String, require:true},
    exit_time:{type:String, require:true},
    appointment_time:{type:String, require:true},
    patient_id:{type:String, require:true},
    doctor_id:{type:String, require:true},
},{
    timestamps:true
})

track.pre("save", function(next){
    this.track_id = "track"+crypto.pseudoRandomBytes(4).toString("hex").toUpperCase()
    next()
})

export default mongoose.model("track", track)