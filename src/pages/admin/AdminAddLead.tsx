import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PROVINCES } from '@/lib/constants';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';

const GRADES = ['A+', 'A', 'B', 'C'];

function generateRefCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return 'LDX-' + Array.from({ length: 7 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export default function AdminAddLead() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    initials: '',
    buyer_type: 'online',
    credit_range_min: '500',
    credit_range_max: '700',
    income: '',
    city: '',
    province: '',
    vehicle_preference: '',
    has_drivers_license: false,
    has_paystubs: false,
    has_bank_statements: false,
    has_credit_report: false,
    has_preapproval: false,
    ai_score: '85',
    quality_grade: 'A',
    price: '',
    full_name: '',
    phone: '',
    lead_email: '',
  });

  const set = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }));

  const isValid = () =>
    form.initials.length >= 2 &&
    form.city && form.province && form.price &&
    form.full_name && form.phone && form.lead_email;

  const handleSubmit = async () => {
    if (!isValid()) return;
    setLoading(true);

    const { error } = await supabase.from('leads').insert({
      reference_code: generateRefCode(),
      initials: form.initials.toUpperCase(),
      buyer_type: form.buyer_type as 'online' | 'in_store',
      credit_range_min: Number(form.credit_range_min),
      credit_range_max: Number(form.credit_range_max),
      income: form.income ? Number(form.income) : null,
      city: form.city,
      province: form.province,
      vehicle_preference: form.vehicle_preference || null,
      has_drivers_license: form.has_drivers_license,
      has_paystubs: form.has_paystubs,
      has_bank_statements: form.has_bank_statements,
      has_credit_report: form.has_credit_report,
      has_preapproval: form.has_preapproval,
      ai_score: Number(form.ai_score),
      quality_grade: form.quality_grade,
      price: Number(form.price),
      full_name: form.full_name,
      phone: form.phone,
      lead_email: form.lead_email,
      listed_by_role: 'admin',
      review_status: 'approved', // Admin leads are auto-approved
      sold_status: 'available',
      approved_at: new Date().toISOString()
    });

    setLoading(false);
    if (error) { toast.error(error.message); return; }
    
    toast.success('Lead created and published immediately');
    navigate('/admin/leads');
  };

  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/leads')} className="text-muted-foreground">
          <ArrowLeft className="h-4 w-4 mr-1" />Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add Lead (Admin)</h1>
          <p className="text-sm text-muted-foreground mt-1">Leads created here are marked as 'Admin' source and go live instantly.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Core details */}
        <Card>
          <CardHeader><CardTitle className="text-base">Lead Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Lead Initials</Label>
                <Input value={form.initials} onChange={e => set('initials', e.target.value.slice(0, 2).toUpperCase())} placeholder="MG" maxLength={2} />
              </div>
              <div>
                <Label>Buyer Type</Label>
                <Select value={form.buyer_type} onValueChange={v => set('buyer_type', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online Buyer</SelectItem>
                    <SelectItem value="in_store">In-Store Buyer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-t pt-4">
              <div><Label>Full Name</Label><Input value={form.full_name} onChange={e => set('full_name', e.target.value)} /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label>Phone</Label><Input value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
                <div><Label>Email</Label><Input type="email" value={form.lead_email} onChange={e => set('lead_email', e.target.value)} /></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t pt-4">
              <div><Label>Credit Score Min</Label><Input type="number" value={form.credit_range_min} onChange={e => set('credit_range_min', e.target.value)} /></div>
              <div><Label>Credit Score Max</Label><Input type="number" value={form.credit_range_max} onChange={e => set('credit_range_max', e.target.value)} /></div>
              <div><Label>Annual Income ($)</Label><Input type="number" value={form.income} onChange={e => set('income', e.target.value)} /></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div><Label>City</Label><Input value={form.city} onChange={e => set('city', e.target.value)} /></div>
              <div>
                <Label>Province</Label>
                <Select value={form.province} onValueChange={v => set('province', v)}>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>{PROVINCES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div><Label>Vehicle Preference</Label><Input value={form.vehicle_preference} onChange={e => set('vehicle_preference', e.target.value)} /></div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader><CardTitle className="text-base">Documents Provided</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { key: 'has_drivers_license', label: "Driver's License" },
                { key: 'has_paystubs', label: 'Paystubs' },
                { key: 'has_bank_statements', label: 'Bank Statements' },
                { key: 'has_credit_report', label: 'Credit Report' },
                { key: 'has_preapproval', label: 'Pre-Approval Cert' },
              ].map(doc => (
                <div key={doc.key} className="flex items-center gap-2 p-2 rounded-lg border hover:bg-muted/30 cursor-pointer"
                  onClick={() => set(doc.key, !form[doc.key as keyof typeof form])}>
                  <Checkbox checked={!!form[doc.key as keyof typeof form]} onCheckedChange={v => set(doc.key, !!v)} />
                  <span className="text-sm">{doc.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Pricing & Quality</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>AI Score (0-100)</Label><Input type="number" value={form.ai_score} onChange={e => set('ai_score', e.target.value)} min="0" max="100" /></div>
              <div>
                <Label>Quality Grade</Label>
                <Select value={form.quality_grade} onValueChange={v => set('quality_grade', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{GRADES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Marketplace Price ($)</Label><Input type="number" value={form.price} onChange={e => set('price', e.target.value)} /></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3 pb-8">
        <Button variant="outline" onClick={() => navigate('/admin/leads')}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!isValid() || loading} className="bg-maya-green hover:bg-maya-green/90 text-maya-green-foreground px-8">
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Publishing...' : 'Publish to Marketplace'}
        </Button>
      </div>
    </div>
  );
}
