import { useRef, useState } from 'react';
import ResultModal from './ResultModal';

export default function TimerChallenge({ title, targetTime }) {
    let timer = useRef();
    const [timerStarted, setTimeStarted] = useState(false);
    const [timeExpired, setTimeExpired] = useState(false);

    function handleStart() {
        setTimeStarted(true);
        timer.current = setTimeout(() => {
            setTimeExpired(true);
        }, +targetTime * 1000);
    }

    function handleStop() {
        clearTimeout(timer.current);
    }

    return (
        <>
            {timeExpired && <ResultModal targetTime={targetTime} result="lost" />}
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerStarted ? handleStop : handleStart}>
                        {timerStarted ? "Stop" : "Start"}
                    </button>
                </p>
                <p className={timerStarted ? "active" : undefined}>
                    {timerStarted ? "Time running" : "Time inactive"}
                </p>
            </section>
        </>
    )
}