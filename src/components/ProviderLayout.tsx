import { ReactNode } from 'react';
import { ProviderNav } from './ProviderNav';

export function ProviderLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ProviderNav />
      <main className="flex flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
