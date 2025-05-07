import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import axios from "axios";

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        setPokemon(res.data);
      } catch (error) {
        console.error("포켓몬 정보를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchData();
  }, [name]);

  const handleOnClick = () => {
    navigate(-1);
  };

  if (!pokemon) return <p>로딩 중...</p>;

  return (
    <PokemonDetailContainer>
      <button type="button" onClick={handleOnClick}>
        ← 목록으로
      </button>
      <PokemonName> {pokemon.name} </PokemonName>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>
        <strong>Type:</strong>
        {pokemon.types.map((t) => t.type.name).join(", ")}
      </p>
    </PokemonDetailContainer>
  );
};

export default PokemonDetail;

const PokemonDetailContainer = styled.div`
  padding: 100px;
`;

const PokemonName = styled.h1`
  margin-top: 50px;
`;

const PokemonInfo = styled.div`
  margin-top: 50px;
`;
