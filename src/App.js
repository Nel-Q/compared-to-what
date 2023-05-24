// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import './App.css';
import {useEffect, useMemo, useState} from 'react'

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchesults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState(null);
  const [filterDescription, setFilterDescription] = useState('');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  
  useEffect(() => {
    const fetchData = async() => {
      try{
        const response = await fetch(`https://comparedtowhat.azurewebsites.net/all-places`)
        const result = await response.json();
        setData(result)
      } catch (error) {
        console.log(error)
      }
      
    };
    fetchData();
  },[]);

  useEffect(() => {
    const fetchFilters = async() => {
      try{
        const response = await fetch(`https://comparedtowhat.azurewebsites.net/all-filters`)
        const result = await response.json();
        setMenuItems(result)
      } catch (error) {
        console.log(error)
      }
      
    };
    fetchFilters();
  },[]);

  useEffect(() => {
    const FetchFilterDescription = async(filter=null) => {
      if (filter !== null) {
        try{
          const response = await fetch(`https://comparedtowhat.azurewebsites.net/filter-description?filter=${filter}`)
          const result = await response.text();
          setFilterDescription(result);
        } catch (error) {
          console.log(error)
        }
      } else {
        try{
          const response = await fetch(`https://comparedtowhat.azurewebsites.net/filter-description?filter=default`)
          const result = await response.text();
          setFilterDescription(result);
        } catch (error) {
          console.log(error)
        }
      }
    }
    FetchFilterDescription(selectedOption);
  },[selectedOption]);

  const memoizedMenu = useMemo(() => menuItems, [menuItems]);
  const memoizedData = useMemo(() => data, [data]);
  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
    try{
      if (searchQuery.length >= 3) {
        const filteredSuggestions = memoizedData.filter((suggestion) =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase()));
        setSuggestions(filteredSuggestions)
        console.log(searchQuery)
      } else {setSuggestions([])}
    } catch(error) {
      console.log(error)
    } 
  };

  const search = async(query, filter=null) => {
    if (selectedOption !== null) {
      try{
        const response = await fetch(`https://comparedtowhat.azurewebsites.net/get-similar?place=${query}&filter=${filter}`)
        const data = await response.json();
        setSearchesults(data);
        setSuggestions([])
      } catch (error) {
        console.error(error)
      } 
    } else {
      try{
        const response = await fetch(`https://comparedtowhat.azurewebsites.net/get-similar?place=${query}`)
        const data = await response.json();
        setSearchesults(data);
        setSuggestions([])
      } catch (error) {
        console.error(error)
      }   
    }
    
  };
  return (
    <div className="App">
       <header className="Header">
          <h1>Compared-to-Where</h1>
          <div className="Contact-info">
            <a href="app.js"><button id="Home">Home</button></a>
            <button id="Filter-Header">Filters</button>
            <button id="About">About</button>
          </div>
        </header>
      <main className='Main'>
        <div className='Modal'>
          <div className="searchComponent">
            <div className='searchPart'>
              <input id="searchBox" placeholder="Enter a City Name"
              autoComplete="off" type="text" value={searchQuery}
              onChange={handleSearchInput}/>
              {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((suggestion) => (
                  <li key={suggestion} className='suggestions-item' onClick={() => setSearchQuery(suggestion)}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
            </div>
            <div className="dropdown-menu">
              <button onClick={() => setIsOpen(!isOpen)}>
                {selectedOption || "Filters"}
              </button>
              {isOpen && (
                <ul>
                  {memoizedMenu.map((item) => {
                    return(
                    <li key={item} onClick={()=> handleOptionClick(item)}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </li>
                    
                  );})}
                </ul>
              )}
            </div>
            <button className='search-button' onClick={()=>search(searchQuery, selectedOption)}>
              Search</button>
          </div>
          {searchResults.length > 0 && (
            <div className='search-results'>
              
                <ol >
                {searchResults.map((result) => (
                  <li key={result} className='search-result'>{result}</li>
                  ))}
                </ol>
              
            </div>
          )}
        </div>
        <aside>
          <div className='filter-info' dangerouslySetInnerHTML={{ __html: filterDescription }}></div>
          <p>Changing the filter does not mean only the named metrics will matter. For example, 
              if you use the location filter on a suburb, the tool will not return the major city 
              it is a suburb of, but instead will show other similar suburbs in the same region of America.</p>
          <div className='tool-info'>
            <h3>About</h3>
            <p>Compared To Where is a tool designed to help journalists and other researchers find comparable American cities to enhance their work. 
              It uses Census data to compare information about population/density, economic factors, demographic factors and more to find similar “Census places”.
              If you would like to use our API in your own projects you can find out more <a href='https://comparedtowhat.azurewebsites.net/'>here</a>.</p>
          </div>
          <div className='results-interpretation'>
            <h3>Interpreting Results</h3>
            <p>
              After you search for a city, the 10 most similar cities will appear on the left. 
              We use a nearest neighbors algorithm to find the cities that are the best match for all of our data metrics. 
              You can use filters, which adjust the weighted importance of the metrics to change the results. 
              To see a description of all filters click <a href='https://comparedtowhat.azurewebsites.net/all-filters'>here</a>.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
