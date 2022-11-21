import Controller from './Doctorlog.controller.js';

import express from 'express';

const router = express.Router();

router.get('/doctorLog', Controller.doctorLog)

export default router