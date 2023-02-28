import * as React from "react";

function RemainingAttempts({
  remainingAttempts,
}: {
  remainingAttempts: number;
}) {
  return (
    <p className="label-score">
      💯 Remaining attempts: <span className="score">{remainingAttempts}</span>
    </p>
  );
}

export default RemainingAttempts;
