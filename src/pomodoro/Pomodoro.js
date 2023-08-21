import React, { useState, useEffect } from "react";
import classNames from "../utils/class-names";
import Duration from "./duration";
import SessionDisplay from "./SessionDisplay";

function Pomodoro() {
  // Timer starts out paused
  const [isRunning, setIsRunning] = useState(false);
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [currentTime, setCurrentTime] = useState(focusTime * 60); // in seconds
  const [sessionType, setSessionType] = useState("focus"); // 'focus' or 'break'
  const [currentFocusTime, setCurrentFocusTime] = useState(0);
  const [currentBreakTime, setCurrentBreakTime] = useState(0);
  const [displayVisible, setDisplayVisible] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && currentTime === 0) {
      // Switch between focus and break times
      if (sessionType === "focus") {
        setSessionType("break");
        setCurrentTime(breakTime * 60);
      } else {
        setSessionType("focus");
        setCurrentTime(focusTime * 60);
      }

      // Play the sound
      new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
    }

    return () => clearInterval(interval);
  }, [isRunning, currentTime, focusTime, breakTime, sessionType]);

  function handlePlayPauseClick() {
    setIsRunning((prevState) => {
      return !prevState;
    });
    setDisplayVisible(true);
  }

  function handleFocusTimeChange(action) {
    if (!isRunning) {
      const newFocusTime = Math.max(eval(`${focusTime} ${action} 5`), 0); // change by 5 minutes
      setFocusTime(newFocusTime);
    }
  }

  function handleBreakTimeChange(action) {
    if (!isRunning) {
      const newBreakTime = Math.max(eval(`${breakTime} ${action} 1`), 0); // change by 1 minute
      setBreakTime(newBreakTime);
    }
  }

  // Stop button handles stopping timer, turning off display and resetting session state
  function handleStopClick() {
    if (isRunning) {
      setIsRunning(false);
      setDisplayVisible(false);
      setSessionType("focus"); // Reset session type to focus
      setCurrentTime(focusTime * 60); // Reset current time to focus time
    }
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <Duration
          handleTimeChange={handleFocusTimeChange}
          durationType={"Focus"}
          time={focusTime}
        />
        <Duration
          handleTimeChange={handleBreakTimeChange}
          durationType={"Break"}
          time={breakTime}
        />
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={handlePlayPauseClick}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isRunning,
                  "oi-media-pause": isRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={handleStopClick}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      {/* Progress Bar */}
      {displayVisible && (
        <SessionDisplay
          currentFocusTime={currentFocusTime}
          currentBreakTime={currentBreakTime}
          currentTime={currentTime}
          focusTime={focusTime}
          breakTime={breakTime}
          isRunning={isRunning}
          sessionType={sessionType}
        />
      )}
    </div>
  );
}

export default Pomodoro;
