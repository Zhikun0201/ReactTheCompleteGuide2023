import { useRef, useState } from 'react';

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
        <section className="challenge">
            <h2>{title}</h2>
            {timeExpired && <p>You lost!</p>}
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerStarted ? handleStop : handleStart}>
                    {timerStarted ? "Stop" : "Start"}
                </button>
            </p>
            <p className={timerStarted ? "active" : undefined}>
                {timerStarted ? timer.current.toString() : "Time inactive"}
            </p>
        </section>
    )
}