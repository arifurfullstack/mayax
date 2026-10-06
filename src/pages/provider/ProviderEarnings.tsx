import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, TrendingUp, Clock, Package, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface EarningRow {
  id: string;
  reference_code: string;
  price: number;
  provider_payout_amount: number | null;
  provider_payout_status: string | null;
  sold_at: string | null;
  quality_grade: string;
}

export default function ProviderEarnings() {
  const { user, provider, refreshProfile } = useAuth();
  const [earnings, setEarnings] = useState<EarningRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEarnings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('id, reference_code, price, provider_payout_amount, provider_payout_status, sold_at, quality_grade')
      .eq('listed_by_id', user?.id)
      .eq('sold_status', 'sold')
      .order('sold_at', { ascending: false });
    if (error) toast.error(error.message);
    else setEarnings((data || []) as EarningRow[]);
    setLoading(false);
  };

  useEffect(() => { if (user) fetchEarnings(); }, [user]);

  const thisMonth = earnings.filter(e => {
    if (!e.sold_at) return false;
    const d = new Date(e.sold_at);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).reduce((s, e) => s + (e.provider_payout_amount ?? 0), 0);

  const commissionRate = provider?.commission_rate ?? 0.20;
  const platformFeeLabel = `${Math.round(commissionRate * 100)}% platform fee`;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Earnings</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Track your lead sales and payouts</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchEarnings} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-1.5 ${loading ? 'animate-spin' : ''}`} />Refresh
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: DollarSign, label: 'Total Earnings', color: 'text-maya-green bg-maya-green/10',
            value: `$${(provider?.total_earnings ?? 0).toFixed(2)}`,
          },
          {
            icon: TrendingUp, label: 'This Month', color: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30',
            value: `$${thisMonth.toFixed(2)}`,
          },
          {
            icon: Clock, label: 'Pending Payout', color: 'text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30',
            value: `$${(provider?.pending_payout ?? 0).toFixed(2)}`,
          },
          {
            icon: Package, label: 'Leads Sold', color: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30',
            value: earnings.length.toString(),
          },
        ].map(c => (
          <div key={c.label} className="bg-card rounded-xl border p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${c.color}`}>
              <c.icon className="h-5 w-5" />
            </div>
            <p className="text-xs text-muted-foreground">{c.label}</p>
            <p className="text-2xl font-bold mt-0.5">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Commission info */}
      <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
        <DollarSign className="h-4 w-4 text-maya-green" />
        <span>Your commission rate: <strong className="text-foreground">{Math.round((1 - commissionRate) * 100)}% of sale price</strong> ({platformFeeLabel} deducted). You earn ${((1 - commissionRate) * 100).toFixed(0)} per $100 lead sale.</span>
      </div>

      {/* Earnings table */}
      <div className="bg-card text-card-foreground rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead>Lead Ref</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Sale Price</TableHead>
                <TableHead>Platform Fee</TableHead>
                <TableHead>Your Payout</TableHead>
                <TableHead>Date Sold</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={7} className="text-center py-12 text-muted-foreground">Loading earnings...</TableCell></TableRow>
              ) : earnings.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center py-12 text-muted-foreground">No sold leads yet. Start submitting leads to earn!</TableCell></TableRow>
              ) : earnings.map(e => {
                const platformFee = e.price * commissionRate;
                const payout = e.provider_payout_amount ?? (e.price * (1 - commissionRate));
                return (
                  <TableRow key={e.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono text-xs font-medium">{e.reference_code}</TableCell>
                    <TableCell><span className="font-bold">{e.quality_grade}</span></TableCell>
                    <TableCell className="font-semibold">${e.price.toFixed(2)}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">-${platformFee.toFixed(2)}</TableCell>
                    <TableCell className="font-bold text-maya-green">${payout.toFixed(2)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {e.sold_at ? new Date(e.sold_at).toLocaleDateString() : '—'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        e.provider_payout_status === 'paid'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                      }>
                        {e.provider_payout_status === 'paid' ? 'Paid Out' : 'Pending'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Payout request */}
      {(provider?.pending_payout ?? 0) > 0 && (
        <div className="bg-maya-green/5 border border-maya-green/20 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="font-semibold">Request Payout</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              You have <strong className="text-maya-green">${provider?.pending_payout?.toFixed(2)}</strong> available for payout. Admin will process within 3-5 business days.
            </p>
          </div>
          <Button className="bg-maya-green hover:bg-maya-green/90 text-maya-green-foreground">
            Request Payout
          </Button>
        </div>
      )}
    </div>
  );
}
