import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else if (newNumber == "") {
      alert(`Missing phone number`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
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
        <Persons key={person.id} person={person} />
      ))}
    </div>
  );
};

export default App;
