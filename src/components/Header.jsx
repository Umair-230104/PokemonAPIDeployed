import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #cc0000; /* Pokémon red */
  color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Press Start 2P', sans-serif; /* Pokémon-style font */
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    padding: 0.25rem 0;

    &.active {
      border-bottom: 2px solid #fff; /* Highlight active link */
    }

    &:hover {
      color: #fdd835; /* Pokémon yellow for hover */
    }
  }
`;

const Header = () => {
  return (
    <Nav>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <h1 style={{ margin: 0 }}>Pokémon API</h1>
      </Link>

      <NavLinks>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/pokemons">Pokémons</NavLink>
      </NavLinks>
    </Nav>
  );
};

export default Header;
