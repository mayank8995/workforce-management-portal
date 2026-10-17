import { createPortal } from 'react-dom';
import type { MODAL_COMPONENTS, ModalType } from '../../utils/modalRegistry';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';
import { modal } from '../../theme/theme';
type OverlayContainerProps<T extends ModalType> = {
  Component: (typeof MODAL_COMPONENTS)[T];
  props: Record<any, any>;
  onClose: () => void;
};

const OverlayContainer = <T extends ModalType>({
  Component,
  props,
  onClose,
}: OverlayContainerProps<T>) => {
  useLockBodyScroll(true);
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    return null;
  }
  const ModalComponent = Component as React.ComponentType<any>;
  return (
    <>
      {createPortal(<ModalComponent {...props} onClose={onClose} />, modalRoot)}
      <button
        aria-label="overlay"
        className={modal.backdrop}
        onClick={onClose}
      />
    </>
  );
};

export default OverlayContainer;
