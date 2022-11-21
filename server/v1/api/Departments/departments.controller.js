
import Service from './departments.service.js';


async function addDepartments(req,res,next){
    console.log("Controller")

    await Service.addDepartments(req, res, function(result){
            return res.json({message : result.message})

    })
}

async function getAllDepartments(req,res,next){
    console.log("Controller")

    await Service.getAllDepartments(req.body, res, function(result){
            return res.json({message : result.message})

    })
}

async function login(req, res, next){
    await Service.login(req, res, function(result){
        return res.json({message: result.message})
    })
}

async function updateDepartmentWithImg(req, res, next){
    await Service.updateDepartmentWithImg(req, res, function(result){
        return res.json({message: result.message})
    })
}


async function updateDepartmentWithoutImg(req, res, next){
    await Service.updateDepartmentWithoutImg(req, res, function(result){
        return res.json({message: result.message})
    })
}

async function getSingleDepartment(req, res, next){
    await Service.getSingleDepartment(req.query, res, function(result){
        return res.json({message: result.message})
    })
}

async function doctorLog(req, res, next){
    await Service.doctorLog(req.query, res, function(result){
        return res.json({message: result.message})
    })
}

async function getDepName(req, res, next){
    await Service.getDepName(req.query, res, function(result){
        return res.json({message: result.message})
    })
}


export default {
    addDepartments,
    getAllDepartments,
    login,
    updateDepartmentWithImg,
    updateDepartmentWithoutImg,
    getSingleDepartment,
    doctorLog,
    getDepName

}