/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { Statistics, calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!isNaN(Number(req.query.weight)) && !isNaN(Number(req.query.height))) {
    const result = {
      weight: Number(req.query.weight),
      height: Number(req.query.height),
      bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))
    };
    res.json(result);
  } else {
    res.send({
      error: "malformatted parameters"
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hours: Array<string> = req.body.daily_exercises;
  const target: number = req.body.target;
  console.log(hours,target);

  if (!hours || !target) {
    return res.send({ error: "parameters missing" });
  }

  if (isNaN(Number(target)) || hours.filter(a => !isNaN(Number(a))).length < 0) {
    return res.send({ error: "malformatted parameters" }).status(401);
  }

  const hoursNumbers: Array<number> =  hours.map(a => Number(a));
  const result: Statistics = calculateExercises(hoursNumbers, Number(target));

  return res.status(200).json(result);
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
