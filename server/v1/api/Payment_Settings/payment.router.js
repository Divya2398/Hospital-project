import express from 'express';
import Controller from './payment.controller.js'

const router = express.Router();

router.post('/addPaymentDetails', Controller.addPaymentDetails)

router.put('/updatePaymentDetails', Controller.updatePaymentDetails)

router.get('/token', Controller.token)

router.post('/transaction', Controller.transaction)

export default router;