export function WelcomeHeader() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="flex justify-between items-end mb-8 welcome-header">
      <div>
        <h1 className="text-[28px] font-semibold text-white mb-1 tracking-tight">Welcome back, John 👋</h1>
        <p className="text-muted-foreground text-base">Here's what's happening with your leads today.</p>
      </div>
      <div className="text-sm text-muted-foreground">
        {today}
      </div>
    </div>
  );
}
