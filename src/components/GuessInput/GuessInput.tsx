import * as React from "react";
import { NUMBER_MAX, NUMBER_MIN } from "../../utilities/constants";

function GuessInput({ handleSubmitGuess }: { handleSubmitGuess: Function }) {
  const [tentativeGuess, setTentativeGuess] = React.useState<number>();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    handleSubmitGuess(tentativeGuess);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTentativeGuess(Number(event.target.value));
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <input
        required
        value={tentativeGuess}
        onChange={(event) => handleChange(event)}
        min={NUMBER_MIN}
        max={NUMBER_MAX}
        title={`Number between ${NUMBER_MIN} and ${NUMBER_MAX}`}
        type="number"
        className="guess"
      />
      <button type="submit" className="btn check">
        Check!
      </button>
    </form>
  );
}

export default GuessInput;
