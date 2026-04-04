import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Globe, Clock, CheckCircle2, DollarSign, Upload, PlusCircle, Settings, PieChart as PieChartIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function ProviderDashboard() {
  // Mock data for Provider
  const totalListed = 284;
  const liveLeads = 42;
  const pendingReview = 7;
  const leadsSold = 235;
  const totalEarnings = 18800.00;
  const earningsThisMonth = 960.00;
  const pendingPayout = 480.00;

  const earningsData = [
    { name: 'Mon', amount: 160 },
    { name: 'Tue', amount: 80 },
    { name: 'Wed', amount: 240 },
    { name: 'Thu', amount: 80 },
    { name: 'Fri', amount: 320 },
    { name: 'Sat', amount: 0 },
    { name: 'Sun', amount: 80 },
  ];

  const statusData = [
    { name: 'Live', value: 42, color: '#10b981' },
    { name: 'Pending Review', value: 7, color: '#f59e0b' },
    { name: 'Sold', value: 235, color: '#3b82f6' },
    { name: 'Rejected', value: 3, color: '#f43f5e' },
  ];

  const recentActivity = [
    { text: 'MLH-2084 was approved by admin', time: '2 hours ago', status: 'approved', icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" /> },
    { text: 'MLH-2081 was purchased by a dealer', time: '5 hours ago', status: 'sold', icon: <DollarSign className="h-4 w-4 text-maya-blue" /> },
    { text: 'MLH-2079 was rejected: Missing credit range data', time: '1 day ago', status: 'rejected', icon: <Clock className="h-4 w-4 text-rose-500" /> },
    { text: 'MLH-2076 submitted for review', time: '1 day ago', status: 'pending', icon: <Clock className="h-4 w-4 text-amber-500" /> },
    { text: 'MLH-2070 was purchased by a dealer', time: '2 days ago', status: 'sold', icon: <DollarSign className="h-4 w-4 text-maya-blue" /> },
  ];

  const recentSales = [
    { ref: 'MLH-2081', grade: 'A', price: '$100.00', commission: '$20.00', earning: '$80.00', date: 'Mar 28', status: 'Pending' },
    { ref: 'MLH-2070', grade: 'B', price: '$80.00', commission: '$16.00', earning: '$64.00', date: 'Mar 26', status: 'Paid' },
    { ref: 'MLH-2065', grade: 'A+', price: '$120.00', commission: '$24.00', earning: '$96.00', date: 'Mar 25', status: 'Paid' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Provider Dashboard</h1>
      </div>

      {/* ROW 1: Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Listed</CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalListed}</p>
            <p className="text-xs text-emerald-500 font-medium mt-1">↑ +18 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex-row items-center justify-between flex-nowrap">
            <CardTitle className="text-sm font-medium text-muted-foreground truncate">Live in Market</CardTitle>
            <div className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 items-center justify-center">
                <Globe className="h-3 w-3 text-white" />
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600">{liveLeads}</p>
            <p className="text-xs text-muted-foreground mt-1">Ready for buyers</p>
          </CardContent>
        </Card>
        
        <Card className={`${pendingReview > 0 ? 'border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.1)]' : ''}`}>
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
            <Clock className={`h-5 w-5 ${pendingReview > 0 ? 'text-amber-500' : 'text-muted-foreground'}`} />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{pendingReview}</p>
            <Link to="/provider/leads?status=pending_review" className={`text-xs ${pendingReview > 0 ? 'text-amber-500' : 'text-muted-foreground'} hover:underline mt-1 inline-block`}>View pending →</Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leads Sold</CardTitle>
            <CheckCircle2 className="h-5 w-5 text-maya-blue" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{leadsSold}</p>
            <p className="text-xs text-emerald-500 font-medium mt-1">↑ +12 this month</p>
          </CardContent>
        </Card>

        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-500">Total Earnings</CardTitle>
            <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">${totalEarnings.toFixed(2)}</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-500 font-medium mt-1">↑ +${earningsThisMonth.toFixed(2)} this month</p>
          </CardContent>
        </Card>
      </div>

      {/* ROW 2: Earnings & Lead Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 gap-y-6">
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Earnings Overview</CardTitle>
              <CardDescription>Your net payouts after 20% commission</CardDescription>
            </div>
            <select className="text-sm bg-transparent border-none text-muted-foreground outline-none cursor-pointer">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={earningsData}>
                  <defs>
                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorEarnings)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t text-sm">
              <div>
                <p className="text-muted-foreground">Month Earnings</p>
                <p className="font-semibold">${earningsThisMonth.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Leads Sold</p>
                <p className="font-semibold">12</p>
              </div>
              <div>
                <p className="text-muted-foreground">Avg per Lead</p>
                <p className="font-semibold">$80.00</p>
              </div>
              <div>
                <p className="text-muted-foreground flex justify-between">Pending Payout</p>
                <p className="font-semibold text-amber-500">${pendingPayout.toFixed(2)}</p>
              </div>
            </div>
            {pendingPayout > 0 && (
              <Button className="w-full mt-4 bg-primary hover:bg-primary/90">Request Payout</Button>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle>Lead Status</CardTitle>
            <CardDescription>Current breakdown of your leads</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-1 items-center justify-center">
            <div className="h-[180px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full grid grid-cols-2 gap-4 mt-4">
              {statusData.map(stat => (
                <div key={stat.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }}></div>
                  <span className="flex-1 text-muted-foreground">{stat.name}</span>
                  <span className="font-mono font-medium">{stat.value}</span>
                </div>
              ))}
            </div>
            <div className="w-full mt-6 pt-4 border-t text-center">
              <Link to="/provider/leads" className="text-sm text-primary hover:underline">Manage All Leads →</Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROW 3: Recent Activity & Recent Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 lg:h-[280px] overflow-auto pr-2">
              {recentActivity.map((act, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-0.5">{act.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none mb-1">{act.text}</p>
                    <p className="text-xs text-muted-foreground">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t text-center">
              <Link to="/provider/activity" className="text-sm text-primary hover:underline">View All Activity →</Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Recent Sales</CardTitle>
            <Link to="/provider/earnings" className="text-sm text-primary hover:underline">View Sales →</Link>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="overflow-x-auto lg:h-[280px]">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                  <tr>
                    <th className="px-3 py-2 rounded-tl-md">Lead</th>
                    <th className="px-3 py-2">Sale Price</th>
                    <th className="px-3 py-2">Your Earning</th>
                    <th className="px-3 py-2 rounded-tr-md">Payout</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSales.map((sale, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/20">
                      <td className="px-3 py-3">
                        <p className="font-medium">{sale.ref}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Grade: {sale.grade}</p>
                      </td>
                      <td className="px-3 py-3 text-muted-foreground">{sale.price}</td>
                      <td className="px-3 py-3 font-semibold text-emerald-600 dark:text-emerald-400">{sale.earning}</td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                          sale.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                        }`}>
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROW 4: Performance & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Performance</CardTitle>
            <CardDescription>Key metrics for your listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-muted/20">
                <p className="text-sm text-muted-foreground">Approval Rate</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">96%</p>
              </div>
              <div className="p-4 border rounded-lg bg-muted/20">
                <p className="text-sm text-muted-foreground">Avg. Time to Sell</p>
                <p className="text-2xl font-bold mt-1">4.2 hours</p>
              </div>
              <div className="p-4 border rounded-lg bg-muted/20">
                <p className="text-sm text-muted-foreground">Top Quality Listed</p>
                <p className="text-2xl font-bold mt-1">A Grade</p>
              </div>
              <div className="p-4 border rounded-lg bg-muted/20">
                <p className="text-sm text-muted-foreground">Repeat Buyer Rate</p>
                <p className="text-2xl font-bold text-maya-blue mt-1">38%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="hover:shadow-md transition-all group cursor-pointer" onClick={() => window.location.href = '/provider/leads/new'}>
            <CardContent className="p-5 flex flex-col gap-3 h-full justify-center">
              <div className="p-2 w-10 h-10 bg-maya-green/10 rounded-lg group-hover:bg-maya-green/20 transition-colors flex items-center justify-center">
                <PlusCircle className="h-5 w-5 text-maya-green" />
              </div>
              <div>
                <h3 className="font-semibold">Add New Lead</h3>
                <p className="text-xs text-muted-foreground mt-1">Submit a lead for review</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-all group cursor-pointer" onClick={() => window.location.href = '/provider/leads/import'}>
            <CardContent className="p-5 flex flex-col gap-3 h-full justify-center">
              <div className="p-2 w-10 h-10 bg-maya-blue/10 rounded-lg group-hover:bg-maya-blue/20 transition-colors flex items-center justify-center">
                <Upload className="h-5 w-5 text-maya-blue" />
              </div>
              <div>
                <h3 className="font-semibold">Bulk Import</h3>
                <p className="text-xs text-muted-foreground mt-1">Upload CSV or JSON file</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-all group cursor-pointer" onClick={() => window.location.href = '/provider/earnings'}>
            <CardContent className="p-5 flex flex-col gap-3 h-full justify-center">
              <div className="p-2 w-10 h-10 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">View Earnings</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-all group cursor-pointer" onClick={() => window.location.href = '/provider/settings'}>
            <CardContent className="p-5 flex flex-col gap-3 h-full justify-center">
              <div className="p-2 w-10 h-10 bg-muted rounded-lg group-hover:bg-muted/80 transition-colors flex items-center justify-center">
                <Settings className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Edit Settings</h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
}
