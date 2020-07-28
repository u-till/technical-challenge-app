import Timer from "react-compound-timer";
import React from "react";

const ChallengeTimer = ({ timerValue, doneHandler }) => {
  return (
    <Timer
      initialTime={timerValue}
      direction="backward"
      checkpoints={[{ time: 0, callback: () => doneHandler() }]}
    >
      {() => (
        <React.Fragment>
          <p>
            <Timer.Minutes />:
            <Timer.Seconds
              formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
            />
          </p>
        </React.Fragment>
      )}
    </Timer>
  );
};

export default ChallengeTimer;
