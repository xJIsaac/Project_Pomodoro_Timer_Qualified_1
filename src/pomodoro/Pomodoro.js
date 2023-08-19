import React, { useState, useEffect } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import Duration from "./duration";
import SessionDisplay from "./SessionDisplay";

function Pomodoro() {
  // Timer starts out paused
  const [timer_is_running, set_timer_is_running] = useState(false);
  const [focusTime, setFocusTime] = useState(1500000);
  const [breakTime, setBreakTime] = useState(300000);
  const [session, setSession] = useState({
    focus: 0,
    break: 0,
    inProgress: false,
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
    return session.focus === 0 && inFocus();
  };

  const breakEnded = () => {
    return session.break === 0;
  };

  const inFocus = () => session.focus >= 0;

  const reduceTime = () => {
    console.log(focusEnded());
    const newTime = !focusEnded()
      ? Math.max(session.focus - 1000, 0)
      : Math.max(session.break - 1000, 0);
    setSession((prevSession) => ({
      ...prevSession,
      [inFocus() ? "focus" : "break"]: newTime,
    }));
    console.log(session);
  };

  useInterval(() => {
    if (timer_is_running) {
      reduceTime();
    }
  }, timer_is_running && 1000);

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

  function handlePlayPauseClick() {
    set_timer_is_running((prevState) => {
      return !prevState;
    });
    setSession((prevSession) => ({
      ...prevSession,
      inProgress: true,
    }));
  }

  const [displayVisible, setDisplayVisible] = useState(false);

  useEffect(() => {
    if (session.inProgress) {
      setDisplayVisible(true);
    }
  }, [timer_is_running, session.inProgress]);

  // Play Sound
  // if (focusEnded() || breakEnded()) {
  //   new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
  // }

  // Restart Timer
  if (session.breakTime === -1000) {
    setSession((prevSession) => ({
      ...prevSession,
      focus: focusTime,
      break: breakTime,
    }));
  }

  // Stop button handles stopping timer, turning off display and resetting session state
  function handleStopClick() {
    if (timer_is_running) {
      set_timer_is_running(false);
      setDisplayVisible(false);
      setSession((prevSession) => ({
        ...prevSession,
        focus: focusTime,
        break: breakTime,
        inProgress: false,
      }));
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
      {/* Progress Bar */}
      {displayVisible && (
        <SessionDisplay
          currentFocusTime={session.focus}
          currentBreakTime={session.break}
          focusTime={focusTime}
          breakTime={breakTime}
          timer_is_running={timer_is_running}
          inFocus={inFocus}
        />
      )}
    </div>
  );
}

export default Pomodoro;
