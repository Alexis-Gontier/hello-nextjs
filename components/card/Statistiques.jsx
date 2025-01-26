import React, { useState } from 'react'

export default function Statistiques({ stat, value, unit }) {

    const [statValue, setStatValue] = useState(value)

  return (
    <div className="flex justify-between">
        <p className="font-semibold">{stat} :</p>
        <div className="flex">
            <div
                className="cursor-pointer"
                onClick={() => setStatValue(statValue - 2)}
            >
                🔽
            </div>
            <p>{statValue} {unit}</p>
            <div
                className="cursor-pointer"
                onClick={() => setStatValue(statValue + 2)}
            >
                🔼
            </div>
        </div>
    </div>
  )
}