import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
  withBottomNavigation?: boolean;
}

export function AppShell({ children, withBottomNavigation = true }: AppShellProps) {
  return (
    <main className={`prebot-shell ${withBottomNavigation ? 'prebot-page-bottom-space' : ''}`}>
      {children}
    </main>
  );
}
