import { FC } from "preact/compat";
import { AccordionTitle, Icon } from "semantic-ui-react";

import { Regex } from "../context/types";
import { getFontContrast } from "../util/color";
import "./regex-title.css";

interface Props {
  idx: number;
  regex: Regex;
  active: boolean;
  setActive: (idx: number) => void;
}
export const RegexTitle: FC<Props> = ({ regex, idx, active, setActive }) => (
  <AccordionTitle
    className="regex-title"
    index={idx}
    active={active}
    onClick={() => setActive(idx)}
  >
    <div
      style={{
        backgroundColor: regex.color,
        padding: ".5rem 0",
        color: getFontContrast(regex.color.replace("#", "")) ? "#000" : "#fff",
      }}
    >
      <Icon name="dropdown" />
      {regex.name}
    </div>
  </AccordionTitle>
);
