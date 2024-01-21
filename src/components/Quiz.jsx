import React, {useCallback, useState} from 'react';

import QUESTIONS from "../quesitions.js"
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {

  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsFinished = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    answer
  ) {
    setUserAnswers((prevState) => [...prevState, answer]);
  }, [])

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsFinished) {
    return (
      <Summary userAnswers={userAnswers}/>
    )
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  )
}