import * as React from "react";
import { NUMBER_MAX, NUMBER_MIN } from "../../utilities/constants";

function Header({
  status,
  handleRestartGame,
  secretNumber,
}: {
  status: string;
  handleRestartGame: Function;
  secretNumber: number;
}) {
  function handleRestart() {
    handleRestartGame();
  }

  const className = `${status === "won" ? "number won" : "number"}`;

  return (
    <header>
      <h1>Guess the Number!</h1>
      <p className="between">
        (Between {NUMBER_MIN} and {NUMBER_MAX})
      </p>
      {status !== "running" && (
        <button type="button" onClick={handleRestart} className="btn again">
          Again!
        </button>
      )}
      <div className={className}>
        {status !== "running" ? secretNumber : "?"}
      </div>
    </header>
  );
}

export default Header;
