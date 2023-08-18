import React from "react";
import toMinAndSec from "../utils/duration/toMinAndSec.js";

function Display(props) {
  const { session, focusDuration, breakDuration, timer_is_running } = props;
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

  // Show timer display once timer is running
  if (timer_is_running) {
    document.querySelector("#display").style.display = "";
  }

  return (
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
  );
}

export default Display;
