import appSettingsSchema from './app.model.js'

async function addAppSettings(req,res,next){
    try {

        console.log("body", req.body)
        console.log(req.file)
        let data = appSettingsSchema(req.body);
        data.logo = req.file.filename
        let result = await data.save();
        return res.json({status : true, message : "app settings are added", result })

    } catch (error) {
        return res.json({status : false, error })
    }
}

async function getAppSettings(req,res,next){
    try {
        let data = await appSettingsSchema.find().exec()
      
        if(data){
            return res.json({status : true, message: "App settings fetched", data }) 
        } else {
            return res.json({status : false, message: "data not found", data }) 
        }

    } catch (error) {
        return res.json({status : false, error })
    }
}

async function updateAppSettings(req,res,next){
    try {
        let details = req.data;
        console.log("details", details);
        console.log("admin email", req.admin_email)
        let updatedData = await appSettingsSchema.findOneAndUpdate({admin_email:req.admin_email}, details, {new:true}).exec();
        if(updatedData){
            return res.json({status : true, message: "data updated", updatedData }) 
        } else {
            return res.json({status : false, message: "data not updated", updatedData })
        }
    } catch (error) {
        return res.json({status : false, error })
    }
}

async function updateAppSettingsImage(req,res,next){
    try {

        let file = req.file.filename

        let data = {
            "title" : req.body.title,
            "policy" : req.body.policy,
            "mobilenumber" : req.body.mobilenumber,
            "logo" : req.file.filename,
            "emergency_number" : req.body.emergency_number,
            "contact_us" : req.body.contact_us
        }
       
        let updatedData = await appSettingsSchema.findOneAndUpdate({admin_email:req.body.admin_email},data, {new:true}).exec();
        console.log("updatedData", updatedData)
        if(updatedData){
            return res.json({status : true, message: "data updated", updatedData }) 
        } else {
            return res.json({status : false, message: "data not updated", updatedData })
        }
    } catch (error) {
        return res.json({status : false, error })
    }
}

export default {
    addAppSettings,
    getAppSettings,
    updateAppSettings,
    updateAppSettingsImage,
}