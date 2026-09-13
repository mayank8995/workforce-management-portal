import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useMemo,
  useCallback,
} from 'react';
import type { MODAL_COMPONENTS, ModalType } from '../utils/modalRegistry';
import OverlayContainer from '../components/Overlay/OverlayContainer';

export type ModalProps<T extends ModalType> = React.ComponentProps<
  (typeof MODAL_COMPONENTS)[T]
>;

interface ModalContextType {
  openModal: <T extends ModalType>(
    component: (typeof MODAL_COMPONENTS)[T],
    props?: Record<any, any>
  ) => void;
  closeModal: () => void;
  updateModalProps: (props: Record<any, any>) => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalComponent, setModalComponent] = useState<
    (typeof MODAL_COMPONENTS)[ModalType] | null
  >(null);
  const [modalProps, setModalProps] = useState<Record<any, any>>({});

  const openModal = useCallback(
    <T extends ModalType>(
      component: (typeof MODAL_COMPONENTS)[T],
      props?: Record<any, any>
    ) => {
      setModalComponent(() => component);
      setModalProps(props as Record<any, any>);
    },
    []
  );

  const updateModalProps = useCallback((newProps: Record<any, any>) => {
    setModalProps((prev) => ({
      ...prev,
      ...newProps,
    }));
  }, []);

  const closeModal = useCallback(() => {
    setModalComponent(null);
    setModalProps({});
  }, []);
  const value = useMemo(
    () => ({ openModal, closeModal, updateModalProps }),
    [openModal, closeModal, updateModalProps]
  );

  return (
    <ModalContext value={value}>
      {children}
      {modalComponent && (
        <OverlayContainer
          Component={modalComponent}
          props={modalProps}
          onClose={closeModal}
        />
      )}
    </ModalContext>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
