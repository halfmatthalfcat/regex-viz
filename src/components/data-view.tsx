import { FC, useState } from "preact/compat";

import merge from "deepmerge";
import useCustomCompareEffect from "use-custom-compare-effect";
import { Regex } from "../context/types";
import { useCurrentWorkspace } from "../context/workspaces-context";
import { DataChar } from "./data-char";
import "./data-view.css";

export const DataView: FC = () => {
  const workspace = useCurrentWorkspace();
  const [matches, setMatches] = useState<Record<number, Array<Regex>>>({});

  useCustomCompareEffect(
    () => {
      if (workspace?.regexes) {
        const matches = workspace.regexes.reduce((acc, regex) => {
          try {
            const r = new RegExp(regex.pattern, "g");
            const matches = [...workspace.text.matchAll(r)];
            return matches.reduce(
              (acc2, match) =>
                merge(
                  acc,
                  Array.from(
                    { length: match[0].length },
                    (_, i) => match.index! + i
                  ).reduce(
                    (acc3, idx) =>
                      merge(acc3, {
                        [idx]: [regex],
                      }),
                    acc2
                  ),
                  {
                    arrayMerge: (arr1: Array<Regex>, arr2: Array<Regex>) =>
                      [...arr1, ...arr2].reduce((acc, curr) => {
                        if (acc.some((item) => curr.id === item.id)) {
                          return acc;
                        } else {
                          return [...acc, curr];
                        }
                      }, [] as Array<Regex>),
                  }
                ),
              acc
            );
          } catch {
            return acc;
          }
        }, {} as Record<number, Array<Regex>>);
        setMatches(matches);
      } else {
        setMatches({});
      }
    },
    workspace?.regexes,
    (prev, curr) => !!(prev && curr && prev.equals(curr))
  );

  return (
    <div className="data-view">
      {workspace?.text.split("").map((char, i) => (
        <DataChar char={char === " " ? " " : char} matches={matches[i] ?? []} />
      ))}
    </div>
  );
};
