import { FC } from "preact/compat";
import { useDataContext } from "../context/data-context";

import "./data-view.css";

export const DataView: FC = () => {
  const { data } = useDataContext();

  return <div className="data-view">{data}</div>;
};
