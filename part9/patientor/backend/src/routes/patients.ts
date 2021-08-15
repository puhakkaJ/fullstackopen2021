import express from 'express';
import patientService from '../services/patientService';
import { NewEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.post('/', (req, res) => {
  const { name,
    dateOfBirth,
    ssn, 
    gender,
    occupation,
    entries } = req.body;
  try {
    const newPatient = patientService.addEntry({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
      entries
    });
    res.json(newPatient);
  } catch (e) {
    res.status(500).send(e.message)
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  let entry = req.body
  if (
    !entry ||
    !String(entry.description) ||
    !String(entry.date) ||
    !String(entry.specialist)
  ) {
    throw new Error('Incorrect description, date or specialist');
  }

  if (entry.discharge && Object.keys(entry.discharge).includes('date') && Object.keys(entry.discharge).includes('criteria')) { entry = { ...entry, type: 'Hospital'} as NewEntry
  } else if (entry.healthCheckRating) { entry = { ...entry, type: 'HealthCheck'} as NewEntry
  } else if (String(entry.employerName)) { entry = { ...entry, type: 'OccupationalHealthcare'} as NewEntry
  } else new Error('Incorrect type');

  try {
    const patient = patientService.findById(req.params.id);
    const entryB = entry as NewEntry
    if (patient) {
      const newEntry = patientService.postNewEntry(
        entryB
      , patient.id);
      res.json(newEntry);
    }
  } catch (e) {
    res.status(500).send(e.message)
  }
});

export default router;