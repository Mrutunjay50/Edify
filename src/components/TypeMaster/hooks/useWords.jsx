import React, { useCallback, useState } from 'react'
import { faker } from '@faker-js/faker'


const generateWords = (maxWords) => {
    const randomWords = [];
      for (let i = 0; i < maxWords; i++) {
        randomWords.push(faker.word.sample().toLowerCase()); // or faker.word.sample()
      }
      return randomWords.join(' ');
}

const useWords = (number) => {
    const [words,setWords] = useState(generateWords(number));


    const updateWords = useCallback(() =>{
        setWords(generateWords(number));
    },[number]);

    // console.log(words);
  return {words, updateWords};
}

export default useWords