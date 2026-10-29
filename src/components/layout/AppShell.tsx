import type { ReactNode } from 'react';
import { BottomNavigation } from './BottomNavigation';

interface AppShellProps {
  children: ReactNode;
  withBottomNavigation?: boolean;
}

export function AppShell({ children, withBottomNavigation = true }: AppShellProps) {
  return (
    <main className="prebot-shell">
      {children}
      {withBottomNavigation && <BottomNavigation />}
    </main>
  );
}
