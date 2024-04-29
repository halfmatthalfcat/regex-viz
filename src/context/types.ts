import { type OrderedMap } from "immutable";

export interface Regex {
  id: string;
  name: string;
  pattern: string;
  color: string;
}

export interface PersistentWorkspace {
  id: string;
  name: string;
  createdAt: number;
  search: string;
  text: string;
  regexes: OrderedMap<string, Regex>;
}

export interface LocalWorkspace extends PersistentWorkspace {
  matches: Record<number, Array<Regex>>;
}

export interface Workspaces {
  activeWorkspace: string | null;
  workspaces: OrderedMap<string, PersistentWorkspace>;
}
