import React, { useState, useEffect } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import FocusDuration from "./focusDuration.js";
import BreakDuration from "./breakDuration.js";
import Display from "./display";

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
    focusEnded() {
      return this.focusTime === 0 && this.isFocusing();
    },
    breakEnded() {
      return this.breakTime === 0;
    },
    reduceTime() {
      this.isFocusing()
        ? setSession({ ...this, focusTime: this.focusTime - 1000 })
        : setSession({ ...this, breakTime: this.breakTime - 1000 });
    },
  });

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      if (isTimerRunning) {
        session.reduceTime();
      }
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
  }

  // Play Sound
  if (session.focusEnded() || session.breakEnded()) {
    new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
  }

  // Restart Timer
  if (session.breakTime === -1000) {
    updateSession();
  }

  // Uses to reset Session state when timer ends or stop is clicked
  function updateSession() {
    setSession({
      ...session,
      focusTime: focusDuration,
      breakTime: breakDuration,
    });
  }

  // Update Session state when changes to any duration occur
  useEffect(() => {
    setSession({
      ...session,
      focusTime: focusDuration,
      breakTime: breakDuration,
    });
  }, [focusDuration, breakDuration]);

  // Stop button handles stopping timer, turning off display and resetting session state
  function handleStopClick() {
    if (isTimerRunning) {
      setIsTimerRunning(false);
      document.querySelector("#display").style.display = "none";
      updateSession();
    }
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <FocusDuration
          focusDuration={focusDuration}
          isTimerRunning={isTimerRunning}
          setFocusDuration={setFocusDuration}
        />
        <BreakDuration
          breakDuration={breakDuration}
          isTimerRunning={isTimerRunning}
          setBreakDuration={setBreakDuration}
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
      <Display
        session={session}
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        isTimerRunning={isTimerRunning}
      />
    </div>
  );
}

export default Pomodoro;
