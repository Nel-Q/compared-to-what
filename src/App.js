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
  const [data, setData] = useState(null)

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

  const memoizedMenu = useMemo(() => menuItems, [menuItems]);
  const memoizedData = useMemo(() => data, [data]);
  const handleSearchInput = (event) => {

    setSearchQuery(event.target.value);
    try{
      if (searchQuery.length >= 3) {
        const filteredSuggestions = memoizedData.filter((suggestion) =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase()));
        setSuggestions(filteredSuggestions)
      } else {setSuggestions([])}
    } catch(error) {
      console.log(error)
    } 
  };

  const search = async(query, filter) => {
    if (selectedOption !== null) {
      try{
        console.log(selectedOption);
        const response = await fetch(`https://comparedtowhat.azurewebsites.net/get-similar?place=${query}&filter=${filter}`)
        const data = await response.json();
        setSearchesults(data);
        setSearchQuery("")
        setSelectedOption(null)
        setSuggestions([])
      } catch (error) {
        console.error(error)
      } 
    } else {
      try{
        const response = await fetch(`https://comparedtowhat.azurewebsites.net/get-similar?place=${query}`)
        const data = await response.json();
        setSearchesults(data);
        setSearchQuery("")
        setSuggestions([])
      } catch (error) {
        console.error(error)
      }   
    }
    
  };
  return (
    <div className="App">
      <header className="Header">
        <h1>Compared-to-What</h1>
        <div className="Contact-info">
          <a href="app.js"><button id="Home">Home</button></a>
          <button id="Contact">Contact Us</button>
        </div>
      </header>
      <div className="searchPart">
        <input id="searchBox" placeholder="Enter a City Name"
        autoComplete="off" type="text" value={searchQuery}
        onChange={handleSearchInput}/>
        
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
      {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((suggestion) => (
              <li key={suggestion} className='suggestions-item' onClick={() => setSearchQuery(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      {searchResults.length > 0 && (
        <div className='search-results'>
          {searchResults.map((result) => (
            <div key={result} className='search-result'>
              <h3>{result}</h3>
              {/* <p>{result.description}</p> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
