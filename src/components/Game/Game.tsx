import * as React from "react";
import useSound from "use-sound";
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
import win from "../../sounds/win.mp3";
import lose from "../../sounds/lose.mp3";
import error from "../../sounds/error.mp3";

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

  const [playWin] = useSound(win);
  const [playLose] = useSound(lose);
  const [playError] = useSound(error);

  function handleSubmitGuess(tentativeGuess: number) {
    const nextRemainingAttempts = remainingAttempts - 1;
    if (tentativeGuess === secretNumber) {
      setStatus("won");
      setRecord(record + 1);
      playWin();
      setFeedback("🎉 Congrats! You guessed the number!");
      return;
    }
    setRemainingAttempts(nextRemainingAttempts);
    if (nextRemainingAttempts === 0) {
      setStatus("lost");
      setRecord(0);
      playLose();
      setFeedback("💣 You lost!");
      return;
    }
    playError();
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
