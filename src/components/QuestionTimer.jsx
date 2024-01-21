import {useEffect, useImperativeHandle, useRef, useState} from "react";

const QUESTION_TIMER_INTERVAL = 5 * 1000;

export default function QuestionTimer(
  {
    timeout,
    onTimeout,
    mode
  }) {
  const [timer, setTimer] = useState(timeout);
  const progress = useRef();

  useImperativeHandle(progress, () => ({
    stop() {
      setTimer(0);
    }
  }));

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
    <progress
      ref={progress}
      id="question-timer"
      value={timer}
      max={timeout}
      className={mode}
    />
  )
}