import React, { useEffect, useState } from "react";
import { fetchDogImg } from '../../service/getDogImage'
import { Skeletons } from "../Skeletons";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

export default function BreedCard({ image, name }) {
  const [imageBreed, setImageBreed] = useState('')

  useEffect(() => {
    fetchDogImg(image)
    .then(res => setImageBreed(res))
  }, [])

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      color: 'white',
      boxShadow: theme.shadows[1],
      fontSize: 20,
      textTransform: 'capitalize'
    },
  }));

  return (
    <>
      {imageBreed.length === 0 ? (
        <Skeletons />
      ) : (
        <LightTooltip
          title={name}
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -24],
                  },
                },
              ],
            },
          }}
          arrow
        >
          <img src={imageBreed} alt={name}></img>
        </LightTooltip>
      )}
    </>
  );
}
