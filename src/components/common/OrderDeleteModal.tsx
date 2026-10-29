import { Modal, ModalButton } from './Modal';

interface OrderDeleteModalProps {
  open: boolean;
  canDelete: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function OrderDeleteModal({ open, canDelete, onConfirm, onClose }: OrderDeleteModalProps) {
  return (
    <Modal open={open} layerClassName="z-[120]">
      {canDelete ? (
        <>
          <h2 className="text-[20px] font-semibold leading-[1.5] tracking-[-0.025em] text-[#201914]">
            주문 내역을 삭제할까요?
          </h2>
          <div className="mt-6 flex justify-center gap-3">
            <ModalButton onClick={onConfirm}>
              예
            </ModalButton>
            <ModalButton onClick={onClose} secondary>
              아니오
            </ModalButton>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-[18px] font-semibold leading-[1.6] tracking-[-0.025em] text-[#201914]">
            픽업을 완료한 후에만<br />주문 내역을 삭제할 수 있어요.
          </h2>
          <ModalButton onClick={onClose} className="mt-6 min-w-[132px] px-6">
            알겠습니다
          </ModalButton>
        </>
      )}
    </Modal>
  );
}
