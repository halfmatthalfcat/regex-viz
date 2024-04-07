import { nanoid } from "nanoid";
import { FC, useCallback } from "preact/compat";
import { MenuItem } from "semantic-ui-react";
import { useDataContext } from "../context/data-context";

export const RegexNew: FC = () => {
  const { regexs, setState } = useDataContext();
  const onClick = useCallback(() => {
    const idx = Object.keys(regexs).length + 1;
    const id = nanoid();
    setState({
      regexs: {
        [id]: {
          id,
          name: `Pattern ${idx}`,
          pattern: "",
          color:
            "#" +
            Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0"),
        },
      },
    });
  }, [regexs]);

  return (
    <MenuItem primary={true} onClick={onClick} position="right">
      Add
    </MenuItem>
  );
};
