import {
  FC,
  TargetedEvent,
  useCallback,
  useEffect,
  useState,
} from "preact/compat";
import {
  AccordionContent,
  Form,
  FormField,
  FormGroup,
  FormInput,
  TextArea,
} from "semantic-ui-react";
import { Regex } from "../context/types";
import {
  useCurrentWorkspace,
  useWorkspaces,
} from "../context/workspaces-context";
import "./regex-item.css";

const regexIsValid = (pattern: string, flags?: string): boolean => {
  try {
    new RegExp(pattern, flags);
    return true;
  } catch {
    return false;
  }
};

interface Props {
  regex: Regex;
  active: boolean;
}
export const RegexItem: FC<Props> = ({ regex, active }) => {
  const { updateWorkspace } = useWorkspaces();
  const workspace = useCurrentWorkspace();
  const [isValid, setIsValid] = useState(regexIsValid(regex.pattern, "g"));

  useEffect(() => {
    setIsValid(regexIsValid(regex.pattern, "g"));
  }, [regex]);

  const onLabelChange = useCallback(
    ({ currentTarget: { value } }: TargetedEvent<HTMLInputElement>) => {
      if (workspace && regex) {
        updateWorkspace(workspace.id, {
          regexes: workspace.regexes.update(regex.id, (regex) => ({
            ...regex!,
            name: value,
          })),
        });
      }
    },
    [workspace, regex, updateWorkspace]
  );

  const onRegexChange = useCallback(
    ({ currentTarget: { value } }: TargetedEvent<HTMLInputElement>) => {
      if (workspace && regex) {
        updateWorkspace(workspace.id, {
          regexes: workspace.regexes.update(regex.id, (regex) => ({
            ...regex!,
            pattern: value,
          })),
        });
      }
    },
    [workspace, regex, updateWorkspace]
  );

  const onColorChange = useCallback(
    ({ currentTarget: { value } }: TargetedEvent<HTMLInputElement>) => {
      if (value && workspace && regex) {
        updateWorkspace(workspace.id, {
          regexes: workspace.regexes.update(regex.id, (regex) => ({
            ...regex!,
            color: value,
          })),
        });
      }
    },
    [workspace, regex, updateWorkspace]
  );

  return (
    <AccordionContent active={active} className="regex-item">
      <Form>
        <FormGroup>
          <FormInput
            label="Label"
            width={14}
            defaultValue={regex?.name ?? ""}
            onChange={onLabelChange}
          />
          <FormInput
            className="regex-color"
            label="Color"
            type="color"
            defaultValue={regex?.color ?? void 0}
            width={2}
            onChange={onColorChange}
          />
        </FormGroup>
        <FormField
          className="regex-item-textarea"
          control={TextArea}
          label="Regex"
          defaultValue={regex?.pattern ?? ""}
          onChange={onRegexChange}
          error={
            !isValid
              ? {
                  content: "Regex invalid",
                }
              : void 0
          }
        />
      </Form>
    </AccordionContent>
  );
};
