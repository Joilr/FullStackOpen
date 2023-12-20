import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('');
  const [countryToShow, setCountryToShow] = useState(''); //JOBBE MED DENNE VIDERE!

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://studies.cs.helsinki.fi/restcountries/api/all");
        setCountries(response.data);
      } catch (err) {
        console.error(err); // Log the error for debugging
      }
    };

    fetchData();
  }, []);

  //Filter functionality
  const handleChange = (event) => {
    setNewFilter(event.target.value);
  };

  const filteredCountries = newFilter
    ? countries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(newFilter.toLowerCase())
    )
    : countries;

  //Show button
  const showCountry = (country) => {

    console.log(country.name.common)

  };

  return (
    <div>

      <form>
        find countries: <input onChange={handleChange} />
      </form>

      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        
      <div>
        {filteredCountries.map(country => (
          <div key={country.name.official}>
            <h1>{country.name.common}</h1> 
            <p>capital {country.capital}</p>
            <p>area {country.area} km²</p>
            <h2>languages:</h2> 
            <li>{Object.values(country.languages).join(", ")}</li> 
            <img src={country.flags.png} alt={`${country.name.common} flag`} />
          </div>
        ))}
      </div>

      ) : (
        <ul>
          {filteredCountries.map(country =>
            <li key={country.name.official}>
              {country.name.common} <button onClick={() => showCountry(country)}>show</button>
            </li>
          )}
        </ul>
      )
      }

    </div>
  );
}

export default App