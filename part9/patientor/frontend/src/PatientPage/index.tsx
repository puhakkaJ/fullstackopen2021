import React from 'react';
import axios from 'axios';
import { Patient, Diagnosis, Entry } from '../types';
import EntryDetails from '../components/EntryDetails';
import AddEntryModal from '../AddEntryModal';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import { Icon, Button } from 'semantic-ui-react';
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";


import { setFetchedPatient, setDiagnosis} from '../state';

const PatientPage = () => {
    const [
        { patientsConf, diagnoses },
        dispatch
      ] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const [ patient, setPatient ] = React.useState<Patient | undefined>();
    const [ diagnosesB, setDiagnoses ] = React.useState<Diagnosis[]>([]);

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
          const { data: newEntry } = await axios.post<Entry>(
            `${apiBaseUrl}/api/patients/${id}/entries`,
            values
          );
          if (patient) {
              dispatch({ type: "ADD_ENTRY", payload: newEntry, patientID: id });
          }
          closeModal();
        } catch (e) {
          console.error(e.response?.data || 'Unknown Error');
        }
      };
    

    React.useEffect(() => {
        async function getPatient() {
            try {
                const { data: patient } = await axios.get<Patient>(
                `${apiBaseUrl}/api/patients/${id}`
                );
                dispatch(setFetchedPatient(patient));
                setPatient(patient);
            } catch (error) {
                console.error(error);
                console.log(error.response.data);
            }
        }
        async function getDiagnoses() {
            try {
              const { data: diagnosesB } = await axios.get<Diagnosis[]>(
                `${apiBaseUrl}/api/diagnoses`
              );
              dispatch(setDiagnosis(diagnosesB));
              setDiagnoses(diagnosesB);
            } catch (error) {
              console.log(error);
            }
        }

        if (patientsConf[id]) {
            setPatient(patientsConf[id]);
        } else {
            void getPatient();
        }

        void getDiagnoses();
    }, [dispatch, id, patientsConf]);

    if (!patient || !diagnoses) return <div>Loading...</div>;

    return (
        <div>
          {patient.gender === "female" ?
          <h1>{patient.name}  <Icon name='venus' /></h1> : patient.gender === "male" ? <h1>{patient.name}  <Icon name='mars' /></h1> : <h1>{patient.name}  <Icon name='genderless' /></h1>}
          <div>
            <b>SSN:</b> {patient.ssn}
          </div>
          <div>
            <b>Occupation:</b> {patient.occupation}
          </div>
          <h3>Entries</h3>
          {patient.entries.map((e: Entry) => (
              <EntryDetails key={e.id} entry={e} diagnoses={diagnosesB}/>
          ))}
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            onClose={closeModal}
          />
          <Button onClick={() => openModal()}>Add New Entry</Button>
        </div>
        );
};

export default PatientPage;