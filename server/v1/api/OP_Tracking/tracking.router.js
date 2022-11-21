 import express  from "express";
 import Controller from './tracking.controller.js'

const app = express()

let router = express.Router()


router.post('/op', Controller.TrackId)

router.post('/getOP', Controller.GetOP)

router.get('/getOneOP', Controller.GetOneOP)

export default router