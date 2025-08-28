import express from 'express';
import {
  addReferee,
  getAllReferees,
  getRefereeById,
  updateReferee,
  deleteRefereesByEvent,
  getRefereesByEvent 
} from '../controllers/refreecontroller.js';

const router = express.Router();

router.post('/create', addReferee);
router.get('/get', getAllReferees);
router.get('/get/:id', getRefereeById);
router.put('/update/:id', updateReferee);
router.delete('/delete-by-event/:eventId', deleteRefereesByEvent);



router.get('/by-event/:eventId', getRefereesByEvent);

export default router;


