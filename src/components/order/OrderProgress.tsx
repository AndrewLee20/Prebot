import type { OrderStatus } from '../../types/order';

const steps: { value: OrderStatus; label: string }[] = [
  { value: 'RECEIVED', label: '주문 접수' },
  { value: 'PREPARING', label: '준비 중' },
  { value: 'READY', label: '준비 완료' },
  { value: 'PICKUP', label: '픽업 완료' },
];

export function OrderProgress({ status }: { status: OrderStatus }) {
  const activeIndex = Math.max(0, steps.findIndex((step) => step.value === status));

  return (
    <div className="relative grid grid-cols-4 pt-1">
      <div className="absolute left-[12.5%] right-[12.5%] top-[8px] h-px bg-[#d5cec7]" />
      {steps.map((step, index) => (
        <div key={step.value} className="relative z-10 flex min-w-0 flex-col items-center text-center">
          <span
            className={`h-[15px] w-[15px] shrink-0 rounded-full border-2 ${
              index === activeIndex ? 'border-[#342820] bg-[#342820]' : 'border-[#d8d1ca] bg-[#d8d1ca]'
            }`}
          />
          <span className={`mt-2 whitespace-nowrap text-[10px] leading-none ${
            index === activeIndex ? 'font-semibold text-[#2d241e]' : 'text-[#8a817a]'
          }`}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}
