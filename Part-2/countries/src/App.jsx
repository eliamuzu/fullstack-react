import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setNewFilter] =useState('')
  const [showCountry, setShowCountry] = useState(null)

  const fetchData = () => {
    console.log('fetching data')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }

  useEffect(fetchData, [])


  const handleFilter = (event) =>{
    setNewFilter(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter))

  const handleShow = (cca3) => {
    setShowCountry(cca3)
  }

  if (filter === '') {
    return <div>
      <h3>Find Country</h3>
      <input type="text"
      value={filter} 
      onChange={handleFilter}
      />
    </div>
    
  }else if(countriesToShow.length > 5){
    return <div>
      <h3>Find Country</h3>
      <input type="text"
      value={filter} 
      onChange={handleFilter}
      />
      <p>Too many matches, specify another filter</p>
    </div>

  } else if(countriesToShow.length > 1){
     return (
    <div>
      <h3>Find Country</h3>
      <input type="text"
      value={filter} 
      onChange={handleFilter}
      />
      {
        countriesToShow.map(country => (
          <div key={country.id}>
            {showCountry ===country.cca3 ? (
              <>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital}</p>
                <p>Area {country.area}</p>
                <h2>Languages</h2>
                <ul>
                  { 
                    Object.values(country.languages).map((value, index) => (
                      <li key={index}>{value}</li>
                    ))
                  }
                </ul>
                <div>
                  <img src={country.flags.png} alt={country.flags.alt} />
                </div>
              </>
            ) : ( 
              <>
                {country.name.common}
                <button onClick={() => handleShow(country.cca3)}>show</button>
              </>
            )}
          </div>

        ))  
      }

    </div>   
  )} else {
        return <div>
      <h3>Find Country</h3>
      <input type="text"
      value={filter} 
      onChange={handleFilter}
      />
      {
        countriesToShow.map(country => (
          <div key={country.cca3}>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2>
            <ul>
              { 
                Object.values(country.languages).map((value, index) => (
                  <li key={index}>{value}</li>
                ))
              }
            </ul>

            <div>
              <img src={country.flags.png} alt={country.flags.alt} />
            </div>
          </div>

        ))}
    </div>  

        }



}


export default App