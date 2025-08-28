import express from 'express';

import { addDisciplines,assignDisciplinesToAthlete,assignDisciplinesToEvent,getAllDisciplines} from '../controllers/disciplinecontroller.js';
const router = express.Router();

router.post('/create', addDisciplines);
router.post('/assign-to-athlete', assignDisciplinesToAthlete);
router.post('/assign-to-event', assignDisciplinesToEvent);
router.get('/get', getAllDisciplines);



export default router;
