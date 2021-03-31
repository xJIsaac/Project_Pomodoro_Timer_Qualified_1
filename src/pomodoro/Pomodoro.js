import React, { useState, useEffect } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusDuration, setFocusDuration] = useState(1500000);
  const [breakDuration, setBreakDuration] = useState(300000);
  const [session, setSession] = useState({
    focusTime: focusDuration,
    breakTime: breakDuration,
    isFocusing() {
      return this.focusTime >= 0 ? true : false;
    },
    reduceTime() {
      this.isFocusing()
        ? setSession({ ...this, focusTime: this.focusTime - 1000 })
        : setSession({ ...this, breakTime: this.breakTime - 1000 });
    },
    focusEnded() {
      return this.focusTime === 0 && this.isFocusing();
    },
    breakEnded() {
      return this.breakTime === 0;
    },
  });

  const display = {
    setTime() {
      return session.isFocusing() ? focusDuration : breakDuration;
    },
    elapsedTimePercentage() {
      const result = session.isFocusing()
        ? (focusDuration - session.focusTime) / focusDuration
        : (breakDuration - session.breakTime) / breakDuration;
      return result * 100;
    },
    message() {
      return session.isFocusing() ? "Focusing" : "On Break";
    },
    remainingTime() {
      return session.isFocusing() ? session.focusTime : session.breakTime;
    },
  };

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      if (isTimerRunning) {
        session.reduceTime();
      }
    },
    isTimerRunning ? 1000 : null
  );

  // Show timer display once timer is running
  if (isTimerRunning) {
    document.querySelector("#display").style.display = "";
  }

  // Play Sound
  if (session.focusEnded() || session.breakEnded()) {
    new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
  }

  // Restart Timer
  if (session.breakTime === -1000) {
    updateSession();
  }

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
  }

  function updateSession() {
    setSession({
      ...session,
      focusTime: focusDuration,
      breakTime: breakDuration,
    });
  }

  useEffect(() => {
    setSession({
      ...session,
      focusTime: focusDuration,
      breakTime: breakDuration,
    });
  }, [focusDuration, breakDuration]);

  function handleStopClick() {
    if (isTimerRunning) {
      setIsTimerRunning(false);
      document.querySelector("#display").style.display = "none";
      updateSession();
    }
  }

  function handleFocusDurationChange(action) {
    if (!isTimerRunning) {
      setFocusDuration(
        action === "increase"
          ? Math.min(focusDuration + 300000, 3600000)
          : Math.max(focusDuration - 300000, 300000)
      );
    }
  }

  function handleBreakDurationChange(action) {
    if (!isTimerRunning) {
      setBreakDuration(
        action === "increase"
          ? Math.min(breakDuration + 60000, 900000)
          : Math.max(breakDuration - 60000, 60000)
      );
    }
  }

  function toMinAndSec(ms) {
    var min = Math.floor(ms / 60000);
    var sec = ((ms % 60000) / 1000).toFixed(0);
    return (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
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
      <div id="display" style={{ display: "none" }}>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <h2 data-testid="session-title">
              {display.message()} for {toMinAndSec(display.setTime())} minutes
            </h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {toMinAndSec(display.remainingTime())} remaining
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
                aria-valuenow={display.elapsedTimePercentage()} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${display.elapsedTimePercentage()}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
