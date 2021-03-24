import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusTime, setFocusTime] = useState(1000 * 60 * 25);
  const [breakTime, setBreakTime] = useState(1000 * 60 * 5);
  const [timerDisplay, setTimerDisplay] = useState({
    focus: focusTime,
    break: breakTime,
  });
  const display = {
    remainingTime: timerDisplay.focus ? timerDisplay.focus : timerDisplay.break,
    message: timerDisplay.focus ? "Focusing" : "On Break",
    setTime: timerDisplay.focus ? focusTime : breakTime,
  };

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      if (timerDisplay.focus && isTimerRunning) {
        setTimerDisplay({
          ...timerDisplay,
          focus: timerDisplay.focus - 1000,
        });
      } else if (timerDisplay.break && isTimerRunning) {
        console.log("Focus Timer: " + timerDisplay.focus);
        setTimerDisplay({
          ...timerDisplay,
          break: timerDisplay.break - 1000,
        });
      } else {
        console.log("Break Timer: " + timerDisplay.break);
        console.log("hello");
        setTimerDisplay({
          focus: 1000 * 60 * 25,
          break: 1000 * 60 * 5,
        });
      }
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
  }

  function handleStopClick() {
    if (isTimerRunning) {
      setIsTimerRunning(false);
      console.log("you clicked stop");
      setTimerDisplay({
        focus: focusTime,
        break: breakTime,
      });
    }
  }

  function handleFocusTimeChange(action) {
    if (!isTimerRunning) {
      action === "increase"
        ? setFocusTime(Math.min(focusTime + 300000, 3600000))
        : setFocusTime(Math.max(focusTime - 300000, 1000 * 60 * 5));
    }
  }

  function handleBreakTimeChange(action) {
    if (!isTimerRunning) {
      action === "increase"
        ? setBreakTime(Math.min(breakTime + 1000 * 60, 1000 * 60 * 15))
        : setBreakTime(Math.max(breakTime - 60000, 60000));
    }
  }

  function toMinAndSec(ms) {
    var min = Math.floor(ms / 60000);
    var sec = ((ms % 60000) / 1000).toFixed(0);
    return min + ":" + (sec < 10 ? "0" : "") + sec;
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {toMinAndSec(focusTime)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={() => handleFocusTimeChange("decrease")}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={() => handleFocusTimeChange("increase")}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {toMinAndSec(breakTime)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={() => handleBreakTimeChange("decrease")}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={() => handleBreakTimeChange("increase")}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
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
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
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
      <div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <h2 data-testid="session-title">
              {display.message} for {toMinAndSec(display.setTime)} minutes
            </h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {toMinAndSec(display.remainingTime)} remaining
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="0" // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: "0%" }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
