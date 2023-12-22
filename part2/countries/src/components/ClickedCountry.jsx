import GetWeather from "./GetWeather";

const ClickedCountry = ({ countryToShow }) => {

    const renderCountryDetails = (country) => {
      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>capital: {country.capital}</p>
          <p>area: {country.area} km²</p>
          <h2>languages:</h2>
          <ul>
            {Object.values(country.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={`${country.name.common} flag`} />
          <GetWeather cityName={country.capital} />
        </div>
      );
    };
  
    if (countryToShow !== '') {
      return renderCountryDetails(countryToShow);
    }

    return null;

  };
  
  export default ClickedCountry;
  