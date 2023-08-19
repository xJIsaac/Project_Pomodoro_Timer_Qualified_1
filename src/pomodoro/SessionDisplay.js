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

  const userSetTime = inFocus ? focusTime : breakTime;
  const currentSessionTime = inFocus ? currentFocusTime : currentBreakTime;
  const sessionType = inFocus ? "Focusing" : "On Break";
  const elapsedTimePercentage = inFocus
    ? (focusTime - currentFocusTime) / focusTime
    : (breakTime - currentBreakTime) / breakTime;

  return (
    <div id="display">
      <div className="row mb-2">
        <div className="col">
          <h2 data-testid="session-title">
            {sessionType} for {toMinAndSec(userSetTime)} minutes
          </h2>
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
              aria-valuenow={elapsedTimePercentage * 100}
              style={{ width: `${elapsedTimePercentage * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionDisplay;
