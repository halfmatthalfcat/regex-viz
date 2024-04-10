import { FC, useEffect, useState } from "preact/compat";
import { AccordionTitle, Icon } from "semantic-ui-react";
import { useDataContext } from "../context/data-context";

import { getFontContrast } from "../util/color";
import "./regex-title.css";

interface Props {
  id: string;
  idx: number;
  active: boolean;
  setActive: (idx: number) => void;
}
export const RegexTitle: FC<Props> = ({ id, idx, active, setActive }) => {
  const { regexs } = useDataContext();
  const [regex, setRegex] = useState(regexs[id]);

  useEffect(() => {
    setRegex(regexs[id]);
  }, [regexs[id]]);

  return (
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
          color: getFontContrast(regex.color.replace("#", ""))
            ? "#000"
            : "#fff",
        }}
      >
        <Icon name="dropdown" />
        {regex.name}
      </div>
    </AccordionTitle>
  );
};
