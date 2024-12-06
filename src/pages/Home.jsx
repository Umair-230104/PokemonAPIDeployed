function Home() {
  const pageStyle = {
    background: "linear-gradient(180deg, #f7e669, #ffcb05)", // Pokémon theme gradient
    color: "#2a75bb", // Pokémon blue for text
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "'Press Start 2P', sans-serif", // Pokémon-style font
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const paragraphStyle = {
    marginTop: "1rem",
    fontSize: "1rem", // Slightly smaller font for better readability
    textAlign: "center",
    maxWidth: "600px",
  };

  const imageStyle = {
    width: "50%",
    height: "auto",
    display: "block",
  };

  return (
    <div style={pageStyle}>
      <img
        src="/PokemonLogo.png"
        alt="Pokemon Logo"
        style={imageStyle}
      />
      <p style={paragraphStyle}>
        Welcome to our Pokémon API! This application is designed to help you
        efficiently manage your fleet of Pokémon.
      </p>
    </div>
  );
}

export default Home;
