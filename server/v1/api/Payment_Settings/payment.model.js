import mongoose from 'mongoose';
import crypto from 'crypto';


const paymentSettingsSchema = new mongoose.Schema({
    paymentid:{type:String, require:true, unique:true},
    adminId:{type:String, require:false},
    environment:{type:String, require:false},
    merchantId:{type:String, require:true},
    publicKey:{type:String, require:true},
    privateKey:{type:String, require:true},
},
{
    timestamps:true
});

paymentSettingsSchema.pre('save', function(next){
    this.paymentid="PAYSET-"+crypto.pseudoRandomBytes(3).toString('hex').toUpperCase()
    next()
})

export default mongoose.model('paymentSettings', paymentSettingsSchema)