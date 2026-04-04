import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PROVINCES } from '@/lib/constants';
import { toast } from 'sonner';
import { ArrowLeft, Upload, CheckCircle2 } from 'lucide-react';

const GRADES = ['A+', 'A', 'B', 'C'];

function generateRefCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return 'LDX-' + Array.from({ length: 7 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export default function ProviderAddLead() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
    ai_score: '75',
    quality_grade: 'A',
    price: '',
    full_name: '',
    phone: '',
    lead_email: '',
  });

  const set = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }));

  const isValid = () =>
    form.initials.length === 2 &&
    form.city && form.province && form.price &&
    form.full_name && form.phone && form.lead_email &&
    Number(form.credit_range_min) < Number(form.credit_range_max) &&
    Number(form.ai_score) >= 0 && Number(form.ai_score) <= 100;

  const handleSubmit = async () => {
    if (!isValid() || !user) return;
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
      listed_by_role: 'provider',
      listed_by_id: user.id,
      review_status: 'pending_review',
      sold_status: 'available',
    });

    setLoading(false);
    if (error) { toast.error(error.message); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center py-20 space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold">Lead Submitted!</h2>
        <p className="text-muted-foreground">Your lead has been submitted for admin review. It will appear in the marketplace once approved.</p>
        <div className="flex gap-3 justify-center pt-2">
          <Button variant="outline" onClick={() => navigate('/provider/leads')}>View My Leads</Button>
          <Button onClick={() => { setSubmitted(false); setForm({ initials: '', buyer_type: 'online', credit_range_min: '500', credit_range_max: '700', income: '', city: '', province: '', vehicle_preference: '', has_drivers_license: false, has_paystubs: false, has_bank_statements: false, has_credit_report: false, has_preapproval: false, ai_score: '75', quality_grade: 'A', price: '', full_name: '', phone: '', lead_email: '' }); }} className="bg-maya-green hover:bg-maya-green/90 text-maya-green-foreground">
            Add Another Lead
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate('/provider/leads')} className="text-muted-foreground">
          <ArrowLeft className="h-4 w-4 mr-1" />Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Submit New Lead</h1>
          <p className="text-sm text-muted-foreground">Fill in the lead details below. Admin will review before it goes live.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Lead Info */}
        <Card>
          <CardHeader><CardTitle className="text-base">Lead Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Lead Initials * <span className="text-xs text-muted-foreground">(2 letters)</span></Label>
                <Input
                  value={form.initials}
                  onChange={e => set('initials', e.target.value.slice(0, 2).toUpperCase())}
                  placeholder="MG"
                  className="font-mono text-center text-lg font-bold tracking-widest"
                  maxLength={2}
                />
              </div>
              <div>
                <Label>Buyer Type *</Label>
                <Select value={form.buyer_type} onValueChange={v => set('buyer_type', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online Buyer</SelectItem>
                    <SelectItem value="in_store">In-Store Buyer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Credit Score Min *</Label>
                <Input type="number" value={form.credit_range_min} onChange={e => set('credit_range_min', e.target.value)} placeholder="500" />
              </div>
              <div>
                <Label>Credit Score Max *</Label>
                <Input type="number" value={form.credit_range_max} onChange={e => set('credit_range_max', e.target.value)} placeholder="700" />
              </div>
            </div>
            <div>
              <Label>Annual Income (optional)</Label>
              <Input type="number" value={form.income} onChange={e => set('income', e.target.value)} placeholder="45000" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>City *</Label>
                <Input value={form.city} onChange={e => set('city', e.target.value)} placeholder="Toronto" />
              </div>
              <div>
                <Label>Province *</Label>
                <Select value={form.province} onValueChange={v => set('province', v)}>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>{PROVINCES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Vehicle Preference (optional)</Label>
              <Input value={form.vehicle_preference} onChange={e => set('vehicle_preference', e.target.value)} placeholder="2021 Toyota Camry, SUV, etc." />
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Available Documents</CardTitle>
            <CardDescription>Check all documents the buyer has provided</CardDescription>
          </CardHeader>
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
                  <Checkbox
                    checked={!!form[doc.key as keyof typeof form]}
                    onCheckedChange={v => set(doc.key, !!v)}
                  />
                  <span className="text-sm">{doc.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quality & Price */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quality & Pricing</CardTitle>
            <CardDescription>Suggest a price and quality grade. Admin may adjust before approval.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>AI Score (0-100)</Label>
                <Input type="number" value={form.ai_score} onChange={e => set('ai_score', e.target.value)} min="0" max="100" />
              </div>
              <div>
                <Label>Quality Grade</Label>
                <Select value={form.quality_grade} onValueChange={v => set('quality_grade', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{GRADES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Suggested Price ($) *</Label>
                <Input type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="150" step="0.01" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PII — hidden from buyers */}
        <Card className="border-amber-200 dark:border-amber-800/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Lead PII <span className="text-xs font-normal text-muted-foreground">(Hidden from buyers until purchased)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div><Label>Full Name *</Label><Input value={form.full_name} onChange={e => set('full_name', e.target.value)} placeholder="John Smith" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Phone *</Label><Input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 (555) 000-0000" /></div>
              <div><Label>Email *</Label><Input type="email" value={form.lead_email} onChange={e => set('lead_email', e.target.value)} placeholder="john@example.com" /></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3 pb-8">
        <Button variant="outline" onClick={() => navigate('/provider/leads')}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          disabled={!isValid() || loading}
          className="bg-maya-green hover:bg-maya-green/90 text-maya-green-foreground px-8"
        >
          {loading ? 'Submitting...' : 'Submit for Review'}
        </Button>
      </div>
    </div>
  );
}
