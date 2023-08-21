import React, { useState, useEffect } from "react";
import classNames from "../utils/class-names";
import SessionDisplay from "./SessionDisplay";
import DurationChanger from "./DurationChanger";

function Pomodoro() {
  const [isRunning, setIsRunning] = useState(false);
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [currentTime, setCurrentTime] = useState(focusTime * 60);
  const [sessionType, setSessionType] = useState("focus");
  const [displayVisible, setDisplayVisible] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && currentTime === 0) {
      handleSessionSwitch();
      playSessionSwitchSound();
    }

    return () => clearInterval(interval);
  }, [isRunning, currentTime, focusTime, breakTime, sessionType]);

  const handleSessionSwitch = () => {
    const nextSessionType = sessionType === "focus" ? "break" : "focus";
    setSessionType(nextSessionType);
    const nextSessionTime = nextSessionType === "focus" ? focusTime : breakTime;
    setCurrentTime(nextSessionTime * 60);
  };

  const playSessionSwitchSound = () => {
    new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
  };

  const handlePlayPauseClick = () => {
    setIsRunning((prevState) => !prevState);
    setDisplayVisible(true);
  };

  const handleTimeChange = (action, durationType) => {
    if (!isRunning) {
      const newTime = durationType === "focus" ? focusTime : breakTime;
      const updatedTime = Math.max(eval(`${newTime} ${action} 5`), 0);
      if (durationType === "focus") {
        setFocusTime(updatedTime);
      } else {
        setBreakTime(updatedTime);
      }
    }
  };

  const handleStopClick = () => {
    if (isRunning) {
      setIsRunning(false);
      setDisplayVisible(false);
      setSessionType("focus");
      setCurrentTime(focusTime * 60);
    }
  };

  return (
    <div className="pomodoro">
      {/* Duration Inputs */}
      <div className="row">
        <DurationChanger
          handleTimeChange={(time) => handleTimeChange(time, "focus")}
          durationType="Focus"
          time={focusTime}
        />
        <DurationChanger
          handleTimeChange={(time) => handleTimeChange(time, "break")}
          durationType="Break"
          time={breakTime}
        />
      </div>
      {/* Control Buttons */}
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
          currentTime={currentTime}
          focusTime={focusTime}
          breakTime={breakTime}
          sessionType={sessionType}
        />
      )}
    </div>
  );
}

export default Pomodoro;
