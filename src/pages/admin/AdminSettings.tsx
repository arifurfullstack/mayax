import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { usePlatformSettings } from '@/hooks/usePlatformSettings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save, Settings, LayoutTemplate } from 'lucide-react';

export default function AdminSettings() {
  const { user } = useAuth();
  const { refreshSettings } = usePlatformSettings();
  const [loading, setLoading] = useState(false);
  
  // Platform settings state
  const [markupPct, setMarkupPct] = useState('20');
  const [providerCommission, setProviderCommission] = useState('80');

  // Branding settings state
  const [businessName, setBusinessName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [faviconUrl, setFaviconUrl] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');

  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'favicon') => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (type === 'logo') setUploadingLogo(true);
    else setUploadingFavicon(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${type}_${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('branding')
        .upload(fileName, file);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from('branding')
        .getPublicUrl(fileName);

      const publicUrl = publicUrlData.publicUrl;

      if (type === 'logo') {
        setLogoUrl(publicUrl);
        toast.success("Logo uploaded temporarily. Click Save Settings to apply.");
      } else {
        setFaviconUrl(publicUrl);
        toast.success("Favicon uploaded temporarily. Click Save Settings to apply.");
      }
    } catch (error: any) {
      toast.error(error.message || 'Error uploading image');
    } finally {
      if (type === 'logo') setUploadingLogo(false);
      else setUploadingFavicon(false);
    }
  };

  const fetchSettings = async () => {
    const { data } = await supabase.from('platform_settings').select('*');
    if (data) {
      const markup = data.find(d => d.key === 'platform_markup_percentage');
      const commission = data.find(d => d.key === 'provider_commission_percentage');
      if (markup) setMarkupPct(markup.value);
      if (commission) setProviderCommission(commission.value);

      const bName = data.find(d => d.key === 'branding_business_name');
      const lUrl = data.find(d => d.key === 'branding_logo_url');
      const fUrl = data.find(d => d.key === 'branding_favicon_url');
      const mTitle = data.find(d => d.key === 'seo_meta_title');
      const mDesc = data.find(d => d.key === 'seo_meta_description');

      if (bName) setBusinessName(bName.value);
      if (lUrl) setLogoUrl(lUrl.value);
      if (fUrl) setFaviconUrl(fUrl.value);
      if (mTitle) setMetaTitle(mTitle.value);
      if (mDesc) setMetaDesc(mDesc.value);
    }
  };

  useEffect(() => { fetchSettings(); }, []);

  const handleSave = async () => {
    setLoading(true);
    // Upsert platform settings
    const updates = [
      { key: 'platform_markup_percentage', value: markupPct, description: 'Markup percentage added to provider leads' },
      { key: 'provider_commission_percentage', value: providerCommission, description: 'Percentage of sale price provider keeps' },
      { key: 'branding_business_name', value: businessName, description: 'Business Name for Platform' },
      { key: 'branding_logo_url', value: logoUrl, description: 'URL for Platform Logo' },
      { key: 'branding_favicon_url', value: faviconUrl, description: 'URL for Favicon' },
      { key: 'seo_meta_title', value: metaTitle, description: 'SEO Meta Title' },
      { key: 'seo_meta_description', value: metaDesc, description: 'SEO Meta Description' },
    ];

    for (const update of updates) {
      const { data: existing } = await supabase.from('platform_settings').select('id').eq('key', update.key).single();
      if (existing) {
        await supabase.from('platform_settings').update({ value: update.value, updated_at: new Date().toISOString() }).eq('key', update.key);
      } else {
        await supabase.from('platform_settings').insert({ ...update, updated_at: new Date().toISOString() });
      }
    }

    await refreshSettings();
    setLoading(false);
    toast.success('Platform settings updated successfully.');
  };

  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8 text-maya-navy dark:text-maya-cyan" />
            Platform Settings
          </h1>
          <p className="text-muted-foreground mt-1">Configure global platform rules, fees, and branding.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Marketplace Fees</CardTitle>
            <CardDescription>Default payout and markup settings for provider-generated leads.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
          <div className="p-6 pt-0 mt-auto">
            <Button onClick={handleSave} disabled={loading} className="w-full bg-maya-navy hover:bg-maya-navy/90 dark:bg-maya-cyan dark:hover:bg-maya-cyan/90 dark:text-maya-navy text-white">
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Saving...' : 'Save Fees Settings'}
            </Button>
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutTemplate className="w-5 h-5" /> Let's Brand Your Platform
            </CardTitle>
            <CardDescription>Configure external branding, logos, and SEO meta tags.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Business Name</Label>
              <Input placeholder="E.g. MayaX Lead Hub" value={businessName} onChange={e => setBusinessName(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2 flex flex-col">
                <Label>Logo Image</Label>
                <div className="flex gap-4 items-center">
                  <Input 
                    type="file" 
                    accept="image/*" 
                    className="cursor-pointer"
                    onChange={(e) => handleFileUpload(e, 'logo')} 
                    disabled={uploadingLogo} 
                  />
                  {logoUrl && <img src={logoUrl} className="h-8 object-contain" alt="Logo preview" />}
                </div>
              </div>
              <div className="space-y-2 flex flex-col">
                <Label>Favicon Image</Label>
                <div className="flex gap-4 items-center">
                  <Input 
                    type="file" 
                    accept="image/*" 
                    className="cursor-pointer"
                    onChange={(e) => handleFileUpload(e, 'favicon')} 
                    disabled={uploadingFavicon} 
                  />
                  {faviconUrl && <img src={faviconUrl} className="h-8 object-contain bg-white rounded" alt="Favicon preview" />}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>SEO Meta Title</Label>
              <Input placeholder="E.g. MayaX - Premium Auto Leads" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>SEO Meta Description</Label>
              <Textarea 
                placeholder="Brief description of your marketplace for search engines..." 
                className="h-20"
                value={metaDesc} 
                onChange={e => setMetaDesc(e.target.value)} 
              />
            </div>
          </CardContent>
          <div className="p-6 pt-0 mt-auto">
            <Button onClick={handleSave} disabled={loading} className="w-full bg-maya-navy hover:bg-maya-navy/90 dark:bg-maya-cyan dark:hover:bg-maya-cyan/90 dark:text-maya-navy text-white">
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Saving...' : 'Save Branding Settings'}
            </Button>
          </div>
        </Card>
      </div>
      
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

