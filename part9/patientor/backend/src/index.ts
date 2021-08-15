import express from 'express';
import diagnoseRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const PORT = 3003;

app.get('/ping', (_req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});