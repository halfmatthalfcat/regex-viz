import { FC, useEffect, useState } from "preact/compat";
import {
  AccordionContent,
  Form,
  FormField,
  FormGroup,
  FormInput,
  TextArea,
} from "semantic-ui-react";
import { useDataContext } from "../context/data-context";

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
  id: string;
  active: boolean;
}
export const RegexItem: FC<Props> = ({ id, active }) => {
  const { regexs, setState } = useDataContext();
  const [regex, setRegex] = useState(regexs[id]);
  const [isValid, setIsValid] = useState(
    regex ? regexIsValid(regex.pattern, "g") : false
  );

  useEffect(() => {
    setRegex(regexs[id]);
  }, [regexs[id]]);

  useEffect(() => {
    setIsValid(regex ? regexIsValid(regex.pattern, "g") : false);
  }, [regex]);

  return (
    <AccordionContent active={active} className="regex-item">
      <Form>
        <FormGroup>
          <FormInput
            label="Label"
            width={14}
            defaultValue={regex?.name ?? ""}
            onChange={({ currentTarget: { value } }) =>
              setState({
                regexs: {
                  [id]: {
                    name: value,
                  },
                },
              })
            }
          />
          <FormInput
            className="regex-color"
            label="Color"
            type="color"
            defaultValue={regex?.color ?? void 0}
            width={2}
            onChange={({ currentTarget: { value } }) =>
              setState({
                regexs: {
                  [id]: {
                    color: value,
                  },
                },
              })
            }
          />
        </FormGroup>
        <FormField
          className="regex-item-textarea"
          control={TextArea}
          label="Regex"
          defaultValue={regex?.pattern ?? ""}
          onChange={({ currentTarget: { value } }) =>
            setState({
              regexs: {
                [id]: {
                  pattern: value,
                },
              },
            })
          }
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
