import axios from "axios"

export const fetchDogs = async () => {
  const response = await axios.get('https://dog.ceo/api/breeds/list/all').catch((err) => console.log(err))
  return response.data.message
}