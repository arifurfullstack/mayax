import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, PlusCircle, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { ServerPagination } from '@/components/shared/ServerPagination';

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const from = (currentPage - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from('leads')
      .select('id, reference_code, full_name, price, quality_grade, ai_score, review_status, sold_status, listed_by_role, created_at', { count: 'exact' });

    if (search.trim()) {
      query = query.or(`reference_code.ilike.%${search.trim()}%,full_name.ilike.%${search.trim()}%`);
    }

    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data, error, count } = await query;

    if (error) {
      toast.error(error.message);
    } else {
      setLeads(data || []);
      setTotalCount(count || 0);
    }
    setLoading(false);
  }, [currentPage, pageSize, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeads();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchLeads]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead? This cannot be undone.')) return;
    setLoading(true);
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Lead deleted');
      fetchLeads();
    }
    setLoading(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">All Leads</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage all leads in the platform database.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64 min-w-[200px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search ref or name..."
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9"
            />
          </div>
          <Button onClick={() => navigate('/admin/leads/new')} className="bg-maya-green hover:bg-maya-green/90 text-maya-green-foreground shrink-0">
            <PlusCircle className="h-4 w-4 mr-2" />Add Lead
          </Button>
        </div>
      </div>

      <div className="bg-card text-card-foreground rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
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
              ) : leads.length === 0 ? (
                <TableRow><TableCell colSpan={8} className="text-center py-12 text-muted-foreground">No leads found.</TableCell></TableRow>
              ) : leads.map(l => (
                <TableRow key={l.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono text-xs sm:text-sm font-medium">{l.reference_code}</TableCell>
                  <TableCell className="font-medium">{l.full_name || 'N/A'}</TableCell>
                  <TableCell><Badge variant="outline" className="capitalize">{l.listed_by_role}</Badge></TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold">${Number(l.price || 0).toFixed(2)}</span>
                      <span className="text-xs text-muted-foreground">Grade {l.quality_grade} (AI: {l.ai_score})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      l.review_status === 'approved' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' :
                      l.review_status === 'rejected' ? 'bg-destructive/10 text-destructive border-destructive/20' :
                      'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                    }>
                      {l.review_status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {l.sold_status === 'sold' ? (
                      <Badge variant="outline" className="bg-maya-green/10 text-maya-green border-maya-green/20">Sold</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">Available</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs sm:text-sm">{new Date(l.created_at).toLocaleDateString()}</TableCell>
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
        <ServerPagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={pageSize}
          isLoading={loading}
          onPageChange={setCurrentPage}
          onPageSizeChange={size => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
}
