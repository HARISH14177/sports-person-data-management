// routes/athleteRoutes.js
import express from 'express';
import { upload } from '../middleware/upload.js';
import {
  createAthlete,
  getAllAthletes,
  getAthleteById,
  updateAthlete,
  deleteAthlete
} from '../controllers/athletecontroller.js';

const router = express.Router();

router.post('/create', upload, createAthlete);
router.get('/get', getAllAthletes);
router.get('/get/:id', getAthleteById);
router.put('/update/:id', upload, updateAthlete);
router.delete('/delete/:id', deleteAthlete);

export default router;
