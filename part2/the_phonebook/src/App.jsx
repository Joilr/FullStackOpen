import { useState, useEffect } from 'react'
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from './services/persons'
import './index.css'

const App = () => {
  const [deletedPersons, setDeletedPersons] = useState([]);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [addedMessage, setAddedMessage] = useState("");
  const [messageSource, setMessageSource] = useState("");

  const fetchPersonsData = () => {
    return personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
        return personService.getAll2();
      })
      .then(initialDeletedPersons => {
        setDeletedPersons(initialDeletedPersons);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  
  useEffect(() => {
    fetchPersonsData();
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    fetchPersonsData().then(() => {
  
    if (newNumber === "") {
      alert(`Missing phone number`);
      return;
    }
  
    if (persons.some((person) => person.name === newName && person.number === newNumber)) {
      alert(`${newName} is already added to phonebook with this number`);
      return;
    }


    
    if (persons.some(person => person.name === newName)) {
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
    
      if (confirmUpdate) {

        if (deletedPersons.some((person) => person.name === newName)) {
          setAddedMessage(`Information of ${newName} has already been removed from server`);
          setMessageSource('delMsg');
          setTimeout(() => {
            setAddedMessage(null);
          }, 5000);
          return;
        }

        const personToUpdate = persons.find(person => person.name === newName);
        personService
          .update(personToUpdate.id, {
            ...personToUpdate,
            number: newNumber,
          })
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson));
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
          setAddedMessage(`Added ${newName}`)
          setMessageSource('addedMsg');
          setTimeout(() => {
            setAddedMessage(null);
          }, 5000);
        });
    }
  });
  };

  const deletePerson = (id) => {

    const personToDelete = persons.find(person => person.id === id);

    if (!personToDelete) {
      alert("Person not found.");
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${personToDelete.name}?`)) {

      const personDeletedObject = {
        name: personToDelete.name,
        number: personToDelete.number,
        id: deletedPersons.length + 1,
      };

      personService
      .dltList(personDeletedObject)
  
      .then(removedPerson => {
        setDeletedPersons(deletedPersons.concat(removedPerson));
      })
      .catch(error => {
        alert(`Failed to add person to deleted list: ${error.message}`);
      });

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


    const Notification = ({ message, source }) => {

      const messageClass = message ? `${source}` : `${source} empty`;

      return (
        <div className={messageClass}>
          {message}
        </div>
      );
    };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={addedMessage} source={messageSource} />
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
