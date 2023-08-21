import React from "react";
import toMinAndSec from "../utils/duration/toMinAndSec.js";

function SessionDisplay(props) {
  const {
    currentFocusTime,
    currentBreakTime,
    focusTime,
    breakTime,
    timer_is_running,
    sessionType,
  } = props;

  const userSetTime = sessionType ? focusTime : breakTime;
  const currentSessionTime = sessionType ? currentFocusTime : currentBreakTime;
  // const sessionType = sessionType ? "Focusing" : "On Break";
  const elapsedTimePercentage = sessionType
    ? (focusTime - currentFocusTime) / focusTime
    : (breakTime - currentBreakTime) / breakTime;

  console.log(`Session Type: `, sessionType);
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
