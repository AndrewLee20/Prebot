import { Modal, ModalButton } from './Modal';

interface AddToCartConfirmModalProps {
  open: boolean;
  onOrderNow: () => void;
  onKeepShopping: () => void;
}

export function AddToCartConfirmModal({ open, onOrderNow, onKeepShopping }: AddToCartConfirmModalProps) {
  return (
    <Modal
      open={open}
      layerClassName="z-[90]"
      backdropClassName="bg-[#17110d]/48"
      shadowClassName="shadow-[0_24px_70px_rgba(34,24,18,.26)]"
    >
      <h2 className="text-[19px] font-semibold leading-[1.55] tracking-[-0.025em] text-[#201914]">
        메뉴가 장바구니에 담겼습니다.
        <br />
        바로 주문할까요?
      </h2>
      <div className="mt-6 flex justify-center gap-3">
        <ModalButton onClick={onOrderNow}>
          바로 주문
        </ModalButton>
        <ModalButton onClick={onKeepShopping} secondary className="min-w-[122px] px-5">
          메뉴 더 담기
        </ModalButton>
      </div>
    </Modal>
  );
}
