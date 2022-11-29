import specialistDaySlotSchema from "./Specialist_day_slot.model.js";

async function addDaySlot(req, res, next) {
  try {
    let day = req.body.available_day;
    let slot = req.body.available_slot;
    let depId = req.body.department_id;
    let docId = req.body.specialist_id;

    let data = await specialistDaySlotSchema
      .find({ specialist_id: docId, department_id: depId })
      .exec();
    console.log(data);
    if (data.length == 0) {
      console.log("insert data");
      let insert = new specialistDaySlotSchema({
        specialist_id: docId,
        department_id: depId,
        available_day: day,
        available_slot: slot,
      });
      insert.save();
      if (insert) {
        console.log(insert);
      }
    } else {
      console.log("HELLO");
      let findData = await specialistDaySlotSchema
        .find({ specialist_id: docId, available_day: day })
        .exec();
      console.log("find data", findData);
      if (findData.length != 0) {
        console.log("findData", findData);
        if (findData[0].available_day === day) {
          if (findData[0].available_slot.length >= 4) {
            return res.json({
              status: true,
              message: "Specialist slots are full",
            });
          } else {
            let details = await specialistDaySlotSchema
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
          }
        } else {
          console.log("insert New");
          let insert2 = new specialistDaySlotSchema({
            specialist_id: docId,
            department_id: depId,
            available_day: day,
            available_slot: slot,
          });
          insert2.save();
          if (insert2) {
            return res.json({
              status: true,
              message: "Specialist slot added",
              data: insert2,
            });
          }
        }
      }

      console.log("insert New");
      let insert3 = new specialistDaySlotSchema({
        specialist_id: docId,
        department_id: depId,
        available_day: day,
        available_slot: slot,
      });
      insert3.save();
      if (insert3) {
        return res.json({
          status: true,
          message: "Specialist slot added",
          data: insert3,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function getData(req, res, next) {
  try {
    let data = await specialistDaySlotSchema.find().exec();
    if (data) {
      return res.json({ status: true, message: "data fetched", data: data });
    }
  } catch (error) {
    return res.json({ status: true, message: error });
  }
}

async function getDataSlotDay(req, res, next) {
  console.log("spe success");
  console.log(req.department_id, req.specialist_id);
  try {
    let data = await specialistDaySlotSchema
      .find({
        department_id: req.department_id,
        specialist_id: req.specialist_id,
      })
      .exec();
    if (data) {
      console.log("data", data);
      return res.json({ status: true, message: "data fetched", data: data });
    }
  } catch (error) {
    return res.json({ status: true, message: error });
  }
}

async function getAvailableDay(req, res, next) {
  try {
    let data = await specialistDaySlotSchema
      .find({
        specialist_id: req.specialist_id,
        department_id: req.department_id,
      })
      .exec();
    if (data) {
      return res.json({ status: true, message: "data fetched", data: data });
    }
  } catch (error) {
    return res.json({ status: true, message: error });
  }
}

async function getAvailableSlot(req, res, next) {
  try {
    let data = await specialistDaySlotSchema
      .find({
        specialist_id: req.specialist_id,
        department_id: req.department_id,
        available_day: req.available_day,
      })
      .exec();
    if (data) {
      return res.json({ status: true, message: "data fetched", data: data });
    }
  } catch (error) {
    return res.json({ status: true, message: error });
  }
}
//get doctor and slot based on department

async function get_dept_doctor(req, res) {
  try {
    const id = req.department_id;
    console.log(id);
    const doctor = await specialistDaySlotSchema.aggregate([
      {
        $match: {
          appointment_staus: "pending",
        },
      },
      {
        $lookup: {
          from: "departments",
          localField: "department_id",
          foreignField: "department_id",
          as: "data",
        },
      },
      {
        $lookup: {
          from: "specialists",
          localField: "specialist_id",
          foreignField: "specialist_id",
          as: "doctor",
        },
      },
      {
        $unwind: {
          path: "$data",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$doctor",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          "doctor.specialist_name": 1,
          "doctor.image": 1,
          available_day: 1,
          specialist_id: 1,
          "data.department_name": 1,
        },
      },
    ]);
    if (doctor) {
      const result = {};
      return res.status(200).json({
        status: "success",
        message: "detail fetched",
        result: doctor,
      });
    } else {
      return res.status(400).json({ status: "no data found" });
    }
  } catch (error) {
    console.log("error", error.message);
    return res.json({ message: error.message });
  }
}
export default {
  addDaySlot,
  getData,
  getDataSlotDay,
  getAvailableDay,
  getAvailableSlot,
  get_dept_doctor,
};
