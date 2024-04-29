import { createContext } from "preact";
import {
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "preact/compat";

const modals: {
  data: boolean;
} = {
  data: false,
} as const;

const ModalContext = createContext({
  ...modals,
  toggleModal: (() => void 0) as (modal: keyof typeof modals) => void,
});

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState(modals);
  const toggleModal = useCallback(
    (modal: keyof typeof modals) => {
      console.log(modal);
      setState((s) => ({
        ...s,
        [modal]: !s[modal],
      }));
    },
    [setState]
  );

  return (
    <ModalContext.Provider
      value={{
        ...state,
        toggleModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModals = () => useContext(ModalContext);
