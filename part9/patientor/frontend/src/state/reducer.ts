import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: 'FETCHED_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSIS_LIST';
      payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: Entry;
    patientID: string;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case 'FETCHED_PATIENT':
        return {
          ...state,
          patientsConf: {
            ...state.patientsConf,
            [action.payload.id]: action.payload
          }
        };
      case 'SET_DIAGNOSIS_LIST':
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnosis) => ({ [diagnosis.code]: diagnosis, ...memo }),
              {}
            )
          }
        };
        case "ADD_ENTRY":
          const newPatients = state.patientsConf[action.patientID];
          newPatients.entries.push(action.payload);

          return {
            ...state,
            patientsConf: {
              ...state.patientsConf,
              [action.patientID]: newPatients
            }
          };
    default:
      return state;
  }
};

export const setFetchedPatient = (patient: Patient): Action => {
  return { type: 'FETCHED_PATIENT', payload: patient };
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return { type: 'SET_PATIENT_LIST', payload: patientListFromApi };
};

export const setDiagnosis = (diagnoses: Diagnosis[]): Action => {
  return { type: 'SET_DIAGNOSIS_LIST', payload: diagnoses };
};