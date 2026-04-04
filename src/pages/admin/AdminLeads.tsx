import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, PlusCircle, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('id, reference_code, full_name, price, quality_grade, ai_score, review_status, sold_status, listed_by_role, created_at')
      .order('created_at', { ascending: false });
    
    if (error) toast.error(error.message);
    else setLeads(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead? This cannot be undone.')) return;
    setLoading(true);
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) toast.error(error.message);
    else { toast.success('Lead deleted'); fetchLeads(); }
    setLoading(false);
  };

  const filtered = leads.filter(l => 
    !search || 
    l.reference_code.toLowerCase().includes(search.toLowerCase()) || 
    l.full_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">All Leads</h1>
          <p className="text-muted-foreground mt-1">Manage all leads in the platform database.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search ref code or name..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Button onClick={() => navigate('/admin/leads/new')} className="bg-maya-green hover:bg-maya-green/90 text-maya-green-foreground">
            <PlusCircle className="h-4 w-4 mr-2" />Add Lead
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Price / Grade</TableHead>
              <TableHead>Review Status</TableHead>
              <TableHead>Sales Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={8} className="text-center py-12 text-muted-foreground">Loading leads...</TableCell></TableRow>
            ) : filtered.length === 0 ? (
              <TableRow><TableCell colSpan={8} className="text-center py-12 text-muted-foreground">No leads found.</TableCell></TableRow>
            ) : filtered.map(l => (
              <TableRow key={l.id}>
                <TableCell className="font-mono text-sm font-medium">{l.reference_code}</TableCell>
                <TableCell>{l.full_name}</TableCell>
                <TableCell><Badge variant="outline" className="capitalize">{l.listed_by_role}</Badge></TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold">${l.price.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground">Grade {l.quality_grade} (AI: {l.ai_score})</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    l.review_status === 'approved' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                    l.review_status === 'rejected' ? 'bg-red-100 text-red-800 border-red-200' :
                    'bg-amber-100 text-amber-800 border-amber-200'
                  }>
                    {l.review_status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {l.sold_status === 'sold' ? (
                    <Badge variant="outline" className="bg-maya-green/10 text-maya-green border-maya-green/20">Sold</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Available</Badge>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{new Date(l.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/admin/leads/${l.id}/edit`)}><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(l.id)} className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
