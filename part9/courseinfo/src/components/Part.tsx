import React from 'react';
import { CoursePart } from '../type'


const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  
  
const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch (part.type) {
        case "normal":
            return (<div>
              <b>{part.name} {part.exerciseCount}</b><br></br>
              <i>{part.description}</i>
              <br></br><br></br>
              </div>
            )
        case "groupProject":
            return (
                <div>
                  <b>{part.name} {part.exerciseCount}</b><br></br>
                  <i>{part.description}</i>
                  project exercises: {part.groupProjectCount}
                  <br></br><br></br>
                  </div>
            )
        case "submission":
            return (
                <div>
                  <b>{part.name} {part.exerciseCount}</b><br></br>
                  <i>{part.description}</i><br></br>
                  submit to: {part.exerciseSubmissionLink}
                  <br></br><br></br>
                  </div>
            )
        case "special":
            return (
            <div>
                <b>{part.name} {part.exerciseCount}</b><br></br>
                <i>{part.description}</i><br></br>
                requirements: {part.requirements.join(', ')}
                <br></br>
            </div>
            )
        default:
            return assertNever(part);
        }
};

export default Part;