import React,{useState, useEffect} from 'react'
import Type from './Type';
import {useEngine} from './hooks/useEngine';
import Results from './Results';

const MainType = () => {
    const { words, typedWords,  timeLeft, errors, state, restart, totalTypedWords } = useEngine();  

    const calculateAccuracyPercentage = (errors, total) => {
      if (total > 0) {
        const corrects = total - errors;
        return (corrects / total) * 100;
      }

      return 0;
    };
    
  
    return (
      <div className='bg-[#f5f5f2] mt-[10vh] px-2 h-[calc(100vh-10vh)] mb-10 py-6 pt-10 flex flex-col'>
        <Type words={words} typedWords={typedWords}  restart={restart} timeLeft={timeLeft}/>  
        <Results
        state={state}
        errors={errors}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTypedWords)}
        total={totalTypedWords}
      /> 
      </div>
    );
  };

export default MainType