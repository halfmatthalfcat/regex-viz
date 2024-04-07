import { FC } from "preact/compat";
import { useDataContext } from "../context/data-context";

import { DataChar } from "./data-char";
import "./data-view.css";

export const DataView: FC = () => {
  const { data } = useDataContext();

  return (
    <div className="data-view">
      {data.split("").map((char, i) => (
        <DataChar char={char === " " ? " " : char} idx={i} />
      ))}
    </div>
  );
};
