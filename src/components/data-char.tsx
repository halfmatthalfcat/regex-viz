import { FC } from "preact/compat";
import { Popup } from "semantic-ui-react";
import { Regex } from "../context/types";
import "./data-char.css";

interface Props {
  char: string;
  matches: Array<Regex>;
}
export const DataChar: FC<Props> = ({ char, matches }) => (
  <span className="data-char" style={{ flex: char === "\n" ? "100%" : void 0 }}>
    <span>{char}</span>
    <div className="data-char-lines">
      {matches.map((match) => (
        <Popup
          key={match.id}
          content={match.name}
          offset={[-15, 15]}
          style={{ borderBottom: `3px solid ${match.color}` }}
          trigger={
            <div
              className="data-char-line"
              style={{ backgroundColor: match.color }}
            />
          }
        />
      ))}
    </div>
  </span>
);
