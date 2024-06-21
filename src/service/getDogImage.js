import axios from "axios"

export const formatDogObject = async (breed, variant) => {
  if (variant) {
    return { breed: `${breed} ${variant}`, image: `https://dog.ceo/api/breed/${breed}/${variant}/images/random` }
  }
  return { breed: breed, image: `https://dog.ceo/api/breed/${breed}/images/random` }
}

export const fetchDogImg = async (image) => {
  const response = await axios.get((image)).catch(err => console.log(err))
  return response.data.message
}

