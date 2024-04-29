import { FC, useCallback, useState } from "preact/compat";
import { } from "react";
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
import { useModals } from "../context/modal-context";
import {
  useCurrentWorkspace,
  useWorkspaces,
} from "../context/workspaces-context";

export const DataLoad: FC = () => {
  const { data: dataOpen, toggleModal } = useModals();

  const { updateWorkspace } = useWorkspaces();
  const workspace = useCurrentWorkspace();

  const [text, setText] = useState(workspace?.text ?? "");

  const onSave = useCallback(() => {
    if (workspace) {
      updateWorkspace(workspace.id, {
        text,
      });

      toggleModal("data");
    }
  }, [workspace, updateWorkspace, text]);

  return (
    <Modal
      open={dataOpen}
      trigger={
        <MenuItem position="right" onClick={() => toggleModal("data")}>
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
        <Button primary onClick={onSave}>
          Save
        </Button>
      </ModalActions>
    </Modal>
  );
};
