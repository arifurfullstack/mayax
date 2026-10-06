import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Search, MoreVertical, CheckCircle2, XCircle, ShieldOff, Building2, Download } from 'lucide-react';
import { toast } from 'sonner';

type Status = 'pending' | 'approved' | 'rejected' | 'suspended';

interface BaseUser {
  id: string; // the auth user id
  email: string;
  created_at: string;
  role: 'dealer' | 'provider' | 'normal_user';
}

interface Dealer extends BaseUser {
  dealership_name: string;
  contact_person: string;
  approval_status: Status;
  subscription_tier: string;
}

interface Provider extends BaseUser {
  company_name: string;
  contact_person: string;
  approval_status: Status;
}

interface NormalUser extends BaseUser {
  full_name: string;
}

const statusColors: Record<Status, string> = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  suspended: 'bg-orange-100 text-orange-800 border-orange-200',
};

export default function AdminUsers() {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [normalUsers, setNormalUsers] = useState<NormalUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Action state
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [actionType, setActionType] = useState<{type: 'approve' | 'reject' | 'suspend', role: 'dealer' | 'provider'} | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const fetchData = async () => {
    setLoading(true);
    
    const [dealersRes, providersRes, normalUsersRes] = await Promise.all([
      supabase.from('dealers').select('id:user_id, email, created_at, dealership_name, contact_person, approval_status, subscription_tier').order('created_at', { ascending: false }),
      supabase.from('provider_profiles').select('id, email, created_at, company_name, contact_person, approval_status').order('created_at', { ascending: false }),
      supabase.from('normal_user_profiles').select('id, email, created_at, full_name').order('created_at', { ascending: false })
    ]);

    if (dealersRes.error) toast.error(dealersRes.error.message);
    else setDealers(dealersRes.data.map(d => ({ ...d, role: 'dealer' } as Dealer)));

    if (providersRes.error) toast.error(providersRes.error.message);
    else setProviders(providersRes.data.map(p => ({ ...p, role: 'provider' } as Provider)));

    if (normalUsersRes.error) toast.error(normalUsersRes.error.message);
    else setNormalUsers(normalUsersRes.data.map(n => ({ ...n, role: 'normal_user' } as NormalUser)));

    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleAction = async () => {
    if (!selectedUser || !actionType) return;
    setLoading(true);
    
    let error;
    const updateData: any = { approval_status: actionType.type === 'approve' ? 'approved' : actionType.type === 'reject' ? 'rejected' : 'suspended' };
    
    if (actionType.type === 'reject') {
      updateData.rejection_reason = rejectionReason;
    }

    if (actionType.role === 'dealer') {
      const res = await supabase.from('dealers').update(updateData).eq('user_id', selectedUser.id);
      error = res.error;
    } else {
      const res = await supabase.from('provider_profiles').update(updateData).eq('id', selectedUser.id);
      error = res.error;
    }

    setLoading(false);
    if (error) { toast.error(error.message); return; }
    
    toast.success(`User successfully ${actionType.type}d`);
    setSelectedUser(null);
    setActionType(null);
    setRejectionReason('');
    fetchData();
  };

  const filteredDealers = dealers.filter(d => 
    !search || d.dealership_name.toLowerCase().includes(search.toLowerCase()) || d.email.toLowerCase().includes(search.toLowerCase())
  );
  
  const filteredProviders = providers.filter(p => 
    !search || p.company_name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase())
  );
  
  const filteredNormalUsers = normalUsers.filter(n => 
    !search || n.full_name.toLowerCase().includes(search.toLowerCase()) || n.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground mt-1">Manage all roles and access permissions across the platform.</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users by name or email..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      <Tabs defaultValue="dealers">
        <TabsList className="grid w-[400px] grid-cols-3">
          <TabsTrigger value="dealers">Dealers ({filteredDealers.length})</TabsTrigger>
          <TabsTrigger value="providers">Providers ({filteredProviders.length})</TabsTrigger>
          <TabsTrigger value="individual">Individuals ({filteredNormalUsers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="dealers" className="mt-4">
          <div className="bg-white rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dealership</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDealers.map(d => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">{d.dealership_name}</TableCell>
                    <TableCell>{d.contact_person}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{d.email}</TableCell>
                    <TableCell><Badge variant="outline" className="capitalize">{d.subscription_tier}</Badge></TableCell>
                    <TableCell><Badge variant="outline" className={statusColors[d.approval_status]}>{d.approval_status}</Badge></TableCell>
                    <TableCell className="text-muted-foreground text-sm">{new Date(d.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => { setSelectedUser(d); setActionType({type: 'approve', role: 'dealer'}); }}><CheckCircle2 className="h-4 w-4 mr-2" />Approve</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { setSelectedUser(d); setActionType({type: 'reject', role: 'dealer'}); }} className="text-red-600"><XCircle className="h-4 w-4 mr-2" />Reject</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { setSelectedUser(d); setActionType({type: 'suspend', role: 'dealer'}); }} className="text-orange-600"><ShieldOff className="h-4 w-4 mr-2" />Suspend</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="providers" className="mt-4">
          <div className="bg-white rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProviders.map(p => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.company_name}</TableCell>
                    <TableCell>{p.contact_person}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{p.email}</TableCell>
                    <TableCell><Badge variant="outline" className={statusColors[p.approval_status]}>{p.approval_status}</Badge></TableCell>
                    <TableCell className="text-muted-foreground text-sm">{new Date(p.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => { setSelectedUser(p); setActionType({type: 'approve', role: 'provider'}); }}><CheckCircle2 className="h-4 w-4 mr-2" />Approve</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { setSelectedUser(p); setActionType({type: 'reject', role: 'provider'}); }} className="text-red-600"><XCircle className="h-4 w-4 mr-2" />Reject</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { setSelectedUser(p); setActionType({type: 'suspend', role: 'provider'}); }} className="text-orange-600"><ShieldOff className="h-4 w-4 mr-2" />Suspend</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="individual" className="mt-4">
          <div className="bg-white rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNormalUsers.map(n => (
                  <TableRow key={n.id}>
                    <TableCell className="font-medium">{n.full_name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{n.email}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{new Date(n.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!actionType} onOpenChange={(o) => { if (!o) setActionType(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="capitalize">{actionType?.type} User</DialogTitle>
            <DialogDescription>
              Are you sure you want to {actionType?.type} this {actionType?.role}?
            </DialogDescription>
          </DialogHeader>
          
          {actionType?.type === 'reject' && (
            <div className="space-y-2 mt-4">
              <Label>Reason for Rejection</Label>
              <Textarea 
                value={rejectionReason} 
                onChange={e => setRejectionReason(e.target.value)} 
                placeholder="Briefly explain why this application is being rejected..."
              />
            </div>
          )}
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setActionType(null)}>Cancel</Button>
            <Button 
              variant={actionType?.type === 'approve' ? 'default' : 'destructive'} 
              className={actionType?.type === 'approve' ? 'bg-maya-green hover:bg-maya-green/90 text-maya-green-foreground' : ''}
              onClick={handleAction}
              disabled={loading || (actionType?.type === 'reject' && !rejectionReason.trim())}
            >
              {loading ? 'Processing...' : `Confirm ${actionType?.type}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
