import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

function SearchPokemon() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const location = useLocation();

  // Restore search term and results if navigating back
  useEffect(() => {
    if (location.state) {
      setSearchTerm(location.state.searchTerm || "");
      setFilteredPokemons(location.state.filteredPokemons || []);
    }
  }, [location.state]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://pokemonapi.ut-cphb.dk/api/pokemons")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }
        return res.json();
      })
      .then((data) => setAllPokemons(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  // Trigger message slide-in
  useEffect(() => {
    setTimeout(() => {
      setShowMessage(true);
    }, 500); // Start sliding in after 500ms
  }, []);

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredPokemons([]);
      return;
    }

    const filtered = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredPokemons(filtered);
  };

  const pageStyle = {
    background: "linear-gradient(180deg, #f7e669, #ffcb05)",
    color: "#2a75bb",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "'Press Start 2P', sans-serif",
    position: "relative", // Ensures the message is positioned correctly
  };

  const boxStyle = {
    marginBottom: "20px",
    border: "2px solid #2a75bb",
    borderRadius: "10px",
    padding: "15px",
    maxWidth: "300px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff",
  };

  const listStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    padding: 0,
    listStyleType: "none",
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
    objectFit: "contain",
    border: "1px solid #cc0000",
    borderRadius: "5px",
    backgroundColor: "#fff",
  };

  const messageStyle = {
    position: "absolute",
    top: "80px",
    right: showMessage ? "20px" : "-300px", // Slide-in animation
    transition: "right 0.5s ease-in-out", // Smooth slide animation
    backgroundColor: "#cc0000",
    color: "#fff",
    padding: "15px 20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    fontFamily: "'Press Start 2P', sans-serif",
    zIndex: 10,
  };

  return (
    <div style={pageStyle}>
      <div style={messageStyle}>
        Click on a Pokémon for info!
      </div>

      <h1 style={{ textAlign: "center", fontWeight: "bold" }}>Search Pokémon</h1>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Pokémon name"
          value={searchTerm}
          onChange={handleInputChange}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {filteredPokemons.length > 0 && (
        <ul style={listStyle}>
          {filteredPokemons.map((pokemon) => (
            <li key={pokemon.id} style={boxStyle}>
              <NavLink
                to={`/pokemon/${pokemon.id}`}
                state={{ searchTerm, filteredPokemons }} // Pass search data
                style={{ textDecoration: "none", color: "#2a75bb" }}
              >
                <h2>{pokemon.name.toUpperCase()}</h2>
              </NavLink>
              {pokemon.sprites?.other?.showdown?.front_default ? (
                <img
                  src={pokemon.sprites.other.showdown.front_default}
                  alt={pokemon.name}
                  style={imageStyle}
                />
              ) : (
                <p style={{ color: "#cc0000" }}>No Image Available</p>
              )}
            </li>
          ))}
        </ul>
      )}

      {searchTerm.trim() !== "" && filteredPokemons.length === 0 && !isLoading && (
        <p style={{ textAlign: "center" }}>
          No Pokémon found matching "{searchTerm}".
        </p>
      )}
    </div>
  );
}

export default SearchPokemon;
