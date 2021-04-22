import React from 'react'
import personService from '/Users/jennipuhakka/puh/src/services/persons'



const Display = ({person, setPersons, persons, setNum, setErrorMessage}) => {
    const handleButtonClick = (event) => {
      if (window.confirm(`Do you really want to delete ${person.name}?`)) {  
        const i = person.id
        personService.clear(i)
        .catch(error => {
          console.log('fail',error)
          setErrorMessage(
            `Information of '${person.name}' has already been removed from server`
          )
          setNum(1)
      
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
  
        })
        
        setPersons(persons.filter(person => person.id !== i))
  
        setErrorMessage(
          `'${person.name}' was deleted succesfully`
        )
        setNum(1)
  
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  
    return (
      <p>{person.name} {person.number}
        <button onClick={handleButtonClick}>delete</button>
      </p>)
  }
  
  const Persons = ({persons, filter, setPersons, setNum, setErrorMessage}) => {
    const show = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    
    return (show.map(person =>
        <Display key={person.name} person={person} setPersons={setPersons} persons={persons} setNum={setNum} setErrorMessage={setErrorMessage}/>))
  }
  
  export default Persons