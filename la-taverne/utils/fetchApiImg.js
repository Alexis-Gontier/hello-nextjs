export async function fetchApiImg() {
  const url = "https://la-taverne.ducompagnon.fr/api/images"

  try {
    const response = await fetch(url)
    if(!response.ok) {
      throw new Error("Erreur lors de la récupération des images")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching images: ", error);
  }
}