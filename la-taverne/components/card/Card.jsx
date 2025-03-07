import Image from "next/image";
import Statistiques from "./Statistiques";
import Button from "./Button";
import Link from "next/link";

export default function Card({ character, deleteCharacter }) {

    const URL = "https://ducompagnon.fr/la-taverne/public/images/personnages/"

    const allStat = [
        {
            stat: "Santé",
            value: character.health,
            unit: "PV"
        },
        {
            stat: "Magie",
            value: character.magic,
            unit: "PM"
        },
        {
            stat: "Puissance",
            value: character.power,
            unit: "Atk"
        },
    ]

  return (
    <div className={`flex flex-col border-neutral-500 border-2 w-[250px] h-[400px] rounded-xl overflow-hidden`}>
        <div className="w-[250px] h-[250px]  overflow-hidden">
            <Image
                src={`${URL}${character.image}`}
                alt={character.name}
                width={250}
                height={250}
                className="object-cover duration-300 hover:scale-105"
            />
        </div>
        <div className="p-2">
            <p className="text-xl text-center mb-2 font-semibold">
                {character.name}
            </p>
            {allStat.map((oneStat) => (
                <Statistiques
                    key={oneStat.stat}
                    stat={oneStat.stat}
                    value={oneStat.value}
                    unit={oneStat.unit}
                />
            ))}
        </div>
        <div className="flex justify-around">
            <Link href={`/api-characters/${character.id}`}>
                <Button color="bg-green-500">
                    Voir
                </Button>
            </Link>

            <Button
                color="bg-red-500"
                onClick={() => (deleteCharacter(character.id))}
            >
                Delete
            </Button>
        </div>
    </div>
  )
}
