import { useState } from 'react';

export default function TimerChallenge({ title, targetTime }) {
    const [timerStarted, setTimeStarted] = useState(false);
    const [timeExpired, setTimeExpired] = useState(false);

    function handleStart() {
        setTimeStarted(true);
        setTimeout(() => {
            setTimeExpired(true);
            setTimeStarted(false);
        }, +targetTime * 1000);
    }

    return (
        <section className="challenge">
            <h2>{title}</h2>
            {timeExpired && <p>You lost!</p>}
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={handleStart}>
                    {timerStarted ? "Stop" : "Start"}
                </button>
            </p>
            <p className={timerStarted ? "active" : undefined}>
                {timerStarted ? "Time is runing..." : "Time inactive"}
            </p>
        </section>
    )
}