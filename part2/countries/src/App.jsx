import { useState, useEffect } from "react";
import axios from "axios";
import FormInput from "./components/FormInput";
import FilteredCountry from "./components/FilteredCountry";
import ClickedCountry from "./components/ClickedCountry";

const App = () => {

  //State handlers
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('');
  const [countryToShow, setCountryToShow] = useState('');

  //Fetching the country information
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://studies.cs.helsinki.fi/restcountries/api/all");
        setCountries(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  //FormInput
  const handleChange = (event) => {
    setNewFilter(event.target.value);
  };

  //FilteredCountry
  const filteredCountries = newFilter
    ? countries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(newFilter.toLowerCase())
    )
    : countries;

  //ClickedCountry
  const showCountry = (country) => {

    setCountryToShow(country);

  };

  return (
    <div>

      <FormInput onChange={handleChange} />

      <FilteredCountry filteredCountries={filteredCountries} showCountry={showCountry} />
      
      <ClickedCountry countryToShow={countryToShow} />

    </div>
  );
}

export default App;