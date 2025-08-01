import express from 'express';
import{
    createGym,
    getAllGyms,
    getGymById,
    updateGym,
    deleteGym
}from '../controllers/gymcontroller.js';

const router = express.Router();

router.post('/create', createGym);
router.get('/get', getAllGyms);
router.get('/getbyid/:id', getGymById);
router.put('/update/:id', updateGym);
router.delete('/delete/:id', deleteGym);

export default router;

