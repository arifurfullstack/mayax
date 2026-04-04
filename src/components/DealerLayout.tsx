import { ReactNode } from 'react';
import { TopNav } from './layout/TopNav';
import { Sidebar } from './layout/Sidebar';

export function DealerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <TopNav />
      <Sidebar />
      <main className="ml-[240px] mt-16 p-8 min-h-[calc(100vh-64px)] relative z-10 w-[calc(100%-240px)]">
        {children}
      </main>
    </div>
  );
}
