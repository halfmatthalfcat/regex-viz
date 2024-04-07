import { FC, useState } from "preact/compat";
import {
  Button,
  Form,
  MenuItem,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
  TextArea,
} from "semantic-ui-react";
import { useDataContext } from "../context/data-context";

export const DataLoad: FC = () => {
  const {
    setState,
    data,
    modal: { data: open },
  } = useDataContext();
  const [text, setText] = useState(data);

  return (
    <Modal
      open={open}
      trigger={
        <MenuItem
          position="right"
          onClick={() => setState({ modal: { data: true } })}
        >
          Load
        </MenuItem>
      }
    >
      <ModalHeader>Load New Data</ModalHeader>
      <ModalContent>
        <Form>
          <TextArea
            defaultValue={text}
            placeholder="Paste data here"
            onChange={({ currentTarget: { value } }) => setText(value)}
          />
        </Form>
      </ModalContent>
      <ModalActions>
        <Button
          primary
          onClick={() =>
            setState({
              data: text,
              modal: {
                data: false,
              },
            })
          }
        >
          Save
        </Button>
      </ModalActions>
    </Modal>
  );
};
