import { Modal, ModalButton } from './Modal';

interface CartDineTypeAlertModalProps {
  open: boolean;
  onClose: () => void;
}

export function CartDineTypeAlertModal({ open, onClose }: CartDineTypeAlertModalProps) {
  return (
    <Modal open={open} layerClassName="z-[110]">
      <h2 className="text-[19px] font-semibold leading-[1.55] tracking-[-0.025em] text-[#201914]">
        매장 이용 / To Go 중<br />하나만 선택해주세요.
      </h2>
      <ModalButton onClick={onClose} className="mt-6 min-w-[132px] px-6">
        알겠습니다
      </ModalButton>
    </Modal>
  );
}
