import { useEffect, useState } from 'react'
import personService from './services/persons.js'
import Filter from './components/Filter.jsx'
import Form from './components/Form.jsx'
import Persons from './components/Persons.jsx'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('fetching data')
    personService
      .getAll()
      .then(savedPersons => setPersons(savedPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name : newName,
      number : newNumber,
    }
   
    if (persons.some(person => person.name === newName)) {
      const p = persons.find(person => person.name === newName)
      const changedDetails = {...p, number: newNumber}
      confirm(`${p.name} is already added to phonebook, replace the old number with a new one?`)

      personService
        .update(p.id, changedDetails)
        .then( () => {
            setPersons(persons.map(person => person.id === p.id ? changedDetails : person))
        })
    }
    else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
     
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const deletePersonOf = (targetPerson) => {
    confirm(`Delete ${targetPerson.name}`)
    console.log(`deleting ${targetPerson.id}`)
    setPersons(persons.filter(person => person.id !== targetPerson.id))
    personService
      .deletePerson(targetPerson.id)
  }
 

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      
      <h3>Add New Contact</h3>
      <Form addPerson={addPerson} newName={newName} newNumber={newNumber}
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      
      <h3>Your Numbers</h3>

      <Persons newFilter={newFilter} persons={persons} deletePerson={deletePersonOf} />
      
    </div>
  )
}

export default App