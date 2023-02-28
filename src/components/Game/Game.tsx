import * as React from "react";
import {
  NUMBER_MAX,
  NUMBER_MIN,
  STARTING_REMAINING_ATTEMPTS,
} from "../../utilities/constants";
import Header from "../Header";
import GuessInput from "../GuessInput";
import generateRandomNumber from "../../utilities/game-helpers";
import RemainingAttempts from "../RemainingAttempts";
import Record from "../Record";
import GuessFeedback from "../GuessFeedback";

function Game() {
  const [remainingAttempts, setRemainingAttempts] = React.useState(
    STARTING_REMAINING_ATTEMPTS,
  );
  const [record, setRecord] = React.useState(0);
  const [secretNumber, setSecretNumber] = React.useState(
    generateRandomNumber(NUMBER_MIN, NUMBER_MAX),
  );
  const [status, setStatus] = React.useState("running");
  const [feedback, setFeedback] = React.useState("");

  function handleSubmitGuess(tentativeGuess: number) {
    const nextRemainingAttempts = remainingAttempts - 1;
    if (tentativeGuess === secretNumber) {
      setStatus("won");
      setRecord(record + 1);
      setFeedback("🎉 Congrats! You guessed the number!");
      return;
    }
    setRemainingAttempts(nextRemainingAttempts);
    if (nextRemainingAttempts === 0) {
      setStatus("lost");
      setRecord(0);
      setFeedback("💣 You lost!");
      return;
    }
    setFeedback(
      tentativeGuess > secretNumber
        ? "📈 Secret number is lower!"
        : "📉 Secret number is higher!",
    );
  }

  function handleRestart() {
    setRemainingAttempts(STARTING_REMAINING_ATTEMPTS);
    setSecretNumber(generateRandomNumber(NUMBER_MIN, NUMBER_MAX));
    setFeedback("");
    setStatus("running");
  }

  React.useEffect(() => {
    console.log(`Secret number: ${secretNumber}`);
  }, [secretNumber]);

  return (
    <div className={status === "won" ? "won" : ""}>
      <Header
        status={status}
        handleRestartGame={handleRestart}
        secretNumber={secretNumber}
      />
      <main>
        <section className="left">
          {status === "running" && (
            <GuessInput handleSubmitGuess={handleSubmitGuess} />
          )}
        </section>
        <section className="right">
          <GuessFeedback feedback={feedback} />
          <RemainingAttempts remainingAttempts={remainingAttempts} />
          <Record record={record} />
        </section>
      </main>
    </div>
  );
}

export default Game;
