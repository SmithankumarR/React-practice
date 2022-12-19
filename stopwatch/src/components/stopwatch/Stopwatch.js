import React, { useEffect, useState } from "react";
import Button from "../common/button/Button";
import "./Stopwatch.css";
const Stopwatch = () => {
    //state to track whether stopwatch has started or not - to switch b/w 'pause' & 'start' text on jsx button
    //and if not started then to avoid the calculation - in useEffect

    const [isStarted, setIsStarted] = useState(false);
    const [[m, s, ms], setTimer] = useState([0, 0, 0]);

    //we are using JS's setInterval method to set [m,s,ms] values every 10ms
    //we need to clear the interval on component unmount otherwise useEffect will create infinite intervals to
    //update the [m,s,ms] state.
    //so the flow here is -> create an interval -> call onStart() -> setTimer done -> clear the interval
    // -> create new interval -> and so on.
    useEffect(() => {
        const timerid = setInterval(() => onStart(), 10);
        return () => clearInterval(timerid);
    });

    //logic to update minute based on seconds & seconds based on milliseconds value
    const onStart = () => {
        if (!isStarted) return;
        if (ms === 99 && s === 60) {
            // 3rd
            setTimer([m + 1, 0, 0]);
        } else if (ms === 99) {
            // 2nd
            setTimer([m, s + 1, 0])
        } else {
            // 1st
            setTimer([m, s, ms + 1]);
        }
    }

    const onReset = () => {
        setIsStarted(false);
        setTimer([0, 0, 0]);
    }
    return (
        <div className="stopwatch">
            <div className="container">
                <div className="clock" onClick={() => setIsStarted(true)}>
                    <div className="clock-border-ring">
                        <div className="clock-border-ring-inner"></div>
                    </div>
                    <div className="clock-timer">
                        {m < 10 && 0}
                        {m}:{s < 10 && 0}
                        {s}:{ms < 10 && 0}
                        {ms}
                    </div>
                </div>
                <div className="button-row">
                    <Button onClickHandler={onReset}>Reset</Button>
                    <Button onClickHandler={() => setIsStarted(!isStarted)}>
                        {isStarted ? <>Pause</> : <>Start</>}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Stopwatch;