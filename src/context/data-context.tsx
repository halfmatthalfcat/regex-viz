import merge from "deepmerge";
import { createContext } from "preact";
import {
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "preact/compat";

interface Regex {
  name: string;
  regex: RegExp;
  color: string;
}

const _state = {
  data: "this is some data",
  search: "",
  modal: {
    data: false,
  },
  regexs: {} as Record<string, Regex>,
};

const state = {
  ..._state,
  setState: (state: Partial<typeof _state>) => void 0,
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
