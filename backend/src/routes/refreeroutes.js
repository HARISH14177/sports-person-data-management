import express from 'express';
import {
  addReferee,
  getAllReferees,
  getRefereeById,
  updateReferee,
  deleteReferee,
  getRefereesByEvent 
} from '../controllers/refreecontroller.js';

const router = express.Router();

router.post('/create', addReferee);
router.get('/get', getAllReferees);
router.get('/get/:id', getRefereeById);
router.put('/update/:id', updateReferee);
router.delete('/delete/:id', deleteReferee);


router.get('/by-event/:eventId', getRefereesByEvent);

export default router;
