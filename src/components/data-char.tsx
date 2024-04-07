import { FC, useEffect, useState } from "preact/compat";
import { useDataContext } from "../context/data-context";
import "./data-char.css";

interface Props {
  char: string;
  idx: number;
}
export const DataChar: FC<Props> = ({ char, idx }) => {
  const { matches: allMatches } = useDataContext();
  const [matches, setMatches] = useState(allMatches[idx] ?? []);

  useEffect(() => {
    if (allMatches[idx]) {
      setMatches(allMatches[idx]);
    } else {
      setMatches([]);
    }
  }, allMatches[idx] ?? []);

  return (
    <span
      className="data-char"
      style={{ flex: char === "\n" ? "100%" : void 0 }}
    >
      <span>{char}</span>
      <div className="data-char-lines">
        {matches.map((match) => (
          <div
            key={match.id}
            className="data-char-line"
            style={{ backgroundColor: match.color }}
          />
        ))}
      </div>
    </span>
  );
};
