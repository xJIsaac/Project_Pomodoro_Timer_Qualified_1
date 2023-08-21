import React from "react";
// import toMinAndSec from "../utils/duration/toMinAndSec.js";

function SessionDisplay(props) {
  const { focusTime, breakTime, currentTime, sessionType } = props;

  const userSetTime = sessionType === "focus" ? focusTime : breakTime;

  function calculateElapsedTimePercentage(currentTime, totalSessionTime) {
    const remainingTime = totalSessionTime - currentTime;
    const percentage = (remainingTime / totalSessionTime) * 100;
    return percentage;
  }

  const totalSessionTime =
    sessionType === "focus" ? focusTime * 60 : breakTime * 60;

  const elapsedTimePercentage = calculateElapsedTimePercentage(
    currentTime,
    totalSessionTime
  );

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  function capitalizeString(inputString) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  return (
    <div id="display">
      <div className="row mb-2">
        <div className="col">
          <h2 data-testid="session-title">
            {capitalizeString(sessionType)} for {userSetTime} minutes
          </h2>
          <p className="lead" data-testid="session-sub-title">
            {formatTime(currentTime)} remaining
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
              aria-valuenow={elapsedTimePercentage}
              style={{ width: `${elapsedTimePercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionDisplay;
