import { FC } from "preact/compat";
import { useCallback } from "react";
import { Divider } from "semantic-ui-react";
import { useDataContext } from "../context/data-context";
import { RegexItem } from "./regex-item";

import "./regex-list.css";

export const RegexList: FC = () => {
  const { regexs } = useDataContext();

  const items = useCallback(() => {
    const _items = Object.keys(regexs).flatMap((id) => [
      <RegexItem id={id} />,
      <Divider />,
    ]);

    return _items;
  }, [regexs]);

  return <div className="regex-list">{items()}</div>;
};
