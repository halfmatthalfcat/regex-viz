import { nanoid } from "nanoid";
import { FC } from "preact/compat";
import { useCallback } from "react";
import { MenuItem } from "semantic-ui-react";
import {
  useCurrentWorkspace,
  useWorkspaces,
} from "../context/workspaces-context";

export const RegexNew: FC = () => {
  const { updateWorkspace } = useWorkspaces();
  const workspace = useCurrentWorkspace();

  const onClick = useCallback(() => {
    if (workspace) {
      const id = nanoid();
      updateWorkspace(workspace.id, {
        regexes: workspace.regexes.set(id, {
          id,
          name: `Pattern ${workspace.regexes.size + 1}`,
          pattern: "",
          color:
            "#" +
            Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0"),
        }),
      });
    }
  }, [workspace, updateWorkspace]);

  return (
    <MenuItem primary={true} onClick={onClick} position="right">
      Add
    </MenuItem>
  );
};
