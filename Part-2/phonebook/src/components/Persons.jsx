import React from 'react'

const Persons = ({newFilter, persons}) => {
   
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
            </p>
          ))
        }
      </div>
  )
}

export default Persons