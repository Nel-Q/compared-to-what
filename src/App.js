// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import './App.css';
import {useState} from 'react'

function App() {
  const menuItems = ["Total Population", "Median Household Income", "Per Capita Income", "Under 5yo %"]
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchesults] = useState([]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
  };

  const search = async(query) => {
    const queryList = query.split(",");
    const querying = queryList[0].trim()+"+city,+"+queryList[1].trim()
    console.log(querying)
    try{
      const response = await fetch(`http://127.0.0.1:5000/get-similar?place=${querying}`)
      const data = await response.json();
      setSearchesults(data);
      console.log(data)
      console.log(searchResults)
    } catch (error) {
      console.error(error)
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
            {menuItems.map((item) => {
              return(
              <li key={item} onClick={()=> handleOptionClick(item)}>
                {item}
              </li>
              
            );})}
          </ul>
        )}
       </div>
       <button className='search-button' onClick={()=>search(searchQuery)}>
        Search</button>
      </div>
      {searchResults.length > 0 && (
        <div className='search-results'>
          {searchResults.map((result) => (
            <div key={result.id} className='search-result'>
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
