import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Search, Eye, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface ProviderLead {
  id: string;
  reference_code: string;
  initials: string;
  buyer_type: string;
  price: number;
  quality_grade: string;
  review_status: string;
  sold_status: string;
  provider_payout_amount: number | null;
  created_at: string;
  sold_at: string | null;
}

const statusColors: Record<string, string> = {
  pending_review: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400',
  approved: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400',
  rejected: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400',
};

const statusLabels: Record<string, string> = {
  pending_review: 'Pending Review',
  approved: 'Live',
  rejected: 'Rejected',
};

type FilterType = 'all' | 'pending_review' | 'approved' | 'sold' | 'rejected';

export default function ProviderLeads() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [leads, setLeads] = useState<ProviderLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('id, reference_code, initials, buyer_type, price, quality_grade, review_status, sold_status, provider_payout_amount, created_at, sold_at')
      .eq('listed_by_id', user?.id)
      .eq('listed_by_role', 'provider')
      .order('created_at', { ascending: false });

    if (error) { toast.error(error.message); }
    else { setLeads((data || []) as ProviderLead[]); }
    setLoading(false);
  };

  useEffect(() => { if (user) fetchLeads(); }, [user]);

  const filteredLeads = leads.filter(l => {
    const q = search.toLowerCase();
    const matchesSearch = !q || l.reference_code.toLowerCase().includes(q) || l.initials.toLowerCase().includes(q);
    const matchesFilter = filter === 'all'
      ? true
      : filter === 'sold'
        ? l.sold_status === 'sold'
        : l.review_status === filter;
    return matchesSearch && matchesFilter;
  });

  const counts = {
    all: leads.length,
    pending_review: leads.filter(l => l.review_status === 'pending_review').length,
    approved: leads.filter(l => l.review_status === 'approved' && l.sold_status === 'available').length,
    sold: leads.filter(l => l.sold_status === 'sold').length,
    rejected: leads.filter(l => l.review_status === 'rejected').length,
  };

  const filterTabs: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'pending_review', label: 'Pending Review' },
    { key: 'approved', label: 'Live' },
    { key: 'sold', label: 'Sold' },
    { key: 'rejected', label: 'Rejected' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Leads</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{leads.length} total leads submitted</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchLeads} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => navigate('/provider/leads/new')} className="bg-maya-green hover:bg-maya-green/90 text-maya-green-foreground">
            <PlusCircle className="h-4 w-4 mr-1.5" />Add Lead
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Submitted', value: counts.all, color: 'text-foreground' },
          { label: 'Pending Review', value: counts.pending_review, color: 'text-amber-600' },
          { label: 'Live in Market', value: counts.approved, color: 'text-emerald-600' },
          { label: 'Sold', value: counts.sold, color: 'text-maya-green' },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-xl border p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`text-2xl font-bold mt-0.5 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs + search */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="flex gap-1 flex-wrap">
          {filterTabs.map(t => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                filter === t.key
                  ? 'bg-maya-navy text-white shadow-sm'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.label}
              <span className={`ml-1.5 text-xs font-bold ${filter === t.key ? 'opacity-70' : 'opacity-50'}`}>
                {counts[t.key]}
              </span>
            </button>
          ))}
        </div>
        <div className="relative sm:ml-auto">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search reference or initials..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 h-8 text-xs w-full sm:w-56"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead>Initials</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Payout</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={8} className="text-center py-12 text-muted-foreground">Loading leads...</TableCell></TableRow>
            ) : filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12">
                  <div className="space-y-2">
                    <p className="text-muted-foreground">No leads found</p>
                    {leads.length === 0 && (
                      <Button size="sm" onClick={() => navigate('/provider/leads/new')} className="bg-maya-green hover:bg-maya-green/90 text-maya-green-foreground">
                        Submit Your First Lead
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredLeads.map(l => (
              <TableRow key={l.id} className="hover:bg-muted/30">
                <TableCell className="font-mono text-xs font-medium">{l.reference_code}</TableCell>
                <TableCell>
                  <div className="w-8 h-8 rounded-full bg-maya-navy/10 flex items-center justify-center text-xs font-bold text-maya-navy">
                    {l.initials}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs capitalize">
                    {l.buyer_type === 'in_store' ? 'In-Store' : 'Online'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-sm">{l.quality_grade}</span>
                </TableCell>
                <TableCell className="font-semibold">${l.price.toFixed(2)}</TableCell>
                <TableCell>
                  {l.sold_status === 'sold' ? (
                    <Badge variant="outline" className="bg-maya-green/10 text-maya-green border-maya-green/20 text-xs">Sold</Badge>
                  ) : (
                    <Badge variant="outline" className={`text-xs ${statusColors[l.review_status] || ''}`}>
                      {statusLabels[l.review_status] || l.review_status}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {new Date(l.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {l.provider_payout_amount != null ? (
                    <span className="text-sm font-semibold text-maya-green">${l.provider_payout_amount.toFixed(2)}</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
