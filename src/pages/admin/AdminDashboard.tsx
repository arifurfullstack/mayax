import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Clock, Grid, CheckCircle2, DollarSign, Percent, AlertCircle, ShoppingBag, PlusCircle, Settings, XCircle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export default function AdminDashboard() {
  // Mock Data
  const pendingDealers = 3;
  const pendingProviders = 5;
  const pendingLeads = 12;
  const failedDeliveries = 4;
  const pendingPayouts = 2;

  const totalPendingActions = pendingDealers + pendingProviders + pendingLeads + failedDeliveries + pendingPayouts;

  const revenueData = [
    { name: 'Jan', subscriptions: 4000, leads: 2400, commission: 2400 },
    { name: 'Feb', subscriptions: 3000, leads: 1398, commission: 2210 },
    { name: 'Mar', subscriptions: 2000, leads: 9800, commission: 2290 },
    { name: 'Apr', subscriptions: 2780, leads: 3908, commission: 2000 },
    { name: 'May', subscriptions: 1890, leads: 4800, commission: 2181 },
    { name: 'Jun', subscriptions: 2390, leads: 3800, commission: 2500 },
    { name: 'Jul', subscriptions: 3490, leads: 4300, commission: 2100 },
  ];

  const userGrowthData = [
    { name: 'Jan', normal: 120, dealers: 80, providers: 20 },
    { name: 'Mar', normal: 135, dealers: 90, providers: 25 },
    { name: 'May', normal: 150, dealers: 105, providers: 32 },
    { name: 'Jul', normal: 180, dealers: 120, providers: 42 },
  ];

  const pipelineData = [
    { name: 'Leads', pending: 12, live: 156, sold: 89, rejected: 4 }
  ];

  const recentActivity = [
    { text: "Dealer 'Toronto Auto Group' was approved", actor: 'Admin Sarah', time: '10 min ago', status: 'approved', icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" /> },
    { text: "Lead MLH-2084 was purchased by 'Hamilton Motors'", actor: 'System', time: '25 min ago', status: 'info', icon: <ShoppingBag className="h-4 w-4 text-maya-blue" /> },
    { text: "Provider 'LeadGen Pro' submitted 5 new leads", actor: 'System', time: '1 hour ago', status: 'pending', icon: <Clock className="h-4 w-4 text-amber-500" /> },
    { text: "Dealer 'Ottawa Cars' funded wallet: +$500", actor: 'System', time: '2 hours ago', status: 'approved', icon: <DollarSign className="h-4 w-4 text-emerald-500" /> },
    { text: "Webhook delivery failed for Lead MLH-2080", actor: 'System', time: '3 hours ago', status: 'error', icon: <XCircle className="h-4 w-4 text-rose-500" /> },
    { text: "Provider 'QuickLeads' requested payout: $640", actor: 'System', time: '5 hours ago', status: 'info', icon: <DollarSign className="h-4 w-4 text-maya-blue" /> },
  ];

  const topProviders = [
    { rank: 1, name: 'LeadGen Pro', sold: 34, revenue: '$2,720', approvalRate: '98%' },
    { rank: 2, name: 'AutoLeads Inc', sold: 28, revenue: '$2,240', approvalRate: '95%' },
    { rank: 3, name: 'QuickConnect', sold: 15, revenue: '$1,200', approvalRate: '92%' },
    { rank: 4, name: 'Maple Auto Data', sold: 8, revenue: '$640', approvalRate: '88%' },
    { rank: 5, name: 'Prime Buyers', sold: 4, revenue: '$320', approvalRate: '100%' },
  ];

  const topBuyers = [
    { rank: 1, name: 'Toronto Auto Group', purchased: 18, spent: '$1,530', tier: 'ELITE' },
    { rank: 2, name: 'Hamilton Motors', purchased: 15, spent: '$1,275', tier: 'PRO' },
    { rank: 3, name: 'Vancouver Imports', purchased: 12, spent: '$1,020', tier: 'VIP' },
    { rank: 4, name: 'Calgary Used Cars', purchased: 8, spent: '$680', tier: 'BASIC' },
    { rank: 5, name: 'Online Motors', purchased: 5, spent: '$425', tier: 'PRO' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admin Command Center</h1>
      </div>

      {/* ROW 1: Key Platform Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-xs font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">342</p>
            <p className="text-[10px] text-muted-foreground mt-1 truncate">N:180 | D:120 | P:42</p>
          </CardContent>
        </Card>
        
        <Card className={`${totalPendingActions > 0 ? 'border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.1)]' : ''}`}>
          <CardHeader className="pb-2 flex-row items-center justify-between flex-nowrap">
            <CardTitle className="text-xs font-medium text-muted-foreground">Pending Approvals</CardTitle>
            <div className="relative flex h-4 w-4">
              {totalPendingActions > 0 && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>}
              <Clock className={`relative inline-flex rounded-full h-4 w-4 ${totalPendingActions > 0 ? 'text-rose-500' : 'text-muted-foreground'}`} />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8</p>
            <p className="text-[10px] text-muted-foreground mt-1">D:3 | P:5</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-xs font-medium text-muted-foreground">Marketplace Leads</CardTitle>
            <Grid className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">156</p>
            <p className="text-[10px] text-muted-foreground mt-1">Available: 156 | Pending: 12</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-xs font-medium text-muted-foreground">Sold This Month</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-maya-blue" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">89</p>
            <p className="text-[10px] text-emerald-500 font-medium mt-1">↑ +12% vs last month</p>
          </CardContent>
        </Card>

        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-xs font-medium text-emerald-700 dark:text-emerald-500">Revenue Month</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">$8,940</p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-500 font-medium mt-1">↑ +18% vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-xs font-medium text-muted-foreground">Plat. Commission</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$748</p>
            <p className="text-[10px] text-muted-foreground mt-1">Provider payouts due: $2,992</p>
          </CardContent>
        </Card>
      </div>

      {/* ROW 2: Pending Actions Panel */}
      {totalPendingActions > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {pendingDealers > 0 && (
            <Card className="bg-amber-500/10 border-amber-500/20">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-amber-700 dark:text-amber-500 text-sm">{pendingDealers} Dealers Pending</h3>
                  <Users className="h-4 w-4 text-amber-500" />
                </div>
                <Button size="sm" asChild variant="outline" className="w-full bg-transparent border-amber-500/30 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 text-xs h-7">
                  <Link to="/admin/users?role=dealer&status=pending">Review →</Link>
                </Button>
              </CardContent>
            </Card>
          )}
          {pendingProviders > 0 && (
            <Card className="bg-amber-500/10 border-amber-500/20">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-amber-700 dark:text-amber-500 text-sm">{pendingProviders} Providers Pending</h3>
                  <Users className="h-4 w-4 text-amber-500" />
                </div>
                <Button size="sm" asChild variant="outline" className="w-full bg-transparent border-amber-500/30 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 text-xs h-7">
                  <Link to="/admin/users?role=provider&status=pending">Review →</Link>
                </Button>
              </CardContent>
            </Card>
          )}
          {pendingLeads > 0 && (
            <Card className="bg-amber-500/10 border-amber-500/20">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-amber-700 dark:text-amber-500 text-sm">{pendingLeads} Leads Pending</h3>
                  <Grid className="h-4 w-4 text-amber-500" />
                </div>
                <Button size="sm" asChild variant="outline" className="w-full bg-transparent border-amber-500/30 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 text-xs h-7">
                  <Link to="/admin/leads/review">Review →</Link>
                </Button>
              </CardContent>
            </Card>
          )}
          {failedDeliveries > 0 && (
            <Card className="bg-rose-500/10 border-rose-500/20">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-rose-700 dark:text-rose-500 text-sm">{failedDeliveries} Failed Deliveries</h3>
                  <AlertCircle className="h-4 w-4 text-rose-500" />
                </div>
                <Button size="sm" asChild variant="outline" className="w-full bg-transparent border-rose-500/30 text-rose-700 dark:text-rose-400 hover:bg-rose-500/20 text-xs h-7">
                  <Link to="/admin/delivery-logs?status=failed">View →</Link>
                </Button>
              </CardContent>
            </Card>
          )}
          {pendingPayouts > 0 && (
            <Card className="bg-maya-blue/10 border-maya-blue/20">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-maya-blue text-sm">{pendingPayouts} Payout Requests</h3>
                  <DollarSign className="h-4 w-4 text-maya-blue" />
                </div>
                <Button size="sm" asChild variant="outline" className="w-full bg-transparent border-maya-blue/30 text-maya-blue hover:bg-maya-blue/20 text-xs h-7">
                  <Link to="/admin/payouts?status=pending">Process →</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ROW 3: Revenue & User Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Platform income breakdown</CardDescription>
            </div>
            <select className="text-sm bg-transparent border-none text-muted-foreground outline-none cursor-pointer">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorLead" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCom" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <RechartsTooltip />
                  <Area type="monotone" dataKey="subscriptions" stackId="1" stroke="#3b82f6" fill="url(#colorSub)" name="Subscriptions" />
                  <Area type="monotone" dataKey="leads" stackId="1" stroke="#10b981" fill="url(#colorLead)" name="Lead Sales" />
                  <Area type="monotone" dataKey="commission" stackId="1" stroke="#8b5cf6" fill="url(#colorCom)" name="Commission" />
                  <Legend verticalAlign="top" height={36}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Accounts over time</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-1">
            <div className="h-[180px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} width={30} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="normal" stroke="#94a3b8" strokeWidth={2} dot={false} name="Normal" />
                  <Line type="monotone" dataKey="dealers" stroke="#3b82f6" strokeWidth={2} dot={false} name="Dealers" />
                  <Line type="monotone" dataKey="providers" stroke="#f59e0b" strokeWidth={2} dot={false} name="Providers" />
                  <Legend verticalAlign="top" height={36}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-auto pt-4 border-t text-sm text-center">
              <div>
                <p className="font-bold">180</p>
                <p className="text-[10px] text-muted-foreground">Normal</p>
              </div>
              <div>
                <p className="font-bold text-maya-blue">120</p>
                <p className="text-[10px] text-muted-foreground">Dealers</p>
              </div>
              <div>
                <p className="font-bold text-amber-500">42</p>
                <p className="text-[10px] text-muted-foreground">Providers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROW 4: Recent Activity & Lead Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 lg:h-[250px] overflow-auto pr-2">
              {recentActivity.map((act, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-0.5">{act.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none mb-1">{act.text}</p>
                    <p className="text-xs text-muted-foreground">{act.actor} • {act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Pipeline</CardTitle>
            <CardDescription>Current status distribution across marketplace</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="h-[120px] w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pipelineData} layout="vertical" barSize={40}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" hide />
                  <RechartsTooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                  <Bar dataKey="live" stackId="a" fill="#10b981" name="Live (156)" radius={[4, 0, 0, 4]} />
                  <Bar dataKey="sold" stackId="a" fill="#3b82f6" name="Sold (89)" />
                  <Bar dataKey="pending" stackId="a" fill="#f59e0b" name="Pending (12)" />
                  <Bar dataKey="rejected" stackId="a" fill="#f43f5e" name="Rejected (4)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 pt-4 border-t text-center">
              <Link to="/admin/leads" className="text-sm text-primary hover:underline">Manage Lead Ecosystem →</Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROW 5: Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Providers This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="grid grid-cols-12 text-xs font-semibold text-muted-foreground pb-2 border-b uppercase">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Provider</div>
                <div className="col-span-2 text-center">Sold</div>
                <div className="col-span-2 text-right">Rev</div>
                <div className="col-span-2 text-right">Appr%</div>
              </div>
              {topProviders.map((p) => (
                <div key={p.rank} className="grid grid-cols-12 items-center py-2 border-b last:border-0 text-sm">
                  <div className="col-span-1 font-bold text-muted-foreground">{p.rank}</div>
                  <div className="col-span-5 font-medium truncate">{p.name}</div>
                  <div className="col-span-2 text-center">{p.sold}</div>
                  <div className="col-span-2 text-right text-emerald-600 dark:text-emerald-400 font-medium">{p.revenue}</div>
                  <div className="col-span-2 text-right text-muted-foreground">{p.approvalRate}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Buyers This Month</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-1">
              <div className="grid grid-cols-12 text-xs font-semibold text-muted-foreground pb-2 border-b uppercase">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Buyer</div>
                <div className="col-span-3 text-center">Purchased</div>
                <div className="col-span-3 text-right">Spent</div>
              </div>
              {topBuyers.map((b) => (
                <div key={b.rank} className="grid grid-cols-12 items-center py-2 border-b last:border-0 text-sm">
                  <div className="col-span-1 font-bold text-muted-foreground">{b.rank}</div>
                  <div className="col-span-5 font-medium truncate pr-2">
                    <p>{b.name}</p>
                    <span className="text-[9px] bg-maya-blue/10 text-maya-blue px-1 py-0.5 rounded font-bold">{b.tier}</span>
                  </div>
                  <div className="col-span-3 text-center">{b.purchased}</div>
                  <div className="col-span-3 text-right font-medium">{b.spent}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROW 6: Quick Admin Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Button asChild variant="outline" className="h-14 flex flex-col items-center justify-center gap-1 group">
          <Link to="/admin/users?status=pending">
            <Users className="h-4 w-4 group-hover:text-amber-500" />
            <span className="text-xs">User Approvals</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-14 flex flex-col items-center justify-center gap-1 group">
          <Link to="/admin/leads/review">
            <Grid className="h-4 w-4 group-hover:text-amber-500" />
            <span className="text-xs">Lead Approvals</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-14 flex flex-col items-center justify-center gap-1 group">
          <Link to="/admin/leads/new">
            <PlusCircle className="h-4 w-4 group-hover:text-primary" />
            <span className="text-xs">Add Lead</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-14 flex flex-col items-center justify-center gap-1 group">
          <Link to="/admin/payouts">
            <DollarSign className="h-4 w-4 group-hover:text-emerald-500" />
            <span className="text-xs">Process Payouts</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-14 flex flex-col items-center justify-center gap-1 group">
          <Link to="/admin/delivery-logs?status=failed">
            <AlertCircle className="h-4 w-4 group-hover:text-rose-500" />
            <span className="text-xs">Failed Deliveries</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-14 flex flex-col items-center justify-center gap-1 group">
          <Link to="/admin/settings">
            <Settings className="h-4 w-4 group-hover:text-muted-foreground" />
            <span className="text-xs">Platform Settings</span>
          </Link>
        </Button>
      </div>

    </div>
  );
}
