import React, {useCallback, useState} from 'react';

import QUESTIONS from "../quesitions.js"
import quizComplete from "../assets/quiz-complete.png"
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsFinished = activeQuestionIndex === QUESTIONS.length;
  if (quizIsFinished) {
    return (
      <div id="summary">
        <h2>Quiz is finished!</h2>
        <img src={quizComplete} alt={"Quiz complete"}/>
      </div>
    )
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    setUserAnswers((prevState) => [...prevState, answer])
  }, [])

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null)
  }, [handleSelectAnswer]);


  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          timeout={5 * 1000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer, index) => (
            <li key={answer + index} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}