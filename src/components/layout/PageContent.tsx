import type { ReactNode } from 'react';
import { PageHeader } from './PageHeader';

interface PageContentProps {
  children: ReactNode;
  className: string;
}

export function PageContent({ children, className }: PageContentProps) {
  return (
    <div className="prebot-scroll-area bg-prebot-paper">
      <PageHeader />
      <div className={className}>{children}</div>
    </div>
  );
}
