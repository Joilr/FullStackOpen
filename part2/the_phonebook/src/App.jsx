import { useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {

  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: "Arto Hellas" },
    { name: "Ada Lovelace", number: "39-44-5323523", id: "Ada Lovelace" },
    { name: "Dan Abramov", number: "12-43-234345", id: "Dan Abramov" },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: "Mary Poppendieck",
    },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

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
        id: newName,
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
