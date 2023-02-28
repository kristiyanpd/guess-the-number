import * as React from "react";

function Record({ record }: { record: number }) {
  return (
    <p className="label-highscore">
      🥇 Record: <span className="highscore">{record}</span>
    </p>
  );
}

export default Record;
