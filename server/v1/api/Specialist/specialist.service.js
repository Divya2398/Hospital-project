import specialistSchema from "./specialist.model.js";
import moment from "moment";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import departmentSchema from "../Departments/department.model.js";
// async function addSpecialist(req,res,next){
//     try {

//             let file = req.file.filename;
//             console.log("proceed", file)
//             console.log(req.body)
//             let data = await specialistSchema.findOne({specialist_name : req.body.specialist_name}).exec();
//         if(data){
//             return res.json({status : false, message : "Specialist name already exists", data })
//         } else {
//             let details = new specialistSchema(req.body);
//             details.image = req.file.filename
//             let result = await details.save();
//             return res.json({status : true, message : "Specialist name added successfully", data :result })
//         }

//     } catch (error) {
//         return res.json({status : false, message : error })
//     }
// }

//NEW CHANGES TO ADD DAY AND SLOT
// async function addSpecialist(req,res,next){
//     try {

//             let file = req.file.filename;
//             console.log("proceed", file)
//             console.log(req.body)
//             let data = await specialistSchema.findOne({specialist_name : req.body.specialist_name}).exec();
//         if(data){
//             // return res.json({status : false, message : "Specialist name already exists", data })
//             let details = await specialistSchema.findOneAndUpdate({specialist_name : req.body.specialist_name}, {$push:{available_slot:req.body.available_slot}}, {new:true}).exec();
//             if(details){
//                 return res.json({status : false, message : "Specialist slot added", details })
//             }
//         } else {
//             let details = new specialistSchema(req.body);
//             details.image = req.file.filename
//             let result = await details.save();
//             return res.json({status : true, message : "Specialist name added successfully", data :result })
//         }

//     } catch (error) {
//         return res.json({status : false, message : error })
//     }
// }

// async function addSpecialist(req,res,next){
//     try {
//             let file = req.file.filename;
//             console.log("proceed", file)
//             console.log(req.body)
//             let data = await specialistSchema.findOne({specialist_name : req.body.specialist_name}).exec();
//         if(data){
//             console.log("name" , data)
//             // return res.json({status : false, message : "Specialist name already exists", data })
//             let day = await specialistSchema.findOne({available_day : req.body.available_day}).exec();
//             console.log("day", day)
//             if(day) {
//                 let details = await specialistSchema.findOneAndUpdate({specialist_name : req.body.specialist_name}, {$push:{available_slot:req.body.available_slot}}, {new:true}).exec();
//             if(details){
//                 return res.json({status : false, message : "Specialist slot added", details })
//             }
//             } else {

//                 console.log("update the date and slot")
//                 // let data = {
//                 //     available_day : req.body.available_day,
//                 //     available_slot : req.body.available_slot
//                 // }
//                 // let updateDay = await specialistSchema.findOneAndUpdate({specialist_name : req.body.specialist_name},data, {new : true});
//                 // console.log(updateDay)
//             }

//         } else {
//             let details = new specialistSchema(req.body);
//             details.image = req.file.filename
//             let result = await details.save();
//             return res.json({status : true, message : "Specialist name added successfully", data :result })
//         }

//     } catch (error) {
//         return res.json({status : false, message : error })
//     }
// }

// async function addSpecialist(req,res,next){

//     let department = await specialistSchema.find({department_id : req.body.department_id})
//     if(department.length>0){
//         let name = await specialistSchema.find({specialist_name : req.body.specialist_name});
//         if(name.length>0){
//             let day = await specialistSchema.findOne({available_day : req.body.available_day, specialist_name : req.body.specialist_name} );
//             console.log("day", day)
//             if(day){
//                 let details = await specialistSchema.findOneAndUpdate({available_day : req.body.available_day, specialist_name : req.body.specialist_name}, {$push:{available_slot:req.body.available_slot}}, {new:true}).exec();
//                 if(details){
//                     return res.json({status : false, message : "Specialist slot added", details })
//                 }
//             } else {
//                 console.log("add day and slot")
//                 let details = new specialistSchema(req.body);
//                 details.image = req.file.filename
//                 let result = await details.save();
//                 return res.json({status : true, message : "Specialist name added successfully", data :result })
//             }
//         } else {
//             console.log("specialist not found")
//             let details = new specialistSchema(req.body);
//             details.image = req.file.filename
//             let result = await details.save();
//             return res.json({status : true, message : "Specialist name added successfully", data :result })
//         }
//     } else {
//         console.log("department not found")
//             let details = new specialistSchema(req.body);
//             details.image = req.file.filename
//             let result = await details.save();
//             return res.json({status : true, message : "Specialist name added successfully", data :result })
//     }

