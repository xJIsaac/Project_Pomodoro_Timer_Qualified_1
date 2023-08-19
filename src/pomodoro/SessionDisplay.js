import React from "react";
import toMinAndSec from "../utils/duration/toMinAndSec.js";

function SessionDisplay(props) {
  const {
    currentFocusTime,
    currentBreakTime,
    focusTime,
    breakTime,
    timer_is_running,
    inFocus,
  } = props;

  // const display = {
  //   setTime() {
  //     return inFocus ? focusDuration : breakDuration;
  //   },
  //   elapsedTimePercentage() {
  //     const result = inFocus
  //       ? (focusDuration - session.focusTime) / focusDuration
  //       : (breakDuration - session.breakTime) / breakDuration;
  //     return result * 100;
  //   },

  //   remainingTime() {
  //     return inFocus ? focusDuration : breakDuration;
  //   },
  // };

  // Show timer display once timer is running
  if (timer_is_running) {
    document.querySelector("#display").style.display = "";
  }

  const userSetTime = inFocus ? focusTime : breakTime;

  const currentSessionTime = inFocus ? currentFocusTime : currentBreakTime;

  const sessionType = inFocus ? "Focusing" : "On Break";

  return (
    <div id="display" style={{ display: "none" }}>
      {/* TODO: This area should show only when a focus or break session is running or pauses */}
      <div className="row mb-2">
        <div className="col">
          {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
          <h2 data-testid="session-title">
            {sessionType} for {toMinAndSec(userSetTime)} minutes
          </h2>
          {/* TODO: Update message below to include time remaining in the current session */}
          <p className="lead" data-testid="session-sub-title">
            {toMinAndSec(currentSessionTime)} remaining
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
              // aria-valuenow={display.elapsedTimePercentage()} // TODO: Increase aria-valuenow as elapsed time increases
              // style={{ width: `${display.elapsedTimePercentage()}%` }} // TODO: Increase width % as elapsed time increases
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionDisplay;
