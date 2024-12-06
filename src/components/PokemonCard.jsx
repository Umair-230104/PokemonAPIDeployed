import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function PokemonCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://pokemonapi.ut-cphb.dk/api/pokemons/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }
        return res.json();
      })
      .then((data) => setPokemon(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  const pageStyle = {
    background: "linear-gradient(180deg, #f7e669, #ffcb05)",
    color: "#2a75bb",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "'Press Start 2P', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const boxStyle = {
    border: "2px solid #2a75bb",
    borderRadius: "10px",
    padding: "20px",
    maxWidth: "600px",
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
    border: "1px solid #cc0000",
    borderRadius: "5px",
    backgroundColor: "#fff",
  };

  const labelStyle = {
    marginTop: "5px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#2a75bb",
  };

  const buttonStyle = {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#2a75bb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  };

  if (isLoading) {
    return <div style={pageStyle}><p>Loading...</p></div>;
  }

  if (error) {
    return <div style={pageStyle}><p style={{ color: "red" }}>{error}</p></div>;
  }

  const sprites = pokemon.sprites?.other?.showdown;

  return (
    <div style={pageStyle}>
      <div style={boxStyle}>
        <h1>{pokemon.name.toUpperCase()}</h1>
        <div style={imageContainerStyle}>
          <div style={imageWrapperStyle}>
            {sprites?.front_default ? (
              <>
                <img
                  src={sprites.front_default}
                  alt={`${pokemon.name} Front Normal`}
                  style={imageStyle}
                />
                <span style={labelStyle}>Front (Normal)</span>
              </>
            ) : (
              <span style={labelStyle}>No Front (Normal)</span>
            )}
          </div>
          <div style={imageWrapperStyle}>
            {sprites?.front_shiny ? (
              <>
                <img
                  src={sprites.front_shiny}
                  alt={`${pokemon.name} Front Shiny`}
                  style={imageStyle}
                />
                <span style={labelStyle}>Front (Shiny)</span>
              </>
            ) : (
              <span style={labelStyle}>No Front (Shiny)</span>
            )}
          </div>
          <div style={imageWrapperStyle}>
            {sprites?.back_default ? (
              <>
                <img
                  src={sprites.back_default}
                  alt={`${pokemon.name} Back Normal`}
                  style={imageStyle}
                />
                <span style={labelStyle}>Back (Normal)</span>
              </>
            ) : (
              <span style={labelStyle}>No Back (Normal)</span>
            )}
          </div>
          <div style={imageWrapperStyle}>
            {sprites?.back_shiny ? (
              <>
                <img
                  src={sprites.back_shiny}
                  alt={`${pokemon.name} Back Shiny`}
                  style={imageStyle}
                />
                <span style={labelStyle}>Back (Shiny)</span>
              </>
            ) : (
              <span style={labelStyle}>No Back (Shiny)</span>
            )}
          </div>
        </div>
        <p><strong>Height:</strong> {pokemon.height}</p>
        <p><strong>Weight:</strong> {pokemon.weight}</p>
        <p>
          <strong>Types:</strong> {pokemon.types.map((type) => type.name).join(", ")}
        </p>
        <button
          onClick={() => navigate("/search", { state: location.state })}
          style={buttonStyle}
        >
          Back to Search
        </button>
      </div>
    </div>
  );
}

export default PokemonCard;
