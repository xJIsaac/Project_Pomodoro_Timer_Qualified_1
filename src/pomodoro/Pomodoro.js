import React, { useState, useEffect } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import Duration from "./duration";
import Display from "./display";

function Pomodoro() {
  // Timer starts out paused
  const [timer_is_running, set_timer_is_running] = useState(false);
  const [focusTime, setFocusTime] = useState(1500000);
  const [breakTime, setBreakTime] = useState(300000);
  const [session, setSession] = useState({
    focus: 0,
    break: 0,
  });

  useEffect(() => {
    setSession((prevSession) => ({
      ...prevSession,
      focus: focusTime,
    }));
  }, [focusTime]);

  useEffect(() => {
    setSession((prevSession) => ({
      ...prevSession,
      break: breakTime,
    }));
  }, [breakTime]);

  const focusEnded = () => {
    return focusTime === 0 && isFocusing();
  };

  const breakEnded = () => {
    return breakTime === 0;
  };

  const isFocusing = () => focusTime >= 0;

  const reduceTime = () => {
    if (isFocusing()) {
      setFocusTime((prevFocusTime) => prevFocusTime - 1000);
    } else {
      setBreakTime((prevBreakTime) => prevBreakTime - 1000);
    }
  };

  useInterval(
    () => {
      if (timer_is_running) {
        reduceTime();
        console.log(focusTime, breakTime);
      }
    },
    timer_is_running ? 1000 : null
  );

  function handleFocusTimeChange(action) {
    if (!timer_is_running) {
      const newFocusTime = Math.max(eval(`${focusTime} ${action} 300000`), 0); // change by 5 minutes in milliseconds
      setFocusTime(newFocusTime);
    }
  }

  function handleBreakTimeChange(action) {
    if (!timer_is_running) {
      const newBreakTime = Math.max(eval(`${breakTime} ${action} 60000`), 0); // change by 1 minute in milliseconds
      setBreakTime(newBreakTime);
    }
  }

  function handlePlayPause() {
    set_timer_is_running((prevState) => {
      return !prevState;
    });
  }

  // Play Sound
  // if (session.focusEnded() || session.breakEnded()) {
  //   new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
  // }

  // Restart Timer
  // if (session.breakTime === -1000) {
  //   updateSession();
  // }

  // Uses to reset Session state when timer ends or stop is clicked
  function updateSession() {
    // setSession({
    //   ...session,
    //   focusTime: focusDuration,
    //   breakTime: breakDuration,
    // });
  }

  // Update Session state when changes to any duration occur
  // useEffect(() => {
  //   setSession((prevSession) => ({
  //     ...prevSession,
  //     focusTime: focusDuration,
  //     breakTime: breakDuration,
  //   }));
  // }, [focusDuration, breakDuration]);

  // Stop button handles stopping timer, turning off display and resetting session state
  function handleStopClick() {
    if (timer_is_running) {
      set_timer_is_running(false);
      document.querySelector("#display").style.display = "none";
      updateSession();
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
              onClick={handlePlayPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !timer_is_running,
                  "oi-media-pause": timer_is_running,
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
        focusDuration={focusTime}
        breakDuration={breakTime}
        timer_is_running={timer_is_running}
      />
    </div>
  );
}

export default Pomodoro;
