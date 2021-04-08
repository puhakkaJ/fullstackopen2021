import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Display = ({person, setPersons, persons}) => {
  const handleButtonClick = (event) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {  
      const i = person.id
      personService.clear(i)
      setPersons(persons.filter(person => person.id !== i))
    }
  }

  return (
    <p>{person.name} {person.number}
      <button onClick={handleButtonClick}>delete</button>
    </p>)
}

const Persons = ({persons, filter, setPersons}) => {
  const show = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (show.map(person =>
      <Display key={person.name} person={person} setPersons={setPersons} persons={persons}/>))
}

const PersonForm = ({addName, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
  <form onSubmit={addName}>
    <div>
      name: <input 
      value={newName}
      onChange={handleNameChange}/>
    </div>
    <div>
      number: <input 
      value={newNumber}
      onChange={handleNumberChange}/>
    </div>
     <div>
      <button type="submit">add</button>
    </div>
    </form>
  )
}

const Filter = ({newFilter, handleFilterChange}) => {
  return (
    <div>
      filter shown with: <input 
      value={newFilter}
      onChange={handleFilterChange}/>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService.load(setPersons)
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.map(persons => persons.name).includes(newName) & (newName !== '' & newNumber !== '')) {
      const person = persons.find(n => n.name === newName)

      if (window.confirm(`Do you want to change ${person.name}'s number to ${newNumber}?`)) {
        const changedPerson = { ...person, number: newNumber}
        personService.update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(per => per.id !== person.id ? per : returnedPerson))}
          )
      }

      setNewName('')
      setNewNumber('')

    } else { 
      const nameObject = {
      name: newName,
      number: newNumber,
    }
  
    personService.create(nameObject)
      .then(added => {
        setPersons(persons.concat(added))
      })
      .catch(error => {
        console.log('fail', error)
      })

    setNewName('')
    setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber}
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} setPersons={setPersons}/>
    </div>
  )

}

export default App