// }

async function addSpecialist(req, res, next) {
  try {
    console.log(req.body);
    console.log(req.file);

    let file = req.file.filename;
    let data = {
      specialist_name: req.body.specialist_name,
      image: file,
    };

    let details = await specialistSchema
      .findOne({ specialist_name: req.body.specialist_name })
      .exec();
    if (details) {
      return res.json({
        status: true,
        message: "Specialist already exists",
        data: details,
      });
    } else {
      let user_Details = new specialistSchema(req.body);
      const available_day = JSON.parse(req.body.available_day);
      user_Details.available_day = available_day;
      user_Details.image = file;

      let dept = await departmentSchema
        .findOne({
          department_id: req.body.department_id,
        })
        .exec();
      console.log("dept", dept);
      user_Details.department_name = dept.department_name;
      let result = user_Details.save();
      if (result) {
        return res.json({
          status: true,
          message: "Specialist  added successfully",
          data: result,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function getAllSpecialist(req, res, next) {
  try {
    let data = await specialistSchema.find().exec();
    return res.json({
      status: true,
      message: "Specialist details are fetched",
      data,
    });
  } catch (error) {
    return res.json({ status: false, error });
  }
}

async function getSingleSpecialist(req, res, next) {
  console.log(req);
  try {
    let data = await specialistSchema
      .findOne({ specialist_id: req.specialist_id })
      .exec();
    // console.log(data.available_slot.slot1)
    return res.json({
      status: true,
      message: "Specialist details are fetched",
      data,
    });
  } catch (error) {
    return res.json({ status: false, error });
  }
}

async function updateDoctorWithImg(req, res) {
  try {
    console.log("success");
    let id = req.body.specialist_id;
    let file = req.file.filename;
    console.log(file);
    let data = {
      // department_id:req.body.department_id,
      specialist_name: req.body.specialist_name,
      department_image: file,
    };

    console.log("data");

    let result = await specialistSchema.findOneAndUpdate(
      { specialist_id: id },
      data,
      { new: true }
    );
    if (result) {
      console.log(result);
      return res.json({
        status: "success",
        message: "updated",
        result: result,
      });
    } else {
      return res.json({ status: "failed", message: "message" });
    }
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
}

// async function updateDoctorWithoutImg(req,res){
//     try {

//         let id = req.body.specialist_id

//         console.log(req.body)

//        let data =  await specialistSchema.findOneAndUpdate({specialist_id:id}, req.body.data, {new:true})
//         if(data){
//             console.log(data)
//             return res.json({status:'success', message:'updated', result:data})

//         }else{
//             return res.json({status:'failed', message:"message"})
//         }

//     } catch (error) {
//         return res.json({status : false,  message:error.message })
//     }
// }

async function updateDoctorWithoutImage(req, res) {
  console.log("success");
  try {
    // console.log(req.body)
    let data = await specialistSchema
      .findOneAndUpdate(
        { specialist_id: req.body.specialist_id },
        { specialist_name: req.body.specialist_name },
        { new: true }
      )
      .exec();
    if (data) {
      return res.json({ status: "success", message: "Updated", result: data });
    }
  } catch (error) {
    console.log(error);
  }
}

async function getspecialistByDepId(req, res, next) {
  try {
    console.log("dep success");
    // console.log(req)
    let data = await specialistSchema
      .find({ department_id: req.query.department_id })
      .exec();
    if (data) {
      console.log(data.length);
      console.log(data);
      return res.json({
        status: "success",
        message: "data fetched",
        result: data,
      });
    } else {
      return res.json({ status: "success", message: "no data fetched" });
    }
  } catch (error) {
    console.log(error);
  }
}

async function addSlotDay(req, res, next) {
  try {
    let day = req.body.available_day;
    let slot = req.body.available_slot;
    let depId = req.body.department_id;
    let docId = req.body.specialist_id;

    let det = {
      available_day: day,
      available_slot: slot,
    };

    let data = await specialistSchema
      .find({ department_id: depId, specialist_id: docId })
      .exec();
    if (data) {
      if (data[0].available_day) {
        if (day == data[0].available_day) {
          let details = await specialistSchema
            .findOneAndUpdate(
              { available_day: day, specialist_id: docId },
              { $push: { available_slot: slot } },
              { new: true }
            )
            .exec();
          if (details) {
            return res.json({
              status: true,
              message: "Specialist slot added",
              details,
            });
          }
        } else {
          console.log("insert Day and date");
          let insert = new specialistSchema({
            specialist_id: docId,
            department_id: depId,
            available_day: day,
            available_slot: slot,
          });

          insert.save();

          if (insert) {
            console.log(insert);
          }
        }
      } else {
        console.log("update day and slot");
        let update = await specialistSchema.findOneAndUpdate(
          { department_id: depId, specialist_id: docId },
          det,
          { new: true }
        );
        if (update) {
          console.log(update);
        }
      }
    }

    //     let data = await specialistSchema.find({department_id : depId, specialist_id : docId, available_day:day}).exec();
    // if(data){

    //     console.log("with day", data)
    //     let details = await specialistSchema.findOneAndUpdate({available_day : day, specialist_id : docId}, {$push:{available_slot : slot}}, {new:true}).exec();
    //     if(details){
    //         return res.json({status : false, message : "Specialist slot added", details })
    //     }
    // } else {
    //     console.log("with out Day")
    // let data = await specialistSchema.find({department_id : depId, specialist_id : docId}).exec();
    // if(data){
    //     console.log(data)
    //     let det = await specialistSchema.insert({
    //         department_id : depId,
    //         specialist_id : docId,
    //         available_day : day,
    //         available_slot : slot
    //     }).exec();
    //     if(det){
    //         console.log(det)
    //     }
    // }
    // }
  } catch (error) {
    console.log(error);
  }
}
async function doctorlogin(req, res, next) {
  try {
    const id = req.body.specialist_id;
    const password = req.body.password;
    console.log("pass", password);
    console.log("id", req.body.specialist_id);
    const doctor = await specialistSchema.findOne({ specialist_id: id }).exec();
    console.log("data", doctor);
    if (doctor) {
      // console.log(data.length);
      console.log("data", doctor);
      let ismatch = bcrypt.compare(password, doctor.password);
      if (ismatch) {
        const payload = {
          specialist_id: doctor.specialist_id,
          department_id: doctor.department_id,
          specialist_name: doctor.specialist_name,
          specialisation: doctor.specialisation,
          department_name: doctor.department_name,
          experience: doctor.experience,
          time: doctor.time,
          image: doctor.image,
        };
        const token = jwt.sign(payload, "doctor-key");
        return res.json({
          status: "success",
          message: `logged in as ${doctor.specialist_name}`,
          data: token,
          result: doctor,
        });
      } else {
        return res.json({
          status: "failure",
          message: "password doesn't match",
        });
      }
    } else {
      return res.json({
        status: "failure",
        message: "no such doctor or wrong id",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
export default {
  addSpecialist,
  getAllSpecialist,
  getSingleSpecialist,
  updateDoctorWithImg,
  // updateDoctorWithoutImg,
  updateDoctorWithoutImage,
  getspecialistByDepId,
  addSlotDay,
  doctorlogin,
};
