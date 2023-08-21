import React, { useState, useEffect } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import Duration from "./duration";
import SessionDisplay from "./SessionDisplay";

function Pomodoro() {
  // Timer starts out paused
  const [timer_is_running, set_timer_is_running] = useState(false);
  const [focusTime, setFocusTime] = useState(3);
  const [breakTime, setBreakTime] = useState(3);
  const [currentTime, setCurrentTime] = useState(focusTime * 60); // in seconds
  const [currentFocusTime, setCurrentFocusTime] = useState(0);
  const [currentBreakTime, setCurrentBreakTime] = useState(0);
  // const [session, setSession] = useState({
  //   focus: 0,
  //   break: 0,
  //   inProgress: false,
  // });

  // useEffect(() => {
  //   setSession((prevSession) => ({
  //     ...prevSession,
  //     focus: focusTime,
  //   }));
  // }, [focusTime]);

  // useEffect(() => {
  //   setSession((prevSession) => ({
  //     ...prevSession,
  //     break: breakTime,
  //   }));
  // }, [breakTime]);

  // const focusEnded = () => {
  //   return currentFocusTime === 0 && inFocus();
  // };

  // const breakEnded = () => {
  //   return currentBreakTime === 0;
  // };

  useEffect(() => {
    let interval;

    if (timer_is_running && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer_is_running && currentTime === 0) {
      // Switch between focus and break times
      if (focusTime === currentTime / 60) {
        setCurrentTime(breakTime * 60);
      } else {
        setCurrentTime(focusTime * 60);
      }
    }

    console.log(currentTime);

    return () => clearInterval(interval);
  }, [timer_is_running, currentTime, focusTime, breakTime]);

  // const inFocus = sessionDuration > breakTime;

  function handlePlayPauseClick() {
    set_timer_is_running((prevState) => {
      return !prevState;
    });
  }

  // useInterval(() => {
  //   if (timer_is_running) {
  //     reduceTime();
  //   }
  // }, timer_is_running && 1000);

  // const reduceTime = () => {
  //   // if (!focusEnded()) {
  //   const newTime = Math.max(sessionDuration - 1000, 0);
  //   console.log(newTime);
  //   setSessionDuration(newTime);
  //   console.log(`Session Time: ${sessionDuration}`);
  //   // }
  // };

  // function handleFocusTimeChange(action) {
  //   if (!timer_is_running) {
  //     const newFocusTime = Math.max(eval(`${focusTime} ${action} 300000`), 0); // change by 5 minutes in milliseconds
  //     setFocusTime(newFocusTime);
  //   }
  // }

  // function handleBreakTimeChange(action) {
  //   if (!timer_is_running) {
  //     const newBreakTime = Math.max(eval(`${breakTime} ${action} 60000`), 0); // change by 1 minute in milliseconds
  //     setBreakTime(newBreakTime);
  //   }
  // }

  // const [displayVisible, setDisplayVisible] = useState(false);

  // useEffect(() => {
  //   setSessionDuration(focusTime + breakTime);
  // }, [focusTime, breakTime]);

  // useEffect(() => {
  //   if (sessionInProgress) {
  //     setDisplayVisible(true);
  //   }
  // }, [sessionInProgress]);

  // useEffect(() => {
  //   setCurrentFocusTime(() => {
  //     return sessionDuration - breakTime;
  //   });
  //   setCurrentBreakTime(() => {});
  // }, [breakTime]);

  // Play Sound
  // if (focusEnded() || breakEnded()) {
  //   new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
  // }

  // // Restart Timer
  // if (currentBreakTime === -1000) {
  //   setSession((prevSession) => ({
  //     ...prevSession,
  //     focus: focusTime,
  //     break: breakTime,
  //   }));
  // }

  // Stop button handles stopping timer, turning off display and resetting session state
  // function handleStopClick() {
  //   if (timer_is_running) {
  //     set_timer_is_running(false);
  //     setDisplayVisible(false);
  //     setSessionInProgress(false);
  //   }
  // }

  return (
    <div className="pomodoro">
      <div className="row">
        {/* <Duration
          handleTimeChange={handleFocusTimeChange}
          durationType={"Focus"}
          time={focusTime}
        />
        <Duration
          handleTimeChange={handleBreakTimeChange}
          durationType={"Break"}
          time={breakTime}
        /> */}
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
            {/* <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={handleStopClick}
            >
              <span className="oi oi-media-stop" />
            </button> */}
          </div>
        </div>
      </div>
      {/* Progress Bar */}
      {/* {displayVisible && (
        <SessionDisplay
          currentFocusTime={currentFocusTime}
          currentBreakTime={currentBreakTime}
          focusTime={focusTime}
          breakTime={breakTime}
          timer_is_running={timer_is_running}
          inFocus={inFocus}
        />
      )} */}
    </div>
  );
}

export default Pomodoro;
