import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RefreshCw, CheckCircle2, XCircle, Search } from 'lucide-react';
import { toast } from 'sonner';

interface PendingLead {
  id: string;
  reference_code: string;
  initials: string;
  price: number;
  quality_grade: string;
  ai_score: number;
  created_at: string;
  provider_id: string;
  provider_profiles: {
    company_name: string;
    commission_rate: number;
  };
  review_status: string;
}

export default function AdminLeadReview() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<PendingLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Review actions
  const [selectedLead, setSelectedLead] = useState<PendingLead | null>(null);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  
  // Edit form for review
  const [editPrice, setEditPrice] = useState('');
  const [editGrade, setEditGrade] = useState('');
  const [rejectReason, setRejectReason] = useState('');

  const fetchPendingLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('*, provider_profiles!listed_by_id(company_name, commission_rate)')
      .eq('review_status', 'pending_review')
      .order('created_at', { ascending: false });
    
    if (error) toast.error(error.message);
    else setLeads((data || []) as any[]);
    setLoading(false);
  };

  useEffect(() => { fetchPendingLeads(); }, []);

  const openApprove = (lead: PendingLead) => {
    setSelectedLead(lead);
    setEditPrice(lead.price.toString());
    setEditGrade(lead.quality_grade);
    setIsApproveOpen(true);
  };

  const openReject = (lead: PendingLead) => {
    setSelectedLead(lead);
    setRejectReason('');
    setIsRejectOpen(true);
  };

  const handleApprove = async () => {
    if (!selectedLead || !user) return;
    setLoading(true);
    
    const { error } = await supabase.from('leads').update({
      review_status: 'approved',
      price: Number(editPrice),
      quality_grade: editGrade,
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
      approved_at: new Date().toISOString()
    }).eq('id', selectedLead.id);
    
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    
    toast.success('Lead approved and goes live immediately');
    setIsApproveOpen(false);
    fetchPendingLeads();
  };

  const handleReject = async () => {
    if (!selectedLead || !user) return;
    if (!rejectReason.trim()) { toast.error('Please provide a reason'); return; }
    
    setLoading(true);
    const { error } = await supabase.from('leads').update({
      review_status: 'rejected',
      review_notes: rejectReason,
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString()
    }).eq('id', selectedLead.id);
    
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    
    toast.success('Lead rejected');
    setIsRejectOpen(false);
    fetchPendingLeads();
  };

  const filtered = leads.filter(l => 
    !search || 
    l.reference_code.toLowerCase().includes(search.toLowerCase()) || 
    l.provider_profiles?.company_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            Lead Review
            {leads.length > 0 && (
              <Badge className="bg-maya-gold hover:bg-maya-gold text-maya-navy rounded-full text-sm w-7 h-7 flex items-center justify-center p-0">
                {leads.length}
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground mt-1">Review and approve leads submitted by providers.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Button variant="outline" size="icon" onClick={fetchPendingLeads} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="bg-card text-card-foreground rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Suggested Price</TableHead>
              <TableHead>Grade / AI</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center py-12 text-muted-foreground">Loading pending leads...</TableCell></TableRow>
            ) : filtered.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-12 text-muted-foreground">No leads pending review.</TableCell></TableRow>
            ) : filtered.map(l => (
              <TableRow key={l.id}>
                <TableCell className="font-mono text-sm font-medium">{l.reference_code}</TableCell>
                <TableCell>{l.provider_profiles?.company_name}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{new Date(l.created_at).toLocaleString()}</TableCell>
                <TableCell className="font-medium">${l.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{l.quality_grade}</span>
                    <Badge variant="outline" className="text-xs">AI: {l.ai_score}</Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50" onClick={() => openApprove(l)}>
                    <CheckCircle2 className="h-4 w-4 mr-1.5" />Review & Approve
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50" onClick={() => openReject(l)}>
                    <XCircle className="h-4 w-4 mr-1.5" />Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </div>

      {/* APPROVE DIALOG */}
      <Dialog open={isApproveOpen} onOpenChange={setIsApproveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Lead</DialogTitle>
            <DialogDescription>
              Adjust the price and quality grade before pushing this lead live to the marketplace.
            </DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm bg-muted/50 p-3 rounded-md">
                <div><span className="text-muted-foreground block">Reference</span><span className="font-mono font-medium">{selectedLead.reference_code}</span></div>
                <div><span className="text-muted-foreground block">Provider</span><span className="font-medium">{selectedLead.provider_profiles?.company_name}</span></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Marketplace Price ($)</Label>
                  <Input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)} step="0.01" />
                </div>
                <div>
                  <Label>Quality Grade</Label>
                  <Input value={editGrade} onChange={e => setEditGrade(e.target.value.toUpperCase())} maxLength={2} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Provider commission is {Math.round(selectedLead.provider_profiles?.commission_rate * 100)}% (You keep {Math.round((1 - selectedLead.provider_profiles?.commission_rate) * 100)}%). They will earn ~${(Number(editPrice) * (1 - selectedLead.provider_profiles?.commission_rate)).toFixed(2)} when sold.</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveOpen(false)}>Cancel</Button>
            <Button onClick={handleApprove} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              {loading ? 'Approving...' : 'Approve & Publish'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* REJECT DIALOG */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Reject Lead</DialogTitle>
            <DialogDescription>
              Provide a reason for rejection. This will be visible to the provider.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            <Label>Rejection Reason</Label>
            <Textarea 
              value={rejectReason} 
              onChange={e => setRejectReason(e.target.value)} 
              placeholder="e.g. Incomplete information, low credit score..."
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectOpen(false)}>Cancel</Button>
            <Button onClick={handleReject} disabled={loading || !rejectReason.trim()} variant="destructive">
              {loading ? 'Rejecting...' : 'Reject Lead'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
