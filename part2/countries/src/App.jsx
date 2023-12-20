import { useState } from 'react'
//import axios from 'axios'

const App = () => {
  const [countries, setCountry] = useState([
    { name: 'Norway', id: 'Norway' },
    { name: 'Denmark', id: 'Denmark' },
    { name: 'Sweden', id: 'Sweden' },
  ]) 
  const [newFilter, setNewFilter] = useState('');

  //Filter functionality
  const handleChange = (event) => {
    setNewFilter(event.target.value);
  };

  const filteredCountries = newFilter
  ? countries.filter(
    (country) =>
      country.name.toLowerCase().includes(newFilter.toLowerCase())
  )
  : countries;


  return (
    <div>
      <form>
        find countries: <input onChange={handleChange} />
      </form>
      <ul>
        {filteredCountries.map(country => 
        <li key={country.id}> 
        {country.name} 
        </li>)}
      </ul>
    </div>
  )
}

export default App