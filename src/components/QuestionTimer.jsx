import {useEffect, useState} from "react";

const QUESTION_TIMER_INTERVAL = 5 * 1000;

export default function QuestionTimer({timeout = QUESTION_TIMER_INTERVAL, onTimeout}) {
  const [timer, setTimer] = useState(timeout);

  useEffect(() => {
    const timerOuter = setTimeout(() => {
      onTimeout();
    }, timer);

    return () => {
      clearTimeout(timerOuter);
    }
  }, [timeout, onTimeout]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevState) => prevState - 10);
    }, 10);

    return () => {
      clearInterval(timerInterval);
    }
  }, []);

  return (
    <progress id="question-timer" value={timer} max={timeout}></progress>
  )
}