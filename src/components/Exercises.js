import React, {useEffect, useState} from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';

import { exerciseOption, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';

const Exercises = ({exercies, setExercises, bodyPart}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisePerPage = 9;

  const indexOfLastExercise = currentPage * exercisePerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisePerPage;
  const currentExercises = exercies.slice(indexOfFirstExercise, indexOfLastExercise);
  

  const paginate = (e, value) => {
      setCurrentPage(value);
      window.scrollTo({top: 1800, behavior: 'smooth'});
  }

  useEffect(()=>{
    const fetchExerciseData = async()=>{
      let exerciseData = [];
      if(bodyPart === 'all') {
        exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOption);
      }else {
        exerciseData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOption);
      }
      
      setExercises(exerciseData);
    }
    fetchExerciseData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[bodyPart]);

  return (
    <Box id='exercies' sx={{mt: {lg : '110px'}}}
    mt='50px'
    p='20px'>
      <Typography variant='h3' mb='46px'>
        Showing Results
      </Typography>

      <Stack direction='row' sx={{ gap: {lg: '110px', xs:'50px'}}} flexWrap='wrap' justifyContent='center'>
          {currentExercises.map((exercise, index)=>{
            return(
            <ExerciseCard key={index} exercise={exercise}/>
            )
          })}
      </Stack>

      <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
        {exercies.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercies.length / exercisePerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>

    </Box>
  )
}

export default Exercises;