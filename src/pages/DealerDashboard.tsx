import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, ShoppingBag, Crown, Grid, Clock, CheckCircle2, AlertCircle, XCircle, Search, ArrowUpRight, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function DealerDashboard() {
  const { dealer } = useAuth();
  
  // Mock data for Dealer
  const walletBalance = dealer?.wallet_balance ?? 1725.00;
  const plan = dealer?.subscription_tier || 'pro';
  const leadsPurchased = 47;
  const availableLeads = 156;
  const unlockingSoon = 23;
  const spendingTotal = 2340.00;

  const isLowBalance = walletBalance < 100;
  
  const recentPurchases = [
    { ref: 'MLH-1042', initials: 'MG', type: 'Online', credit: '620-680', price: '$85.00', date: 'Mar 28, 2026', method: 'Webhook', status: 'Sent' },
    { ref: 'MLH-1041', initials: 'RJ', type: 'In-Store', credit: '700+', price: '$100.00', date: 'Mar 27, 2026', method: 'Email', status: 'Sent' },
    { ref: 'MLH-1038', initials: 'AW', type: 'Online', credit: '500-600', price: '$45.00', date: 'Mar 26, 2026', method: 'Both', status: 'Pending' },
    { ref: 'MLH-1035', initials: 'KL', type: 'Online', credit: '680-720', price: '$95.00', date: 'Mar 25, 2026', method: 'Webhook', status: 'Failed' },
  ];

  const deliveryLogs = [
    { ref: 'MLH-1042', time: '10 mins ago', status: 'Success', icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />, isError: false },
    { ref: 'MLH-1041', time: '45 mins ago', status: 'Success', icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />, isError: false },
    { ref: 'MLH-1038', time: '2 hours ago', status: 'Pending', icon: <Clock className="h-4 w-4 text-amber-500" />, isError: false },
    { ref: 'MLH-1035', time: '5 hours ago', status: 'Failed', icon: <XCircle className="h-4 w-4 text-rose-500" />, isError: true },
  ];

  const spendingData = [
    { name: 'Mon', amount: 340 },
    { name: 'Tue', amount: 170 },
    { name: 'Wed', amount: 85 },
    { name: 'Thu', amount: 425 },
    { name: 'Fri', amount: 510 },
    { name: 'Sat', amount: 0 },
    { name: 'Sun', amount: 85 },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dealer Dashboard</h1>
      </div>

      {deliveryLogs.some(l => l.isError) && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-rose-500 mr-3" />
            <span className="text-sm text-rose-700 dark:text-rose-400 font-medium">⚠️ 1 delivery failed recently. Check your webhook settings.</span>
          </div>
          <Button variant="outline" size="sm" asChild className="border-rose-200 text-rose-700 hover:bg-rose-50 dark:border-rose-900 dark:text-rose-400 dark:hover:bg-rose-900/50">
            <Link to="/settings?tab=crm">Settings</Link>
          </Button>
        </div>
      )}

      {/* ROW 1: Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className={`${isLowBalance ? 'border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : ''}`}>
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available Balance</CardTitle>
            <Wallet className={`h-5 w-5 ${isLowBalance ? 'text-amber-500' : 'text-maya-green'}`} />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${walletBalance.toFixed(2)}</p>
            {isLowBalance ? (
              <p className="text-xs text-amber-500 font-medium mt-1">Low balance</p>
            ) : (
              <Link to="/wallet" className="text-sm text-maya-green hover:underline mt-1 inline-block">Add Funds →</Link>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Plan</CardTitle>
            <Crown className="h-5 w-5 text-maya-gold" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="bg-maya-blue/20 text-maya-blue px-2 py-0.5 rounded text-sm font-bold uppercase">{plan}</span>
            </div>
            <Link to="/upgrade-plan" className="text-xs text-muted-foreground hover:underline mt-1 inline-block">Upgrade Plan →</Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leads Purchased</CardTitle>
            <ShoppingBag className="h-5 w-5 text-maya-blue" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{leadsPurchased}</p>
            <p className="text-xs text-emerald-500 font-medium mt-1">↑ +8 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available Leads</CardTitle>
            <Grid className="h-5 w-5 text-maya-steel" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{availableLeads}</p>
            <Link to="/marketplace" className="text-xs text-muted-foreground hover:underline mt-1 inline-block">Browse Marketplace →</Link>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-primary">Unlocking Soon</CardTitle>
            <Clock className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{unlockingSoon}</p>
            <Link to="/upgrade-plan" className="text-xs text-primary hover:underline mt-1 inline-block font-medium">Upgrade to access now →</Link>
          </CardContent>
        </Card>
      </div>

      {/* ROW 2: Recent Purchases & Delivery Health */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 gap-y-6">
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Recent Purchases</CardTitle>
              <CardDescription>Your latest acquisitions</CardDescription>
            </div>
            <Link to="/purchases" className="text-sm text-primary hover:underline">View All →</Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-md">Lead</th>
                    <th className="px-4 py-3">Credit</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Method</th>
                    <th className="px-4 py-3 rounded-tr-md">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPurchases.map((purchase, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/20">
                      <td className="px-4 py-3">
                        <p className="font-medium">{purchase.ref}</p>
                        <p className="text-xs text-muted-foreground">{purchase.initials} • {purchase.type}</p>
                      </td>
                      <td className="px-4 py-3">{purchase.credit}</td>
                      <td className="px-4 py-3 font-medium">{purchase.price}</td>
                      <td className="px-4 py-3 text-xs">{purchase.method}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          purchase.status === 'Sent' ? 'bg-emerald-500/10 text-emerald-600' :
                          purchase.status === 'Failed' ? 'bg-rose-500/10 text-rose-600' : 'bg-amber-500/10 text-amber-600'
                        }`}>
                          {purchase.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle>Delivery Health</CardTitle>
            <CardDescription>Recent webhook & email status</CardDescription>
            <div className="flex gap-2 mt-2">
              <span className="bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded text-xs font-medium">✅ 42 Delivered</span>
              <span className="bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded text-xs font-medium">⏳ 2 Pending</span>
              <span className="bg-rose-500/10 text-rose-600 px-2 py-0.5 rounded text-xs font-medium">❌ 3 Failed</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-4">
              {deliveryLogs.map((log, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    {log.icon}
                    <div>
                      <p className="font-medium">{log.ref}</p>
                      <p className="text-xs text-muted-foreground">{log.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={log.isError ? 'text-rose-500' : 'text-emerald-500'}>{log.status}</span>
                    {log.isError && <button className="text-xs text-primary hover:underline ml-2">Retry</button>}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t text-center">
              <Link to="/purchases" className="text-sm text-primary hover:underline">View All Delivery Logs →</Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROW 3: Spending & Subscription */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Spending Overview</CardTitle>
              <select className="text-sm bg-transparent border-none text-muted-foreground outline-none cursor-pointer">
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[180px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={spendingData}>
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                  <Bar dataKey="amount" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t text-sm">
              <div>
                <p className="text-muted-foreground">Total spent</p>
                <p className="font-semibold">${spendingTotal.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Avg cost per lead</p>
                <p className="font-semibold">$83.57</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Your Subscription</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="p-4 border rounded-xl bg-muted/10 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-maya-blue text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">{plan} TIER</span>
                  <p className="text-2xl font-bold mt-2">$299<span className="text-sm text-muted-foreground font-normal">/month</span></p>
                </div>
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 12-hour lead access delay</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Webhook integration</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Batch purchasing</li>
              </ul>
              <p className="text-xs text-muted-foreground pt-2 border-t mt-2">Active — renews Apr 15, 2026</p>
            </div>
            <div className="flex gap-3 mt-6">
              <Button asChild className="flex-1 bg-maya-green hover:bg-maya-green/90 text-white">
                <Link to="/upgrade-plan">Upgrade Plan</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link to="/wallet">Manage Billing</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROW 4: Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-all group cursor-pointer" onClick={() => window.location.href = '/marketplace'}>
          <CardContent className="p-4 flex gap-3 items-center">
            <div className="p-2 bg-maya-steel/10 rounded-lg group-hover:bg-maya-steel/20 transition-colors">
              <Search className="h-5 w-5 text-maya-steel" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">Marketplace</h3>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all group cursor-pointer" onClick={() => window.location.href = '/upgrade-plan'}>
          <CardContent className="p-4 flex gap-3 items-center">
            <div className="p-2 bg-maya-gold/10 rounded-lg group-hover:bg-maya-gold/20 transition-colors">
              <Crown className="h-5 w-5 text-maya-gold" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">Upgrade Plan</h3>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all group cursor-pointer" onClick={() => window.location.href = '/wallet'}>
          <CardContent className="p-4 flex gap-3 items-center">
            <div className="p-2 bg-maya-green/10 rounded-lg group-hover:bg-maya-green/20 transition-colors">
              <Wallet className="h-5 w-5 text-maya-green" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">Add Funds</h3>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all group cursor-pointer" onClick={() => window.location.href = '/settings?tab=crm'}>
          <CardContent className="p-4 flex gap-3 items-center">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Settings className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">Webhooks</h3>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
