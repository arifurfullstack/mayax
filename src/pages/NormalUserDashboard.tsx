import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, ShieldCheck, ShoppingBag, Grid, Receipt, PlusCircle, Search, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function NormalUserDashboard() {
  const { normalUser } = useAuth();
  
  // Mock data for Normal User
  const walletBalance = 450.00;
  const leadsPurchased = 12;
  const availableLeads = 47;
  const spendingThisMonth = 340.00;
  
  const recentPurchases = [
    { ref: 'MLH-1042', initials: 'MG', type: 'Online', price: '$85.00', date: 'Mar 28, 2026', status: 'Sent' },
    { ref: 'MLH-1041', initials: 'RJ', type: 'In-Store', price: '$85.00', date: 'Mar 25, 2026', status: 'Sent' },
    { ref: 'MLH-1038', initials: 'AW', type: 'Online', price: '$85.00', date: 'Mar 20, 2026', status: 'Sent' },
    { ref: 'MLH-1035', initials: 'KL', type: 'Online', price: '$85.00', date: 'Mar 15, 2026', status: 'Sent' },
  ];

  const spendingData = [
    { name: 'Week 1', amount: 85 },
    { name: 'Week 2', amount: 170 },
    { name: 'Week 3', amount: 0 },
    { name: 'Week 4', amount: 85 },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      {/* ROW 1: Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available Balance</CardTitle>
            <Wallet className="h-5 w-5 text-maya-green" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${walletBalance.toFixed(2)}</p>
            <Link to="/individual/wallet" className="text-sm text-maya-green hover:underline mt-1 inline-block">Add Funds →</Link>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/30">
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">My Plan</CardTitle>
            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-muted-foreground">BASIC</p>
            <p className="text-xs text-muted-foreground mt-1">24-hour lead access delay</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leads Purchased</CardTitle>
            <ShoppingBag className="h-5 w-5 text-maya-blue" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{leadsPurchased}</p>
            <p className="text-xs text-green-500 font-medium mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +3 this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available Leads</CardTitle>
            <Grid className="h-5 w-5 text-maya-steel" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{availableLeads}</p>
            <Link to="/individual/marketplace" className="text-sm text-maya-steel hover:underline mt-1 inline-block">Browse Marketplace →</Link>
          </CardContent>
        </Card>
      </div>

      {/* ROW 2: Recent Purchases & Spending */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 gap-y-6">
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Recent Purchases</CardTitle>
              <CardDescription>Your latest acquired leads</CardDescription>
            </div>
            <Link to="/individual/purchases" className="text-sm text-primary hover:underline">View All →</Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-md">Reference</th>
                    <th className="px-4 py-3">Initials</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 rounded-tr-md">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPurchases.map((purchase, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/20">
                      <td className="px-4 py-3 font-medium">{purchase.ref}</td>
                      <td className="px-4 py-3">{purchase.initials}</td>
                      <td className="px-4 py-3">
                        <span className="bg-secondary/50 text-secondary-foreground px-2 py-1 rounded-md text-xs">
                          {purchase.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">{purchase.price}</td>
                      <td className="px-4 py-3 text-muted-foreground">{purchase.date}</td>
                      <td className="px-4 py-3">
                        <span className="bg-emerald-500/10 text-emerald-600 px-2 py-1 rounded-full text-xs font-medium">
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

        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Spending This Month</CardTitle>
            <CardDescription>Total spent on leads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-3xl font-bold">${spendingThisMonth.toFixed(2)}</p>
            </div>
            <div className="h-[140px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={spendingData}>
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                  <Bar dataKey="amount" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 pt-4 border-t flex justify-between text-sm text-muted-foreground">
              <span>Leads bought: 4</span>
              <span>Avg cost: $85.00</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROW 3: Quick Actions */}
      <h2 className="text-xl font-bold pt-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-maya-steel/10 rounded-full">
              <Search className="h-8 w-8 text-maya-steel" />
            </div>
            <div>
              <h3 className="font-semibold">Browse Marketplace</h3>
              <p className="text-sm text-muted-foreground mt-1">Find and buy verified automotive leads</p>
            </div>
            <Button asChild className="w-full bg-maya-steel hover:bg-maya-steel/90 mt-2">
              <Link to="/individual/marketplace">Browse Marketplace</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-maya-green/10 rounded-full">
              <PlusCircle className="h-8 w-8 text-maya-green" />
            </div>
            <div>
              <h3 className="font-semibold">Add Funds to Wallet</h3>
              <p className="text-sm text-muted-foreground mt-1">Top up your balance to purchase leads</p>
            </div>
            <Button asChild variant="outline" className="w-full mt-2 border-maya-green text-maya-green hover:bg-maya-green/10">
              <Link to="/individual/wallet">Add Funds</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Receipt className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">View Purchase History</h3>
              <p className="text-sm text-muted-foreground mt-1">See all leads you've purchased</p>
            </div>
            <Button asChild variant="outline" className="w-full mt-2">
              <Link to="/individual/purchases">View History</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
