import { useEffect, useState } from 'react'
import personService from './services/persons.js'
import './index.css'
import Filter from './components/Filter.jsx'
import Form from './components/Form.jsx'
import Persons from './components/Persons.jsx'
import Notification from './components/Notification.jsx'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')
  const [color, setColor] = useState(true)

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
   
    if (persons.some(person => person.name.trim() === newName.trim())) {
      const p = persons.find(person => person.name.trim() === newName.trim())
      const changedDetails = {...p, number: newNumber}

      confirm(`${p.name} is already added to phonebook, replace the old number with a new one?`)
      personService
        .update(p.id, changedDetails)
        .then( () => {
            setPersons(persons.map(person => person.id === p.id ? changedDetails : person))
        })
        .catch(error => {
          setMessage(`Information of ${p.name} has already been removed from server`)
          setColor(false)
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
        .then(() => {
          setColor(true)
          setMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setMessage('')
          }, 5000)
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

      <Notification message={message} isError={color}/>

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