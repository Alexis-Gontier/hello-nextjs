"use client"

import Loading from "@/app/loading";
import Title from "@/components/title/Title";
import { fetchApiImg } from "@/utils/fetchApiImg";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ApiImage() {

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // async function fetchApiImg() {
  //   setLoading(true)

  //   const url = "https://la-taverne.ducompagnon.fr/api/images"

  //   try {
  //     const response = await fetch(url)
  //     if(!response.ok) {
  //       throw new Error("Erreur lors de la récupération des images")
  //     }
  //     const data = await response.json()
  //     console.log(data);
  //     setImages(data)
  //   } catch (error) {
  //     console.error("Error fetching images: ", error);
  //     setError(error.message)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  useEffect(() => {
    async function loadImg() {
      try {
        const data = await fetchApiImg()
        setImages(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    loadImg()
  }, [])

  return (
    <div>
      <Title>Les Images de l'API</Title>
      {/* Loader */}
      {loading && <Loading />}
      {/* Error */}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {/* No images */}
      {images.length === 0 && !loading && !error && <p>Aucune image disponible.</p>}

      {/* Images grid */}
      <div className="flex items-center justify-center flex-wrap gap-4">
        {images.map((image, index) => (
          <div key={index}>
            {image.url ? (
              <Image
              src={image.url}
              alt={image.name}
              width={150}
              height={150}
              // unoptimized
              className="h-auto object-cover rounded-lg w-64"
              />
            ) : (
              <p className="text-gray-500">Image indisponible</p>
            )}
            <p className="text-center">{image.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
