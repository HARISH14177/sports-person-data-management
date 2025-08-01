import express from 'express';

import  {createEvent,getAllEvents,getEventById,updateEvent,deleteEvent} from '../controllers/eventcontroller.js'
const router = express.Router();
router.post('/create', createEvent);
router.get('/get',getAllEvents);
router.get('/getbyid/:id',getEventById);
router.put('/update/:id',updateEvent)
router.delete('/delete/:id',deleteEvent)

export default router;
