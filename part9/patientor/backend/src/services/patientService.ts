import patients from '../data/patients';
import { Patient, PatientAll, AddPatient, Gender, NewEntry, Entry } from '../types';
import {v1 as uuid} from 'uuid'

const patientsB: Array<Patient> = patients as Array<Patient>;
const patientsAll: Array<PatientAll> = patients as Array<PatientAll>;;


const getEntries = (): Array<Patient> => {
    return patientsB.map(({ id,
        name,
        dateOfBirth,
        gender,
        occupation, }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addEntry = (entry: AddPatient): Patient => {
  if (Object.values(Gender).includes(entry.gender)) {
    const newPatient = {
      id: uuid(),
      ...entry
    }
  
    patientsB.push(newPatient);
    return newPatient;
  }
  throw new Error('wrong gender') 
};

const findById = (id: string): PatientAll | undefined => {
  const entry = patientsAll.find(d => d.id === id);
  return entry;
};

const postNewEntry = (newEntry: NewEntry, p_id: string): Entry => {
  const id = uuid();
  const entryWithID = { ...newEntry, id };
  patients.forEach((patient) => {
    if (patient.id === p_id) {
      patient.entries.push(entryWithID);
      return patient;
    }
    return patient;
  });

  return entryWithID;
};


export default {
  getEntries,
  addEntry,
  findById,
  postNewEntry
};