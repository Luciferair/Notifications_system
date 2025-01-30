import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import TaskRouter from './routes/Task';

dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', TaskRouter);


export default app;