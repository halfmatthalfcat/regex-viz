import merge from "deepmerge";
import { createContext } from "preact";
import {
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "preact/compat";
import { type PartialDeep } from "type-fest";
import useDeepCompareEffect from "use-deep-compare-effect";

interface Regex {
  id: string;
  name: string;
  pattern: string;
  color: string;
}

const _state = {
  data: "this is some data",
  search: "",
  modal: {
    data: false,
  },
  regexs: {} as {
    [name: string]: Regex;
  },
  matches: {} as {
    [idx: number]: Array<Regex>;
  },
};

const state = {
  ..._state,
  setState: (state: PartialDeep<typeof _state>) => void 0,
};

const DataContext = createContext(state);

export const DataContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentState, setCurrentState] = useState(_state);
  const setState = useCallback(
    (newState: Partial<typeof _state>) => {
      setCurrentState(merge(currentState, newState));
    },
    [currentState]
  );

  useEffect(() => {
    const cachedState = localStorage.getItem("multi-regex");
    if (cachedState) {
      setState(JSON.parse(cachedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("multi-regex", JSON.stringify(currentState));
  }, [currentState]);

  useDeepCompareEffect(() => {
    console.log("comparing");
    const matches = Object.values(currentState.regexs).reduce((acc, regex) => {
      try {
        const r = new RegExp(regex.pattern, "g");
        const matches = [...currentState.data.matchAll(r)];
        return matches.reduce(
          (acc2, match) =>
            merge(
              acc,
              Array.from(
                { length: match[0].length },
                (_, i) => match.index + i
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
        return {};
      }
    }, {} as { [idx: number]: Array<Regex> });
    setCurrentState((curr) => ({
      ...curr,
      matches,
    }));
  }, [currentState.data, currentState.regexs]);

  return (
    <DataContext.Provider
      value={{
        ...currentState,
        setState,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
