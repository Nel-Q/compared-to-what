// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import './App.css';
import {useState} from 'react'

function App() {
  const menuItems = ["Total Population", "Median Household Income", "Per Capita Income", "Under 5yo %"]
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  function handleOptionClick (option) {
    setSelectedOption(option);
    setIsOpen(false);
  }
  function handleSearchInput (event){
    setSearchQuery(event.target.value);
    console.log(searchQuery);
  }

  return (
    <div className="App">
      <header className="Header">
        <h1>Compared-to-What</h1>
        <div className="Contact-info">
          <a href="app.js"><button id="Home" onClick>Home</button></a>
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
       <button className='search-button' onClick={() => console.log("clicked search")}>
        Search</button>
      </div>
    </div>
  );
}

export default App;
