import { FC, useCallback, useState } from "preact/compat";
import { Accordion } from "semantic-ui-react";
import { useDataContext } from "../context/data-context";

import { RegexItem } from "./regex-item";
import "./regex-list.css";
import { RegexTitle } from "./regex-title";

export const RegexList: FC = () => {
  const { regexs } = useDataContext();
  const [activeIdx, setActiveIdx] = useState(-1);

  const setIdx = useCallback(
    (idx: number) => {
      if (idx === activeIdx) {
        setActiveIdx(-1);
      } else {
        setActiveIdx(idx);
      }
    },
    [activeIdx]
  );

  const items = useCallback(() => {
    const _items = Object.keys(regexs).flatMap((id, i) => [
      <RegexTitle
        id={id}
        idx={i}
        active={activeIdx === i}
        setActive={setIdx}
      />,
      <RegexItem id={id} active={activeIdx === i} />,
    ]);

    return _items;
  }, [regexs, activeIdx]);

  return <Accordion>{items()}</Accordion>;
};
