import express from 'express';
import {
  addReferee,
  getAllReferees,
  getRefereeById,
  updateReferee,
<<<<<<< HEAD
  deleteRefereesByEvent,
=======
  deleteReferee,
>>>>>>> cada83ca762c26d5306adb73e37efcfa78fc4d9b
  getRefereesByEvent 
} from '../controllers/refreecontroller.js';

const router = express.Router();

router.post('/create', addReferee);
router.get('/get', getAllReferees);
router.get('/get/:id', getRefereeById);
router.put('/update/:id', updateReferee);
<<<<<<< HEAD
router.delete('/delete-by-event/:eventId', deleteRefereesByEvent);

=======
router.delete('/delete/:id', deleteReferee);
>>>>>>> cada83ca762c26d5306adb73e37efcfa78fc4d9b


router.get('/by-event/:eventId', getRefereesByEvent);

export default router;
<<<<<<< HEAD


=======
>>>>>>> cada83ca762c26d5306adb73e37efcfa78fc4d9b
