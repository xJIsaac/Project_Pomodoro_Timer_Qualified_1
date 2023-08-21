import React from "react";
import toMinAndSec from "../utils/duration/toMinAndSec.js";

function duration(props) {
  const { handleTimeChange, durationType, time } = props;

  return (
    <div className="col">
      <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="time-break">
          {/* TODO: Update this text to display the current break session time */}
          {durationType} Time: {time} mins
        </span>
        <div className="input-group-append">
          {/* TODO: Implement decreasing break time and disable during a focus or break session*/}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="decrease"
            onClick={() => handleTimeChange("-")}
          >
            <span className="oi oi-minus" />
          </button>
          {/* TODO: Implement increasing break time and disable during a focus or break session*/}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="increase"
            onClick={() => handleTimeChange("+")}
          >
            <span className="oi oi-plus" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default duration;
