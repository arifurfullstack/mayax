import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { MayaLogo } from '@/components/MayaLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { BUSINESS_TYPES, PROVINCES } from '@/lib/constants';
import { toast } from 'sonner';
import { Check, User, Building2, Upload, ArrowLeft } from 'lucide-react';

type RoleType = 'normal_user' | 'dealer' | 'provider' | null;

// ─── Role Selector Card ───────────────────────────────────────
function RoleCard({ icon: Icon, title, description, onClick }: {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left p-5 rounded-xl border-2 border-border hover:border-maya-green hover:bg-maya-green/5 transition-all duration-200 shadow-sm hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <div className="mt-0.5 p-2.5 rounded-lg bg-maya-navy/8 group-hover:bg-maya-green/10 transition-colors">
          <Icon className="h-5 w-5 text-maya-navy group-hover:text-maya-green transition-colors" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>
    </button>
  );
}

// ─── Stepper ─────────────────────────────────────────────────
function Stepper({ steps, currentStep }: { steps: string[]; currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-1 mt-4">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-1">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
            i < currentStep ? 'bg-maya-green text-white' : i === currentStep ? 'bg-maya-navy text-white' : 'bg-muted text-muted-foreground'
          }`}>
            {i < currentStep ? <Check className="h-3.5 w-3.5" /> : i + 1}
          </div>
          {i < steps.length - 1 && <div className={`w-8 h-0.5 ${i < currentStep ? 'bg-maya-green' : 'bg-muted'}`} />}
        </div>
      ))}
    </div>
  );
}

// ─── Normal User Registration ─────────────────────────────────
function NormalUserForm({ onBack }: { onBack: () => void }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const isValid = form.full_name && form.email && form.password.length >= 8 && form.password === form.confirmPassword;

  const handleSubmit = async () => {
    setLoading(true);
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });
    if (authError || !authData.user) {
      toast.error(authError?.message || 'Registration failed');
      setLoading(false);
      return;
    }
    const userId = authData.user.id;

    // Insert role
    const { error: roleError } = await supabase.from('user_roles').insert({ user_id: userId, role: 'normal_user' });
    if (roleError) { toast.error(roleError.message); setLoading(false); return; }

    // Insert profile
    const { error: profileError } = await supabase.from('normal_user_profiles').insert({
      id: userId,
      full_name: form.full_name,
      email: form.email,
      phone: form.phone || null,
      notification_email: form.email,
    });
    setLoading(false);
    if (profileError) { toast.error(profileError.message); return; }

    toast.success('Account created! Welcome to MayaX Lead Hub.');
    navigate('/marketplace');
  };

  return (
    <div className="space-y-3">
      <div><Label>Full Name *</Label><Input value={form.full_name} onChange={e => set('full_name', e.target.value)} placeholder="John Smith" /></div>
      <div><Label>Email *</Label><Input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="john@example.com" /></div>
      <div><Label>Phone</Label><Input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 (555) 000-0000" /></div>
      <div><Label>Password *</Label><Input type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min 8 characters" /></div>
      <div>
        <Label>Confirm Password *</Label>
        <Input type="password" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} />
        {form.confirmPassword && form.password !== form.confirmPassword && (
          <p className="text-xs text-destructive mt-1">Passwords don't match</p>
        )}
      </div>
      <p className="text-xs text-muted-foreground pt-1">
        Your account will be activated immediately. No approval required.
      </p>
      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onBack}><ArrowLeft className="h-4 w-4 mr-1" />Back</Button>
        <Button onClick={handleSubmit} disabled={!isValid || loading} className="bg-maya-green hover:bg-maya-green/90 text-maya-green-foreground">
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </div>
    </div>
  );
}

// ─── Dealer Registration (multi-step) ─────────────────────────
const dealerSteps = ['Business Info', 'Contact', 'Delivery', 'Review'];

function DealerForm({ onBack }: { onBack: () => void }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    dealership_name: '', business_type: '', business_address: '', province: '', website: '',
    contact_person: '', email: '', phone: '', password: '', confirmPassword: '',
    notification_email: '', webhook_url: '', webhook_secret: '', delivery_preference: 'email',
  });
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const canNext = () => {
    if (step === 0) return form.dealership_name && form.business_type && form.business_address && form.province;
    if (step === 1) return form.contact_person && form.email && form.phone && form.password && form.password === form.confirmPassword && form.password.length >= 8;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { data: authData, error: authError } = await supabase.auth.signUp({ email: form.email, password: form.password });
    if (authError || !authData.user) { toast.error(authError?.message || 'Registration failed'); setLoading(false); return; }

    const userId = authData.user.id;
    const { error: roleError } = await supabase.from('user_roles').insert({ user_id: userId, role: 'dealer' });
    if (roleError) { toast.error(roleError.message); setLoading(false); return; }

    const { error: dealerError } = await supabase.from('dealers').insert({
      user_id: userId,
      dealership_name: form.dealership_name,
      business_type: form.business_type,
      business_address: form.business_address,
      province: form.province,
      website: form.website || null,
      contact_person: form.contact_person,
      email: form.email,
      phone: form.phone,
      notification_email: form.notification_email || form.email,
      webhook_url: form.webhook_url || null,
      webhook_secret: form.webhook_secret || null,
      delivery_preference: form.delivery_preference,
    });
    setLoading(false);
    if (dealerError) { toast.error(dealerError.message); return; }
    toast.success('Application submitted! We\'ll review it within 24-48 hours.');
    navigate('/pending-approval');
  };

  return (
    <div>
      <Stepper steps={dealerSteps} currentStep={step} />
      <p className="text-sm text-muted-foreground text-center mt-1 mb-4">{dealerSteps[step]}</p>
      <div className="space-y-3">
        {step === 0 && (
          <>
            <div><Label>Dealership Name *</Label><Input value={form.dealership_name} onChange={e => set('dealership_name', e.target.value)} /></div>
            <div><Label>Business Type *</Label>
              <Select value={form.business_type} onValueChange={v => set('business_type', v)}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>{BUSINESS_TYPES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Business Address *</Label><Input value={form.business_address} onChange={e => set('business_address', e.target.value)} /></div>
            <div><Label>Province *</Label>
              <Select value={form.province} onValueChange={v => set('province', v)}>
                <SelectTrigger><SelectValue placeholder="Select province" /></SelectTrigger>
                <SelectContent>{PROVINCES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Website (optional)</Label><Input value={form.website} onChange={e => set('website', e.target.value)} /></div>
          </>
        )}
        {step === 1 && (
          <>
            <div><Label>Contact Person *</Label><Input value={form.contact_person} onChange={e => set('contact_person', e.target.value)} /></div>
            <div><Label>Email *</Label><Input type="email" value={form.email} onChange={e => set('email', e.target.value)} /></div>
            <div><Label>Phone *</Label><Input value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
            <div><Label>Password *</Label><Input type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min 8 chars" /></div>
            <div><Label>Confirm Password *</Label><Input type="password" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} />
              {form.confirmPassword && form.password !== form.confirmPassword && <p className="text-xs text-destructive mt-1">Passwords don't match</p>}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div><Label>Notification Email</Label><Input value={form.notification_email} onChange={e => set('notification_email', e.target.value)} placeholder={form.email} /></div>
            <div><Label>CRM Webhook URL (optional)</Label><Input value={form.webhook_url} onChange={e => set('webhook_url', e.target.value)} /></div>
            <div><Label>Webhook Secret (optional)</Label><Input value={form.webhook_secret} onChange={e => set('webhook_secret', e.target.value)} /></div>
            <div><Label>Delivery Preference</Label>
              <Select value={form.delivery_preference} onValueChange={v => set('delivery_preference', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email Only</SelectItem>
                  <SelectItem value="webhook">Webhook Only</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
        {step === 3 && (
          <div className="space-y-2 text-sm">
            <h3 className="font-semibold">Review Your Application</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 bg-muted p-3 rounded-lg">
              <span className="text-muted-foreground">Dealership:</span><span className="font-medium">{form.dealership_name}</span>
              <span className="text-muted-foreground">Type:</span><span className="font-medium">{form.business_type}</span>
              <span className="text-muted-foreground">Province:</span><span className="font-medium">{form.province}</span>
              <span className="text-muted-foreground">Contact:</span><span className="font-medium">{form.contact_person}</span>
              <span className="text-muted-foreground">Email:</span><span className="font-medium">{form.email}</span>
              <span className="text-muted-foreground">Delivery:</span><span className="font-medium">{form.delivery_preference}</span>
            </div>
            <p className="text-xs text-muted-foreground">Your application will be reviewed within 24-48 hours.</p>
          </div>
        )}
        <div className="flex justify-between pt-2">
          {step > 0
            ? <Button variant="outline" onClick={() => setStep(s => s - 1)}>Back</Button>
            : <Button variant="outline" onClick={onBack}><ArrowLeft className="h-4 w-4 mr-1" />Change Role</Button>
          }
          {step < 3
            ? <Button onClick={() => setStep(s => s + 1)} disabled={!canNext()} className="bg-maya-green hover:bg-maya-green/90 text-maya-green-foreground">Next</Button>
            : <Button onClick={handleSubmit} disabled={loading} className="bg-maya-green hover:bg-maya-green/90 text-maya-green-foreground">{loading ? 'Submitting...' : 'Submit Application'}</Button>
          }
        </div>
      </div>
    </div>
  );
}

// ─── Provider Registration ────────────────────────────────────
const providerSteps = ['Company Info', 'Review'];

function ProviderForm({ onBack }: { onBack: () => void }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    company_name: '', contact_person: '', email: '', phone: '', password: '', confirmPassword: '',
    business_address: '', website: '', lead_source_description: '',
  });
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const isValid = form.company_name && form.contact_person && form.email &&
    form.phone && form.password.length >= 8 && form.password === form.confirmPassword;

  const handleSubmit = async () => {
    setLoading(true);
    const { data: authData, error: authError } = await supabase.auth.signUp({ email: form.email, password: form.password });
    if (authError || !authData.user) { toast.error(authError?.message || 'Registration failed'); setLoading(false); return; }

    const userId = authData.user.id;
    const { error: roleError } = await supabase.from('user_roles').insert({ user_id: userId, role: 'provider' });
    if (roleError) { toast.error(roleError.message); setLoading(false); return; }

    const { error: profileError } = await supabase.from('provider_profiles').insert({
      id: userId,
      company_name: form.company_name,
      contact_person: form.contact_person,
      email: form.email,
      phone: form.phone || null,
      business_address: form.business_address || null,
      website: form.website || null,
      lead_source_description: form.lead_source_description || null,
    });
    setLoading(false);
    if (profileError) { toast.error(profileError.message); return; }
    toast.success('Provider application submitted! We\'ll review it within 24-48 hours.');
    navigate('/provider/pending-approval');
  };

  return (
    <div>
      <Stepper steps={providerSteps} currentStep={step} />
      <p className="text-sm text-muted-foreground text-center mt-1 mb-4">{providerSteps[step]}</p>
      <div className="space-y-3">
        {step === 0 && (
          <>
            <div><Label>Company / Provider Name *</Label><Input value={form.company_name} onChange={e => set('company_name', e.target.value)} placeholder="Acme Lead Generation Inc." /></div>
            <div><Label>Contact Person *</Label><Input value={form.contact_person} onChange={e => set('contact_person', e.target.value)} placeholder="Jane Doe" /></div>
            <div className="grid grid-cols-2 gap-2">
              <div><Label>Email *</Label><Input type="email" value={form.email} onChange={e => set('email', e.target.value)} /></div>
              <div><Label>Phone *</Label><Input value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
            </div>
            <div><Label>Password *</Label><Input type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min 8 characters" /></div>
            <div><Label>Confirm Password *</Label><Input type="password" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} />
              {form.confirmPassword && form.password !== form.confirmPassword && <p className="text-xs text-destructive mt-1">Passwords don't match</p>}
            </div>
            <div><Label>Business Address</Label><Input value={form.business_address} onChange={e => set('business_address', e.target.value)} /></div>
            <div><Label>Website / Portfolio URL</Label><Input value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://yourdomain.com" /></div>
            <div><Label>How do you generate leads? *</Label>
              <Textarea
                value={form.lead_source_description}
                onChange={e => set('lead_source_description', e.target.value)}
                placeholder="Describe your lead generation methods, traffic sources, and quality processes..."
                className="min-h-[80px] text-sm"
              />
            </div>
          </>
        )}
        {step === 1 && (
          <div className="space-y-2 text-sm">
            <h3 className="font-semibold">Review Your Application</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 bg-muted p-3 rounded-lg">
              <span className="text-muted-foreground">Company:</span><span className="font-medium">{form.company_name}</span>
              <span className="text-muted-foreground">Contact:</span><span className="font-medium">{form.contact_person}</span>
              <span className="text-muted-foreground">Email:</span><span className="font-medium">{form.email}</span>
              <span className="text-muted-foreground">Phone:</span><span className="font-medium">{form.phone}</span>
              {form.website && <><span className="text-muted-foreground">Website:</span><span className="font-medium">{form.website}</span></>}
            </div>
            <p className="text-xs text-muted-foreground">Your provider application will be reviewed within 24-48 hours. You'll be notified by email upon approval.</p>
          </div>
        )}
        <div className="flex justify-between pt-2">
          {step > 0
            ? <Button variant="outline" onClick={() => setStep(s => s - 1)}>Back</Button>
            : <Button variant="outline" onClick={onBack}><ArrowLeft className="h-4 w-4 mr-1" />Change Role</Button>
          }
          {step < providerSteps.length - 1
            ? <Button onClick={() => setStep(s => s + 1)} disabled={!isValid} className="bg-maya-green hover:bg-maya-green/90 text-maya-green-foreground">Next</Button>
            : <Button onClick={handleSubmit} disabled={loading} className="bg-maya-green hover:bg-maya-green/90 text-maya-green-foreground">{loading ? 'Submitting...' : 'Submit Application'}</Button>
          }
        </div>
      </div>
    </div>
  );
}

// ─── Main Register Page ───────────────────────────────────────
export default function Register() {
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(214,25%,96%)] to-[hsl(210,30%,98%)] px-4 py-8">
      <Card className="w-full max-w-lg shadow-xl border-0 glass">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-2"><MayaLogo variant="dark" /></div>
          <CardTitle className="text-lg">
            {selectedRole === null ? 'Create Your Account' : selectedRole === 'normal_user' ? 'Individual Buyer' : selectedRole === 'dealer' ? 'Dealership Account' : 'Lead Provider Account'}
          </CardTitle>
          <CardDescription className="text-xs">
            {selectedRole === null ? 'Choose how you want to use MayaX Lead Hub' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedRole === null && (
            <div className="space-y-3 py-2">
              <RoleCard
                icon={User}
                title="Individual Buyer"
                description="I'm a freelance broker or independent agent looking to buy automotive leads. Instant activation."
                onClick={() => setSelectedRole('normal_user')}
              />
              <RoleCard
                icon={Building2}
                title="Dealership"
                description="I represent a car dealership and want full marketplace access with priority subscription tiers."
                onClick={() => setSelectedRole('dealer')}
              />
              <RoleCard
                icon={Upload}
                title="Lead Provider"
                description="I generate automotive leads and want to sell them on the marketplace. Earn up to 80% per lead."
                onClick={() => setSelectedRole('provider')}
              />
              <p className="text-center text-xs text-muted-foreground pt-2">
                Already have an account?{' '}
                <Link to="/login" className="text-maya-green font-medium hover:underline">Sign in</Link>
              </p>
            </div>
          )}

          {selectedRole === 'normal_user' && <NormalUserForm onBack={() => setSelectedRole(null)} />}
          {selectedRole === 'dealer' && <DealerForm onBack={() => setSelectedRole(null)} />}
          {selectedRole === 'provider' && <ProviderForm onBack={() => setSelectedRole(null)} />}
        </CardContent>
      </Card>
    </div>
  );
}
