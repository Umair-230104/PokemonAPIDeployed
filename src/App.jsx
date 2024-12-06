import React, { useState, useEffect } from "react";
import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Pokemons from "./pages/Pokemons";
import SearchPokemon from "./pages/SearchPokemon";
import PokemonCard from "./components/PokemonCard";

 
const Layout = () => (
  <div>
    <Header />
    <main>
      <Outlet />
    </main>
  </div>
);

const PokemonUrl = "https://pokemonapi.ut-cphb.dk/api/pokemons";

function App() {

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch(PokemonUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }
        return res.json();
      })
      .then((data) => {
        setPokemons(data); // Use data directly if no `results` field exists
      })
      .catch((err) => console.error(err));
  }, []);
  
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="pokemons" element={<Pokemons pokemons={pokemons} />} />
        <Route path="search" element={<SearchPokemon />} />
        <Route path="pokemon/:id" element={<PokemonCard />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App
