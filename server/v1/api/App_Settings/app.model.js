import mongoose from 'mongoose';
import crypto from 'crypto';


const appSettingsSchema = new mongoose.Schema({
    id:{type:String, require:true, unique:true},
    title:{type:String, require:true},
    logo:{type:String, require:true},
    policy:{type:String, require:true},
    contact_us : {type:String, require:true},
    mobilenumber : {type:String, requite:true},
    emergency_number : {type:String, require:true},
    admin_email : {type : String, require : true}
    
},
{
    timestamps:true
});

appSettingsSchema.pre('save', function(next){
    this.id="APPSET-"+crypto.pseudoRandomBytes(6).toString('hex').toUpperCase()
    next()
})

export default mongoose.model('appSettings', appSettingsSchema)