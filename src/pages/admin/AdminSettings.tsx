import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save, Settings } from 'lucide-react';

export default function AdminSettings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Platform settings state
  const [markupPct, setMarkupPct] = useState('20');
  const [providerCommission, setProviderCommission] = useState('80');

  const fetchSettings = async () => {
    const { data } = await supabase.from('platform_settings').select('*');
    if (data) {
      const markup = data.find(d => d.key === 'platform_markup_percentage');
      const commission = data.find(d => d.key === 'provider_commission_percentage');
      if (markup) setMarkupPct(markup.value);
      if (commission) setProviderCommission(commission.value);
    }
  };

  useEffect(() => { fetchSettings(); }, []);

  const handleSave = async () => {
    setLoading(true);
    // Upsert platform settings
    const updates = [
      { key: 'platform_markup_percentage', value: markupPct, description: 'Markup percentage added to provider leads' },
      { key: 'provider_commission_percentage', value: providerCommission, description: 'Percentage of sale price provider keeps' }
    ];

    for (const update of updates) {
      const { data: existing } = await supabase.from('platform_settings').select('id').eq('key', update.key).single();
      if (existing) {
        await supabase.from('platform_settings').update({ value: update.value, updated_at: new Date().toISOString() }).eq('key', update.key);
      } else {
        await supabase.from('platform_settings').insert({ ...update, updated_at: new Date().toISOString() });
      }
    }

    setLoading(false);
    toast.success('Platform settings updated successfully.');
  };

  return (
    <div className="p-8 max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="h-8 w-8 text-maya-navy" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">Configure global platform rules and fees.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Marketplace Fees</CardTitle>
          <CardDescription>Default payout and markup settings for provider-generated leads.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Provider Commission (%)</Label>
              <Input type="number" value={providerCommission} onChange={e => setProviderCommission(e.target.value)} />
              <p className="text-xs text-muted-foreground">Default rate the provider gets acting as sellers (e.g. 80).</p>
            </div>
            <div className="space-y-2">
              <Label>Auto-Markup (%)</Label>
              <Input type="number" value={markupPct} onChange={e => setMarkupPct(e.target.value)} />
              <p className="text-xs text-muted-foreground">Default markup margin applied if system auto-prices leads (e.g. 20).</p>
            </div>
          </div>

          <Button onClick={handleSave} disabled={loading} className="bg-maya-navy hover:bg-maya-navy/90 text-white w-full sm:w-auto">
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Saving...' : 'Save Settings'}
          </Button>
        </CardContent>
      </Card>
      
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">Reset marketplace data, purge logs, or maintenance mode. Reserved for future implementation.</p>
          <Button variant="destructive" disabled>Enable Maintenance Mode</Button>
        </CardContent>
      </Card>
    </div>
  );
}
