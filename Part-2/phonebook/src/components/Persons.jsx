import React from 'react'

const Persons = ({newFilter, persons, deletePerson}) => {
   
    if (newFilter === '') {
        var personsToShow = persons
      }
      else {
        var personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
      }

  return (
    <div>
        {
          personsToShow.map((person) => (
            <p key={person.id}>
            {person.name} {person.number} 
            <button onClick={() => deletePerson(person)}>delete</button>
            </p>
            
          ))
        }
      </div>
  )
}

export default Persons 