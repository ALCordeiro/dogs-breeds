import React, { useEffect, useState } from "react";
import BreedCard from "../components/BreedCard";
import { Skeletons } from "../components/Skeletons";
import { fetchDogs } from '../service/getDogs' 
import { formatDogObject } from "../service/getDogImage";

export const Home = () => {
  const [breedsImg, setBreedsImg] = useState([]);

  useEffect(() => {
    getBreeds();
  }, []);

  const getBreeds = async () => {
    var endpoints = [];
    await fetchDogs()
      .then((res) => {
        const breedsFormated = Object.keys(res).map((key) => {
          return {key: key, value: res[key]}
        });
        const arrBreeds = [];

        breedsFormated.map((dog) => {
          if (dog.value.length > 0) {
            return dog.value.map((d) => (
              arrBreeds.push({ breed: dog.key, variant: d })
            ))
          } else {
            return arrBreeds.push({ breed: dog.key, variant: undefined })
          }
        })

        arrBreeds.forEach((breed) => {
          endpoints.push(formatDogObject(breed.breed, breed.variant))
        })
      })

    await Promise.all(endpoints).then(res => {
      return setBreedsImg(res)
    });

  }

  return (
      <section id="photos" style={{ display: 'inline-block' }}>
        {breedsImg.length === 0 ? (
          <Skeletons />
        ) : (
          breedsImg.map((breed) => (
            <>
              <BreedCard
                image={breed.image}
                name={breed.breed}
                key={breed.breed}
              >{breed.breed}</BreedCard>
            </>
          ))
        )}
      </section>
  );
};