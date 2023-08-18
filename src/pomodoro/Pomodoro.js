import React, { useState, useEffect } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import Duration from "./duration";
import Display from "./display";

function Pomodoro() {
  // Timer starts out paused
  const [timer_is_running, set_timer_is_running] = useState(false);

  const [session, setSession] = useState({
    focusTime: 1500000,
    breakTime: 300000,
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

  const currentFocusTime = session.focusTime;
  const currentBreakTime = session.breakTime;

  const updateSessionTime = (type, newTime) => {
    setSession((prevSession) => ({
      ...prevSession,
      [type]: newTime,
    }));
  };

  function handleTimeChange(action, type) {
    if (!timer_is_running) {
      if (type === "Focus") {
        const timeDelta = action === "increase" ? 300000 : -300000;
        const newFocusTime = Math.max(currentFocusTime + timeDelta, 0);
        updateSessionTime("focusTime", newFocusTime);
      }
      if (type === "Break") {
        const timeDelta = action === "increase" ? 60000 : -60000;
        const newBreakTime = Math.max(currentBreakTime + timeDelta, 0);
        updateSessionTime("breakTime", newBreakTime);
      }
    }
  }

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      if (timer_is_running) {
        session.reduceTime();
      }
    },
    timer_is_running ? 1000 : null
  );

  function playPause() {
    set_timer_is_running((prevState) => {
      return !prevState;
    });
  }

  // Play Sound
  // if (session.focusEnded() || session.breakEnded()) {
  //   new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
  // }

  // Restart Timer
  if (session.breakTime === -1000) {
    updateSession();
  }

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
          handleTimeChange={handleTimeChange}
          durationType={"Focus"}
          time={currentFocusTime}
        />
        <Duration
          handleTimeChange={handleTimeChange}
          durationType={"Break"}
          time={currentBreakTime}
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
        session={session}
        focusDuration={currentFocusTime}
        breakDuration={currentBreakTime}
        timer_is_running={timer_is_running}
      />
    </div>
  );
}

export default Pomodoro;
