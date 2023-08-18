import React from "react";
import toMinAndSec from "../utils/duration/toMinAndSec.js";

function BreakDuration(props) {
  const { breakDuration, timer_is_running, setBreakDuration } = props;
  const handleBreakDurationChange = (action) => {
    if (!timer_is_running) {
      setBreakDuration(
        action === "increase"
          ? Math.min(breakDuration + 60000, 900000)
          : Math.max(breakDuration - 60000, 60000)
      );
    }
  };

  return (
    <div className="col">
      <div className="float-right">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-break">
            {/* TODO: Update this text to display the current break session duration */}
            Break Duration: {toMinAndSec(breakDuration)}
          </span>
          <div className="input-group-append">
            {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-break"
              onClick={() => handleBreakDurationChange("decrease")}
            >
              <span className="oi oi-minus" />
            </button>
            {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="increase-break"
              onClick={() => handleBreakDurationChange("increase")}
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreakDuration;
