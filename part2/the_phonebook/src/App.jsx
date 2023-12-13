import { useState } from 'react'
import Person from './components/Person'

const App = () => {

  const [persons, setPersons] = useState([
    { 
      id: 1,
      name: 'Arto Hellas' 
    },
    { 
      id: 2,
      name: 'Ada Lovelace' 
    }
  ]);
  

  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: persons.length + 1,
    }
  
    setPersons(persons.concat(personObject))
    setNewName('')
  }
  
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handlePersonChange}
           />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      {persons.map(person =>
        <Person key={person.id} person={person} />
        )}
    </div>
  )
}

export default App