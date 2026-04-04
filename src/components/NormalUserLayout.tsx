import { ReactNode } from 'react';
import { NormalUserNav } from './NormalUserNav';

export function NormalUserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NormalUserNav />
      <main className="flex flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
