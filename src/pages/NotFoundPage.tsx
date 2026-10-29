import { Link } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';

export function NotFoundPage() {
  return (
    <AppShell withBottomNavigation={false}>
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-serifbrand text-5xl">404</h1>
        <p className="text-sm text-prebot-taupe">요청한 페이지를 찾을 수 없습니다.</p>
        <Link className="rounded-full bg-prebot-brown px-6 py-3 text-sm text-white" to="/">홈으로 돌아가기</Link>
      </div>
    </AppShell>
  );
}
