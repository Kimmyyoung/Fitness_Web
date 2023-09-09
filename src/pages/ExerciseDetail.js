import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { exerciseOption, youtubeOption, fetchData } from '../utils/fetchData';

import Detail from '../components/Detail';
import ExerciseVideo from '../components/ExerciseVideo';
import SimilarExercises from '../components/SimilarExercises';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideo, setExerciseVideo] = useState({})
  const [targetMuscleExercise, setTargetMuscleExercise] = useState({});
  const [equipmentExercise, setEquipmentExercise] = useState({});

  const { id } = useParams();

  useEffect(()=>{
    const fetchExerciseData = async ()=>{
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

      const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOption);
      setExerciseDetail(exerciseDetailData);

      const exerciseVideoData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOption);
      setExerciseVideo(exerciseVideoData.contents);

      const targetMuscleExerciseData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOption);
      setTargetMuscleExercise(targetMuscleExerciseData);

      const equipmentExerciseData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOption);
      setEquipmentExercise(equipmentExerciseData);
       
    }
  fetchExerciseData();
  },[id])

  return (
    <Box>
        <Detail exerciseDetail={exerciseDetail}/>
        <ExerciseVideo exerciseVideos={exerciseVideo} name={exerciseDetail.name}/>
        <SimilarExercises targetMuscleExercise={targetMuscleExercise} equipmentExercise={equipmentExercise}/>
    </Box> )
}

export default ExerciseDetail