import * as React from "react";

function GuessFeedback({ feedback }: { feedback: string }) {
  return <p className="message">{feedback || "Enter number..."}</p>;
}

export default GuessFeedback;
