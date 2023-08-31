import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Componente para mostrar los detalles de la persona
const UserDetails = ({ match }) => {
  const { username } = match.params;

  return (
    <div>
      <h2>Detalles de {username}</h2>
      {/* Mostrar detalles de la persona */}
    </div>
  );
};

export const UserApp = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      setIsLoading(true);

      fetch(`/user/search/${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data.results);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="App">
      <div>
        <h1>Search People</h1>
        <input
          type="text"
          placeholder="Search for people"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {suggestions.map((suggestion) => (
              <li key={suggestion.username}>
                <Link to={`/user/${suggestion.username}`}>{suggestion.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserApp />} />
        <Route path="/user/:username" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
