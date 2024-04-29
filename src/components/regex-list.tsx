import { FC, useCallback, useState } from "preact/compat";
import { Accordion } from "semantic-ui-react";

import { useCurrentWorkspace } from "../context/workspaces-context";
import { RegexItem } from "./regex-item";
import "./regex-list.css";
import { RegexTitle } from "./regex-title";

export const RegexList: FC = () => {
  const workspace = useCurrentWorkspace();
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
    if (workspace) {
      return workspace.regexes
        .toIndexedSeq()
        .flatMap((regex, i) => [
          <RegexTitle
            regex={regex}
            idx={i}
            active={activeIdx === i}
            setActive={setIdx}
          />,
          <RegexItem regex={regex} active={activeIdx === i} />,
        ])
        .toJS();
    } else {
      return [];
    }
  }, [workspace, activeIdx]);

  return <Accordion>{items()}</Accordion>;
};
