import React, { useState, useEffect } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import toFirstCharUppercase from "./constants";
import Axios from "axios";

function Pokemon(props) {
  const { history, match } = props;
  const { pokemonId } = match.params;

  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((res) => {
        const { data } = res;
        setPokemon(data);
      })
      .catch((err) => setPokemon(false));
    return () => {};
  }, []);

  const generatePokemonJSX = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;

    return (
      <>
        <Typography variant="h1">
          {`${id}. ${toFirstCharUppercase(name)}`}
        </Typography>
        <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
        <Typography variant="h3">Pokemon Info</Typography>
        <Typography>
          Species: <Link href={species.name}>{species.name}</Link>
        </Typography>
        <Typography>Height: {height}</Typography>
        <Typography>Weight: {weight} </Typography>
        <Typography variant="h6">Types:</Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;

          return <Typography key={name}>{name}</Typography>;
        })}
      </>
    );
  };

  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX()}
      {pokemon === false && <Typography>Pokemon not found</Typography>}
      {pokemon !== undefined && (
        <Button variant="contained" onClick={() => history.push("/")}>
          back to pokedex
        </Button>
      )}
    </>
  );
}

export default Pokemon;
