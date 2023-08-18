import React from "react";
import toMinAndSec from "../utils/duration/toMinAndSec.js";

function FocusDuration(props) {
  const { focusDuration, timer_is_running, setFocusDuration } = props;
  const handleFocusDurationChange = (action) => {
    if (!timer_is_running) {
      setFocusDuration(
        action === "increase"
          ? Math.min(focusDuration + 300000, 3600000)
          : Math.max(focusDuration - 300000, 300000)
      );
    }
  };

  return (
    <div className="col">
      <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-focus">
          {/* TODO: Update this text to display the current focus session duration */}
          Focus Duration: {toMinAndSec(focusDuration)}
        </span>
        <div className="input-group-append">
          {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="decrease-focus"
            onClick={() => handleFocusDurationChange("decrease")}
          >
            <span className="oi oi-minus" />
          </button>
          {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="increase-focus"
            onClick={() => handleFocusDurationChange("increase")}
          >
            <span className="oi oi-plus" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FocusDuration;
