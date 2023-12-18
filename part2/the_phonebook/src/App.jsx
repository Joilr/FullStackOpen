import { useState, useEffect } from 'react'
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
  
    if (newNumber === "") {
      alert(`Missing phone number`);
      return;
    }
  
    if (persons.some((person) => person.name === newName && person.number === newNumber)) {
      alert(`${newName} is already added to phonebook with this`);
      return;
    }
  
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson && existingPerson.number !== newNumber) {
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`);
  
      if (confirmUpdate) {
        const updatedPerson = {
          ...existingPerson,
          number: newNumber,
        };
  
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
          })
          .catch(error => {
            alert(`Failed to update the person's number: ${error.message}`);
          });
      }
    } 
    
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
  
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        });
    }
  };

  const deletePerson = (id) => {

    const personToDelete = persons.find(person => person.id === id);

    if (!personToDelete) {
      alert("Person not found.");
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${personToDelete.name}?`)) {

      personService
        .dlt(id)

        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })

        .catch(error => {
          alert(`Failed to delete the person: ${error.message}`);
        });
        
    }
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const filteredPersons = newFilter
    ? persons.filter(
      (person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase()) ||
        person.number.includes(newFilter)
    )
    : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
        <h1>add a new</h1>
      </form>
      <form onSubmit={addPerson}>

        <PersonForm newName={newName} handlePersonChange={handlePersonChange}
          newNumber={newNumber} handleNumberChange={handleNumberChange}
        />

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h1>Numbers</h1>
      {filteredPersons.map((person) => (
        <Persons key={person.id} 
        person={person} 
        onDelete={deletePerson}
        />
      ))}
    </div>
  );
};

export default App;
