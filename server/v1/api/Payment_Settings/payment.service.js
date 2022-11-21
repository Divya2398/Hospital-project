import paymentSettingsSchema from './payment.model.js';
import userModel from '../User/user.model.js';
import braintree from 'braintree';



async function addPaymentDetails(req,res,next){
    try {
        let pay = await paymentSettingsSchema.findOne({merchantId:req.body.merchantId})
        if(pay){
            return res.json({status:'failed', message:'Key already exist'})
        }
        let data = new paymentSettingsSchema(req.body);
        let result = await data.save();
        return res.json({status:true, message:"payment details are added", result:result})
    } catch (error) {
        return res.json({status : false,  message:error.message })
    }

}


async function updatePaymentDetails(req,res,next){
    try {

        let id = req.query.paymentid

       let data =  await paymentSettingsSchema.findOneAndUpdate({paymentid:id}, req.body, {new:true})
        if(data){
            console.log(data)
            return res.json({status:'success', message:'updated', result:data})
            
        }else{
            return res.json({status:'failed', message:"message"})
        }
    
    } catch (error) {
        return res.json({status : false,  message:error.message })
    }

}


// braintree 



async function token(req, res, next){
    try{
        const pay = await paymentSettingsSchema.findOne({adminId:req.query.adminId})

        // console.log(pay)
        const config ={
            environment:braintree.Environment.Sandbox,
            merchantId:pay.merchantId,
            publicKey:pay.publicKey,
            privateKey:pay.privateKey
        }

        console.log(config)

        const gateway = new braintree.BraintreeGateway(config)

        gateway.clientToken.generate({}, (err, response)=>{
            if(err){
                return res.send({'error':err})
            }else{
                // console.log('token', response)
                return res.json({'status':'success', 'message':response})
            }
        })
    }catch(err){
        return res.json({'error':err.message})
    }
}

async function transaction(req, res, next){
    try{
        const pay = await paymentSettingsSchema.findOne({adminId:req.query.adminId})

        // console.log(pay)
        const config ={
            environment:braintree.Environment.Sandbox,
            merchantId:pay.merchantId,
            publicKey:pay.publicKey,
            privateKey:pay.privateKey
        }

        const gateway = new braintree.BraintreeGateway(config)

        let user = await userModel.findOne({patient_id:req.query.patient_id})

        if(user.patient_status == "new_user"){
            let newUser = await userModel.findOneAndUpdate({patient_id:req.query.patient_id},{patient_status:"existing user"},{new:true})
            const paymentDetail = gateway.transaction.sale({
                amount: 500,
                paymentMethodNonce:req.body.paymentMethodNonce,
                options:{
                    submitForSettlement:true
                }
            },(err, response)=>{
                if(response.success){ 
                    return res.json({status:'success', result:newUser.patient_status, response: response.transaction})
                }else{
                    return res.json({err:err})
                }
            })
        }else{
            const paymentDetail = gateway.transaction.sale({
                amount:200,
                paymentMethodNonce:req.body.paymentMethodNonce,
                options:{
                    submitForSettlement:true
                }
            },(err, response)=>{
                if(response.success){
                    return res.json({'status':'success', 'message': response.transaction})
                }else{
                    return res.json({err:err})
                }
            })
        }
    }catch(err){
        return res.json({'error':err.message})
    }
}

export default {
    addPaymentDetails,
    updatePaymentDetails,
    token,
    transaction,
}