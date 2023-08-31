import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Asegúrate de importar correctamente los módulos de React Router

export const UserApp = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      setIsLoading(true);

      fetch(`/user/search/${searchQuery}`) // Cambia la URL para usar la ruta del servidor proxy
        .then((response) => response.json())
        .then((data) => {
            console.log(data.results);
          setSuggestions(data.results);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }

    console.log(suggestions)
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
                        {suggestion.name}
                    </li>
                    ))}
                </ul>
                )}
            </div>
    </div>
  );
};

export default UserApp;
