import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { AppShell } from '../components/layout/AppShell';
import { PageHeader } from '../components/layout/PageHeader';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <AppShell>
      <section className="absolute inset-x-0 top-0 bottom-[var(--bottom-nav-height)] overflow-hidden bg-[#d9c8b7]">
        <img
          src="/images/prebot_background.png"
          alt="따뜻한 자연광 아래 놓인 아이스 카페라떼"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5ebdf]/10 via-transparent to-[#cfae8b]/[0.02]" />

        <PageHeader className="absolute inset-x-0 top-0 bg-[#fbf8f2]" />

        <div className="absolute bottom-[15%] left-6 sm:left-8">
          <p className="mb-5 font-serifbrand text-[12px] font-medium uppercase leading-[1.65] tracking-[0.19em] text-[#3e3128]">
            YOUR ORDER,
            <br />
            PREPARED SMARTER.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/menu')}
            className="min-w-[174px] border-black/5 bg-[#2d231d]/95 px-8 shadow-prebot-soft"
          >
            <span className="text-[17px]">주문하기</span>
            <span aria-hidden="true" className="text-[22px] font-light leading-none">→</span>
          </Button>
        </div>
      </section>
    </AppShell>
  );
}
