import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Display = ({person}) => {
  return <p>{person.name} {person.number}</p>
}

const Persons = ({persons, filter}) => {
  const show = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  return (show.map(person =>
    <Display key={person.name} person={person}/>))
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
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
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
    if (persons.map(persons => persons.name).includes(newName) & newName !== '') {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
    } else if (persons.map(persons => persons.number).includes(newNumber) & newNumber !== '') {
      window.alert(`number ${newNumber} is already added to phonebook`)
      setNewNumber('')
    } else { 
      const nameObject = {
      name: newName,
      number: newNumber,
    }
  
    setPersons(persons.concat(nameObject))
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
      <Persons persons={persons} filter={newFilter}/>
    </div>
  )

}

export default App
