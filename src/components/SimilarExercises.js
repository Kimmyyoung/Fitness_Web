import React from 'react'
import { Box, Stack, Typography } from '@mui/material';

import HorizontalScrollbar from './HorizontalScrollbar';
import Loader from './Loader';


const SimilarExercises = ({targetMuscleExercise, equipmentExercise}) => {
  return (
    <Box sx={{ mt :  {lg: '100px' , xs:'0'}}}>
      <Typography variant='h3'>
        Exercises that target the same muscle group
      </Typography>

      <Stack direction='row' sx={{ mt: '20px' ,p: '2', position: 'relative'}}>
        {targetMuscleExercise.length ? <HorizontalScrollbar data={targetMuscleExercise} /> : <Loader />}
      </Stack>

      <Typography variant='h3'>
        Exercises that target the same equipment
      </Typography>

      <Stack direction='row' sx={{ mt: '20px' ,p: '2', position: 'relative'}}>
        {equipmentExercise.length ? <HorizontalScrollbar data={equipmentExercise} /> : <Loader />}
      </Stack>

    </Box>
  )
}

export default SimilarExercises