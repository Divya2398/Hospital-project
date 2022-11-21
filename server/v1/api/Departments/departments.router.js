import express from 'express';
import Controller from './departments.controller.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, 'v1/uploads/department_img')
    },
    filename(req,file,callback){
        callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({ storage });

const router = express.Router()

router.post('/addDepartments', upload.single('department_image'), Controller.addDepartments);
router.post('/loginDep', Controller.login)
router.get('/getAllDepartments', Controller.getAllDepartments)
router.put('/updateDepartmentWithImg', upload.single('department_image'), Controller.updateDepartmentWithImg),
router.put('/updateDepartmentWithoutImg', Controller.updateDepartmentWithoutImg)
router.get('/getSingleDepartment', Controller.getSingleDepartment)
router.get('/doctorLog', Controller.doctorLog)
router.get('/getDepName', Controller.getDepName)


export default router