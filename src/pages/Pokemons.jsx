function Pokemon({ pokemons }) {
  const pageStyle = {
    background: "linear-gradient(180deg, #f7e669, #ffcb05)", // Pokémon-themed gradient
    color: "#2a75bb", // Pokémon blue
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "'Press Start 2P', sans-serif", // Pokémon-style font
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

  const imageContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
  };

  const imageWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
    objectFit: "contain",
    border: "1px solid #cc0000", // Pokémon red
    borderRadius: "5px",
    backgroundColor: "#fff",
  };

  const labelStyle = {
    marginTop: "5px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#2a75bb", // Pokémon blue
  };

  const listStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    padding: 0,
    listStyleType: "none",
  };

  return (
    <div style={pageStyle}>
      <h1 style={{ textAlign: "center", fontWeight: "bold" }}>Pokémon List</h1>
      <ul style={listStyle}>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id} style={boxStyle}>
            <h2>{pokemon.name.toUpperCase()}</h2> {/* Convert name to uppercase */}
            <div style={imageContainerStyle}>
              <div style={imageWrapperStyle}>
                <img
                  src={pokemon.sprites.other.showdown.front_default}
                  alt={`${pokemon.name} Front Normal`}
                  style={imageStyle}
                />
                <span style={labelStyle}>Front (Normal)</span>
              </div>
              <div style={imageWrapperStyle}>
                <img
                  src={pokemon.sprites.other.showdown.front_shiny}
                  alt={`${pokemon.name} Front Shiny`}
                  style={imageStyle}
                />
                <span style={labelStyle}>Front (Shiny)</span>
              </div>
              <div style={imageWrapperStyle}>
                <img
                  src={pokemon.sprites.other.showdown.back_default}
                  alt={`${pokemon.name} Back Normal`}
                  style={imageStyle}
                />
                <span style={labelStyle}>Back (Normal)</span>
              </div>
              <div style={imageWrapperStyle}>
                <img
                  src={pokemon.sprites.other.showdown.back_shiny}
                  alt={`${pokemon.name} Back Shiny`}
                  style={imageStyle}
                />
                <span style={labelStyle}>Back (Shiny)</span>
              </div>
            </div>
            <p>
              <strong>Height:</strong> {pokemon.height} | <strong>Weight:</strong>{" "}
              {pokemon.weight}
            </p>
            <p>
              <strong>Types:</strong>{" "}
              {pokemon.types.map((type) => type.name).join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pokemon;
