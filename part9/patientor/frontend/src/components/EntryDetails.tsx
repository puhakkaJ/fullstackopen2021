import React from 'react';
import { Diagnosis, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from '../types';
import { Icon, Segment, Header } from 'semantic-ui-react';


const Hospital: React.FC<{entry: HospitalEntry, diagnoses: Diagnosis[]}> = ({ entry, diagnoses }) => {
    return (
        <Segment fluid>
            <Header as='h2'>{entry.date} <Icon name='hospital outline' /></Header>
            <p>
            <i>{entry.description}</i>
                  {entry.diagnosisCodes !== undefined ? entry.diagnosisCodes.map(c  => (
                      <ul key={c}>
                          <li>{c} {diagnoses.find(co => co.code === c)?.name}</li>
                      </ul>
                  )) : <div></div>}
            </p>
        </Segment>
    );
};

const OccupationalHealthcare: React.FC<{entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[]}> = ({ entry, diagnoses }) => {
    return (
        <Segment fluid>
            <Header as='h2'>{entry.date} <Icon name='stethoscope' />{entry.employerName}</Header>
            <p>
            <i>{entry.description}</i>
                  {entry.diagnosisCodes !== undefined ? entry.diagnosisCodes.map(c  => (
                      <ul key={c}>
                          <li>{c} {diagnoses.find(co => co.code === c)?.name}</li>
                      </ul>
                  )) : <div></div>}
            </p>
        </Segment>
    );
};

const HealthCheck: React.FC<{entry: HealthCheckEntry, diagnoses: Diagnosis[]}> = ({ entry, diagnoses }) => {
    return (
        <Segment fluid>
            <Header as='h2'>{entry.date} <Icon name='user md' /></Header>
            <p>
            <i>{entry.description}</i>
                  {entry.diagnosisCodes !== undefined ? entry.diagnosisCodes.map(c  => (
                      <ul key={c}>
                          <li>{c} {diagnoses.find(co => co.code === c)?.name}</li>
                      </ul>
                  )) : <div></div>}
            {entry.healthCheckRating == 0 ? <Icon name='heart' color='green'/> : entry.healthCheckRating == 1 ? <Icon name='heart' color='yellow'/> : entry.healthCheckRating == 2 ? <Icon name='heart' color='orange'/> : <Icon name='heart' color='red'/>}
            </p>
        </Segment>
    );
};

const EntryDetails: React.FC<{entry: Entry, diagnoses: Diagnosis[]}> = ({ entry, diagnoses }) => {
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    switch (entry.type) {
        case 'Hospital':
          return <Hospital entry={entry} diagnoses={diagnoses}/>;
        case 'OccupationalHealthcare':
          return <OccupationalHealthcare entry={entry} diagnoses={diagnoses}/>;
        case 'HealthCheck':
          return <HealthCheck entry={entry} diagnoses={diagnoses}/>;
        default:
          return assertNever(entry);
    }
};


export default EntryDetails;