import express from 'express';
import {
  createScore,
  getAllScores,
  getScoreById,
  updateScore,
  deleteScore,
} from '../controllers/scorecontroller.js';

const router = express.Router();

router.post('/create', createScore);
router.get('/get', getAllScores);
router.get('/getbyid/:id', getScoreById);
router.put('/update/:id', updateScore);
router.delete('/delete/:id', deleteScore);

export default router;
