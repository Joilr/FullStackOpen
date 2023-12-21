const FilteredCountry = ({ filteredCountries, showCountry }) => {

    if (filteredCountries.length > 10) {
        return(
            <p>Too many matches, specify another filter</p>
        );
    } 
    
    else if (filteredCountries.length === 1) {
        return(
        <div>
          {filteredCountries.map(country => (
            <div key={country.name.official}>
              <h1>{country.name.common}</h1> 
              <p>capital {country.capital}</p>
              <p>area {country.area} km²</p>
              <h2>languages:</h2> 
              <ul>
                {Object.values(country.languages).map(language => (
                  <li key={language}>{language}</li>
                ))}
              </ul>
              <img src={country.flags.png} alt={`${country.name.common} flag`} />
            </div>
          ))}
        </div>   
        );
    }

    else {
      return(
        <ul>
          {filteredCountries.map(country => (
            <li key={country.name.official}>
              {country.name.common} <button onClick={() => showCountry(country)}>show</button>
            </li>
          ))}
        </ul>
      );
    }
}

export default FilteredCountry;