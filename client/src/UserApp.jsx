import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserDetails from "./UserDetails";
import { useAppState } from "./controller/AppStateContext";
import { AppStateProvider } from "./controller/AppStateContext";


export const UserApp = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { recentSearches, setRecentSearches, favorites, setFavorites } = useAppState();

  useEffect(() => {
    const storedRecentSearches = localStorage.getItem("recentSearches");
    if (storedRecentSearches) {
      setRecentSearches(JSON.parse(storedRecentSearches));
    }

    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      setIsLoading(true);

      fetch(`/user/search/${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data.results);
          setIsLoading(false);
          setRecentSearches([...recentSearches, searchQuery]);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  const toggleFavorite = (username) => {
    if (favorites.includes(username)) {
      setFavorites(favorites.filter((favorite) => favorite !== username));
    } else {
      setFavorites([...favorites, username]);
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
                <button onClick={() => toggleFavorite(suggestion.username)}>
                  {favorites.includes(suggestion.username) ? "Unfavorite" : "Favorite"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2>Recent Searches</h2>
        <ul>
          {recentSearches.map((search, index) => (
            <li key={index}>{search}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Favorites</h2>
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite}>
              {favorite}
              <button onClick={() => toggleFavorite(favorite)}>Unfavorite</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
function App() {
  return (
    <Router>
      <AppStateProvider>
        <Routes>
          <Route path="/" element={<UserApp />} />
          <Route path="/user/:username" element={<UserDetails />} />
        </Routes>
      </AppStateProvider>
    </Router>
  );
}

export default App;