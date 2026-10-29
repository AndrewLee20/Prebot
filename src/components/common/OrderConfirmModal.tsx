import { Modal, ModalButton } from './Modal';

interface OrderConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function OrderConfirmModal({ open, onConfirm, onCancel }: OrderConfirmModalProps) {
  return (
    <Modal open={open} layerClassName="z-[100]">
      <h2 className="text-[20px] font-semibold leading-[1.5] tracking-[-0.025em] text-[#201914]">
        해당 메뉴들을 주문할까요?
      </h2>
      <p className="mt-2 text-[15px] text-[#756a62]">주문 후 취소가 어려워요.</p>
      <div className="mt-6 flex justify-center gap-3">
        <ModalButton onClick={onConfirm}>
          예
        </ModalButton>
        <ModalButton onClick={onCancel} secondary>
          아니오
        </ModalButton>
      </div>
    </Modal>
  );
}
