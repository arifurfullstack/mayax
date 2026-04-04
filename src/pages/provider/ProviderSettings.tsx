import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save, User, Lock } from 'lucide-react';

export default function ProviderSettings() {
  const { provider, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    company_name: provider?.company_name ?? '',
    contact_person: provider?.contact_person ?? '',
    phone: provider?.phone ?? '',
    business_address: provider?.business_address ?? '',
    website: provider?.website ?? '',
    lead_source_description: provider?.lead_source_description ?? '',
    payout_method: provider?.payout_method ?? '',
  });
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const saveProfile = async () => {
    if (!provider) return;
    setLoading(true);
    const { error } = await supabase
      .from('provider_profiles')
      .update({
        company_name: form.company_name,
        contact_person: form.contact_person,
        phone: form.phone || null,
        business_address: form.business_address || null,
        website: form.website || null,
        lead_source_description: form.lead_source_description || null,
        payout_method: form.payout_method || null,
      })
      .eq('id', provider.id);
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    await refreshProfile();
    toast.success('Profile updated successfully');
  };

  const changePassword = async () => {
    if (passwords.new !== passwords.confirm) { toast.error("Passwords don't match"); return; }
    if (passwords.new.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: passwords.new });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    setPasswords({ current: '', new: '', confirm: '' });
    toast.success('Password updated successfully');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your provider profile and preferences</p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><User className="h-4 w-4" />Company Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Company Name</Label><Input value={form.company_name} onChange={e => set('company_name', e.target.value)} /></div>
            <div><Label>Contact Person</Label><Input value={form.contact_person} onChange={e => set('contact_person', e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Phone</Label><Input value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
            <div><Label>Website</Label><Input value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://" /></div>
          </div>
          <div><Label>Business Address</Label><Input value={form.business_address} onChange={e => set('business_address', e.target.value)} /></div>
          <div>
            <Label>Lead Source Description</Label>
            <Textarea value={form.lead_source_description} onChange={e => set('lead_source_description', e.target.value)} className="min-h-[80px] text-sm" />
          </div>
          <div><Label>Payout Method Preference</Label><Input value={form.payout_method} onChange={e => set('payout_method', e.target.value)} placeholder="e.g. Bank Transfer, e-Transfer" /></div>
          <Button onClick={saveProfile} disabled={loading} className="bg-maya-green hover:bg-maya-green/90 text-maya-green-foreground">
            <Save className="h-4 w-4 mr-1.5" />{loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardContent>
      </Card>

      {/* Password */}
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Lock className="h-4 w-4" />Change Password</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div><Label>New Password</Label><Input type="password" value={passwords.new} onChange={e => setPasswords(p => ({ ...p, new: e.target.value }))} placeholder="Min 8 characters" /></div>
          <div><Label>Confirm New Password</Label><Input type="password" value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} /></div>
          <Button onClick={changePassword} disabled={loading || !passwords.new} variant="outline">Update Password</Button>
        </CardContent>
      </Card>

      {/* Read-only info */}
      <Card>
        <CardHeader><CardTitle className="text-base">Account Info</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="font-medium">{provider?.email}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Account Status</span><span className="font-medium capitalize">{provider?.approval_status}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Commission Rate</span><span className="font-medium">{Math.round((provider?.commission_rate ?? 0.2) * 100)}% platform / {Math.round((1 - (provider?.commission_rate ?? 0.2)) * 100)}% yours</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Member Since</span><span className="font-medium">{provider ? new Date(provider.id).toLocaleDateString() : '—'}</span></div>
        </CardContent>
      </Card>
    </div>
  );
}
