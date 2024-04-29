import { OrderedMap } from "immutable";
import { nanoid } from "nanoid";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "preact/compat";
import useCustomCompareEffect from "use-custom-compare-effect";
import { replacer, reviver } from "../util/json";
import { PersistentWorkspace, Workspaces } from "./types";

interface WorkspacesContext extends Workspaces {
  setActiveWorkspace: (id: string) => void;
  newWorkspace: () => void;
  updateWorkspace: (
    id: string,
    workspace: Partial<PersistentWorkspace>
  ) => void;
}

const initial: WorkspacesContext = {
  activeWorkspace: null,
  workspaces: OrderedMap([]),
  setActiveWorkspace: () => void 0,
  newWorkspace: () => void 0,
  updateWorkspace: () => void 0,
};

const defaultWorkspace: PersistentWorkspace = {
  id: nanoid(),
  name: "Default Workspace",
  text: "The quick brown dog jumps over the lazy cat.\nHow vexingly quick daft zebras jump!\nSphinx of black quartz, judge my vow.",
  search: "",
  createdAt: Date.now(),
  regexes: OrderedMap([
    (() => {
      const id = nanoid();
      return [
        id,
        {
          id,
          name: "Animals",
          pattern: "dog|cat",
          color:
            "#" +
            Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0"),
        },
      ];
    })(),
    (() => {
      const id = nanoid();
      return [
        id,
        {
          id,
          name: "Adjectives",
          pattern: "quick|brown|lazy",
          color:
            "#" +
            Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0"),
        },
      ];
    })(),
  ]),
};

const WorkspacesContext = createContext(initial);

export const WorkspacesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [workspaces, setWorkspaces] = useState<Workspaces | null>(null);

  useEffect(() => {
    const cachedWorkspaces = localStorage.getItem("multi-regex");
    if (cachedWorkspaces) {
      setWorkspaces(JSON.parse(cachedWorkspaces, reviver));
    } else {
      setWorkspaces({
        ...initial,
        activeWorkspace: defaultWorkspace.id,
        workspaces: OrderedMap([[defaultWorkspace.id, defaultWorkspace]]),
      });
    }
  }, []);

  useCustomCompareEffect<Workspaces | null>(
    () => {
      if (workspaces) {
        const { activeWorkspace, workspaces: currentWorkspaces } = workspaces;
        localStorage.setItem(
          "multi-regex",
          JSON.stringify(
            {
              activeWorkspace,
              workspaces: currentWorkspaces,
            },
            replacer
          )
        );
      }
    },
    workspaces,
    (w1, w2) =>
      (w1?.activeWorkspace === w2?.activeWorkspace &&
        w1?.workspaces &&
        w2?.workspaces &&
        w1?.workspaces.equals(w2.workspaces)) ||
      false
  );

  const setActiveWorkspace = useCallback(
    (id: string) => {
      if (workspaces?.workspaces.has(id)) {
        setWorkspaces({
          ...workspaces,
          activeWorkspace: id,
        });
      }
    },
    [workspaces]
  );

  const newWorkspace = useCallback(() => {
    if (workspaces) {
      const id = nanoid();
      const createdAt = Date.now();
      const name = `ws-${createdAt}`;

      setWorkspaces({
        ...workspaces,
        workspaces: workspaces.workspaces.set(id, {
          id,
          name,
          createdAt,
          search: "",
          text: "",
          regexes: OrderedMap(),
        }),
      });
    }
  }, [workspaces]);

  const updateWorkspace = useCallback(
    (id: string, workspace: Partial<PersistentWorkspace>) => {
      if (workspaces) {
        setWorkspaces({
          ...workspaces,
          workspaces: (() => {
            if (workspaces.workspaces.has(id)) {
              const { id: _, ...rest } = workspace;
              const currentWorkspace = workspaces.workspaces.get(id)!;
              return workspaces.workspaces.set(id, {
                ...currentWorkspace,
                ...rest,
              });
            }

            return workspaces.workspaces;
          })(),
        });
      }
    },
    [workspaces]
  );

  return (
    <WorkspacesContext.Provider
      value={{
        ...(workspaces ? workspaces : initial),
        setActiveWorkspace,
        newWorkspace,
        updateWorkspace,
      }}
    >
      {children}
    </WorkspacesContext.Provider>
  );
};

export const useWorkspaces = () => useContext(WorkspacesContext);

export const useCurrentWorkspace = (): PersistentWorkspace | null => {
  const { activeWorkspace, workspaces } = useContext(WorkspacesContext);

  return (activeWorkspace && workspaces.get(activeWorkspace, null)) || null;
};
