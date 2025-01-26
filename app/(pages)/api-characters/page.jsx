"use client"

import Loading from "@/app/loading";
import Card from "@/components/card/Card";
import Title from "@/components/title/Title";
import { useEffect, useState } from "react";
import useCharactersApiStore from "@/stores/apiCharactersStore"

export default function ApiCharacters() {

  // const [apiCharacters, setApiCharacters] = useState([])
  const { apiCharacters, setApiCharacters, deleteApiCharacter } = useCharactersApiStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchApiCharacters() {
    setLoading(true)

    const url = "https://la-taverne.ducompagnon.fr/api/personnages"

    try {
      const response = await fetch(url)

      if(!response.ok) {
        throw new Error("Erreur lors de la récupération des images")
      }

      const data = await response.json()
      console.log(data);
      const updatedData = data.map((character) => ({
        ...character, from: "apiCharactere"
      }))

      console.log(updatedData)
      setApiCharacters(updatedData)
    } catch (error) {
      console.error("Error fetching characters: ", error);
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(apiCharacters.length === 0) {
      fetchApiCharacters()
    } else {
      setLoading(false)
    }
  }, [apiCharacters])

  // function deleteApiCharacter(id) {
  //   const updatedCharacters = apiCharacters.filter((character) => character.id!==id)
  //   setApiCharacters(updatedCharacters)
  // }

  return (
    <div>
      <Title>
        Les personnages de l'API
      </Title>

      {loading && <Loading />}
      {/* Error */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex flex-wrap justify-center gap-8">
        {apiCharacters.map((apiCharacter, index) => (
          <Card
            key={index}
            character={apiCharacter}
            deleteCharacter={deleteApiCharacter}
          />
        ))}
      </div>
    </div>
  )
}
