import React, { useEffect, useState } from 'react';
import Button from "../common/button/Button";
import "./Timer.css";

const Timer = () => {
    const [[h, m, s], setTimer] = useState([0, 0, 0]);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        const timerID = setInterval(() => onStart(), 1000);
        return () => {
            clearInterval(timerID);
        }
    })

    //same logic as stopwatch's code but here we are decreasing the [m,s,ms] state values
    const onStart = () => {
        if (h === 0 && m === 0 && s === 0) {
            setIsStarted(false);
            return;
        }
        if (!isStarted) return;
        if (m === 0 && s === 0) {
            //3rd
            setTimer([h - 1, 59, 59]);
        } else if (s === 0) {
            //2nd
            setTimer([h, m - 1, 59]);
        } else {
            //1st
            setTimer([h, m, s - 1]);
        }
    };

    const onReset = () => {
        setIsStarted(false);
        setTimer([0, 0, 0]);
    };

    return (
        <div className="timer">
            <div className="timer-row">
                <div className="timer-border-ring">
                    <div className="timer-border-ring-inner"></div>
                </div>
                <div className="timer-input-title">
                    <input
                        type="number"
                        className="timer-input"
                        value={h}
                        onChange={(e) => setTimer([e.target.value, m, s])}
                    />
                    <span>h</span>
                </div>
                <div className="timer-input-title">
                    <input
                        type="number"
                        className="timer-input"
                        value={m}
                        onChange={(e) => setTimer([h, e.target.value, s])}
                    />
                    <span>m</span>
                </div>
                <div className="timer-input-title">
                    <input
                        type="number"
                        className="timer-input"
                        value={s}
                        onChange={(e) => setTimer([h, m, e.target.value])}
                    />
                    <span>s</span>
                </div>
            </div>
            <div className="button-row">
                <Button onClickHandler={onReset}>Reset</Button>
                {isStarted ? (
                    <Button onClickHandler={() => setIsStarted(false)}>Pause</Button>
                ) : (
                    <Button
                        onClickHandler={() => setIsStarted(true)}
                        disabled={h === 0 && m === 0 && s === 0}
                    >
                        Start
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Timer;