"use client"

import { use } from "react"
import useCharactersApiStore from "@/stores/apiCharactersStore"
import Title from "@/components/title/Title"
import Card from "@/components/card/Card"
import { toast } from "sonner";
import { useRouter } from "next/navigation"

export default function oneCharacter({ params: paramsPromise }) {

    const { apiCharacters, deleteApiCharacter } = useCharactersApiStore()

    const params = use(paramsPromise)
    const id = params.id

    const router = useRouter()

    function deleteOneCharacter(id, name) {
        deleteApiCharacter(id)
        toast.success(`Suppression de ${name} effectuée avec succés`)
        router.replace("/api-characters")
    }

    return (
        <>
            <Title>
                Mon personnage id: {id}
            </Title>

            <div className="flex justify-center">
                {apiCharacters?.length > 0 &&
                    apiCharacters.map(
                        (oneCharacter) =>
                            id == oneCharacter.id && (
                                <Card
                                    key={oneCharacter.id}
                                    character={oneCharacter}
                                    deleteCharacter={() =>
                                        deleteOneCharacter(oneCharacter.id, oneCharacter.name)
                                    }
                                />
                            )
                    )
                }
            </div>
        </>
    )
}
