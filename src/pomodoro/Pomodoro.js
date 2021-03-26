import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusDuration, setFocusDuration] = useState(3000);
  const [breakDuration, setBreakDuration] = useState(3000);
  const [session, setSession] = useState({
    focus: focusTime,
    break: breakTime,
  });
  const display = {
    remainingTime: session.focus ? session.focus : session.break,
    message: session.focus ? "Focusing" : "On Break",
    setTime: session.focus ? focusTime : breakTime,
  };

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      if (session.focus && isTimerRunning) {
        setSession({
          ...session,
          focus: session.focus - 1000,
        });
      } else if (session.break && isTimerRunning) {
        console.log("Focus Timer: " + session.focus);
        setSession({
          ...session,
          break: session.break - 1000,
        });
      } else {
        console.log("hello");
        console.log("Break Timer: " + session.break);
        setSession({
          focus: 1000,
          break: 1000,
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
      setSession({
        focus: focusTime,
        break: breakTime,
      });
    }
  }

  function handleFocusDurationChange(action) {
    if (!isTimerRunning) {
      action === "increase"
        ? setFocusDuration(Math.min(focusDuration + 300000, 3600000))
        : setFocusDuration(Math.max(focusDuration - 300000, 1000 * 60 * 5));
    }
  }

  function handleBreakDurationChange(action) {
    if (!isTimerRunning) {
      action === "increase"
        ? setBreakDuration(Math.min(breakDuration + 1000 * 60, 1000 * 60 * 15))
        : setBreakDuration(Math.max(breakDuration - 60000, 60000));
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
              Focus Duration: {toMinAndSec(focusDuration)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={() => handleFocusDurationChange("decrease")}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={() => handleFocusDurationChange("increase")}
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
                Break Duration: {toMinAndSec(breakDuration)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={() => handleBreakDurationChange("decrease")}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={() => handleBreakDurationChange("increase")}
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
