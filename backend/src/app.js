import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import gymroutes from './routes/gymroutes.js';
import eventroutes from './routes/eventroutes.js';
import displineroutes from './routes/disciplineroutes.js'
import athleteroutes from './routes/athleteroutes.js'
import refreeroutes from './routes/refreeroutes.js'
import scoreroutes from './routes/scoreroutes.js'


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/gym', gymroutes);
app.use('/api/event',eventroutes)
app.use('/api/discipline',displineroutes)
app.use('/uploads', express.static('uploads'));
app.use('/api/athlete',athleteroutes)
app.use('/api/refree',refreeroutes)
app.use('/api/score',scoreroutes)

export default app;
