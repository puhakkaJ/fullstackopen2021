import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'
import Notification from './components/Notification'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [num, setNum] = useState(1)


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
        .catch(error => {
          console.log('fail',error)
          setErrorMessage(
            `Information of '${person.name}' has already been removed from server`
          )
          setNum(1)
      
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

          setPersons(persons.filter(n => n.id !== person.id))
        })
      }

      setErrorMessage(
        `${person.name}'s number was changed succesfully`
      )
      setNum(3)
      
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      setNewName('')
      setNewNumber('')

    } else { 
      const nameObject = {
        name: newName,
        number: newNumber,
    }
    var i = 0
    personService.create(nameObject)
      .then(added => {
        setPersons(persons.concat(added))
      })
      .catch(error => {
        console.log(error.response.data.error)
        i = 1
        setErrorMessage(
          `${error.response.data.error}`
        )
        setNum(1)

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

      if (i === 0) {
        setErrorMessage(
          `'${nameObject.name}' was added succesfully`
        )
        setNum(2)

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }

      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} num={num}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber}
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} setPersons={setPersons} setNum={setNum} setErrorMessage={setErrorMessage}/>
    </div>
  )

}

export default App
