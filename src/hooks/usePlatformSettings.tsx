import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PlatformBranding {
  business_name: string;
  logo_url: string;
  favicon_url: string;
  meta_title: string;
  meta_description: string;
}

interface PlatformSettingsContextType {
  branding: PlatformBranding;
  loading: boolean;
  refreshSettings: () => Promise<void>;
}

const defaultBranding: PlatformBranding = {
  business_name: 'AUTO LEAD HUB',
  logo_url: '',
  favicon_url: '/favicon.png',
  meta_title: 'MayaX Lead Hub',
  meta_description: 'Auto Leads Marketplace for Dealers'
};

const PlatformSettingsContext = createContext<PlatformSettingsContextType>({
  branding: defaultBranding,
  loading: true,
  refreshSettings: async () => {},
});

export function PlatformSettingsProvider({ children }: { children: ReactNode }) {
  const [branding, setBranding] = useState<PlatformBranding>(defaultBranding);
  const [loading, setLoading] = useState(true);

  const refreshSettings = async () => {
    try {
      const { data, error } = await supabase.from('platform_settings').select('key, value');
      if (error) throw error;
      
      if (data) {
        const newBranding = { ...defaultBranding };
        const bName = data.find(d => d.key === 'branding_business_name');
        const lUrl = data.find(d => d.key === 'branding_logo_url');
        const fUrl = data.find(d => d.key === 'branding_favicon_url');
        const mTitle = data.find(d => d.key === 'seo_meta_title');
        const mDesc = data.find(d => d.key === 'seo_meta_description');

        if (bName && bName.value) newBranding.business_name = bName.value;
        if (lUrl && lUrl.value) newBranding.logo_url = lUrl.value;
        if (fUrl && fUrl.value) newBranding.favicon_url = fUrl.value;
        if (mTitle && mTitle.value) newBranding.meta_title = mTitle.value;
        if (mDesc && mDesc.value) newBranding.meta_description = mDesc.value;

        setBranding(newBranding);
      }
    } catch (err) {
      console.error("Error fetching platform settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSettings();
  }, []);

  // Update DOM dynamically when branding changes
  useEffect(() => {
    if (loading) return;

    // Update document title
    if (branding.meta_title) {
      document.title = branding.meta_title;
    } else {
      document.title = branding.business_name;
    }

    // Update meta description
    if (branding.meta_description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', branding.meta_description);
    }

    // Update favicon
    if (branding.favicon_url) {
      let linkIcon = document.querySelector('link[rel~="icon"]') as HTMLLinkElement;
      if (!linkIcon) {
        linkIcon = document.createElement('link');
        linkIcon.rel = 'icon';
        document.head.appendChild(linkIcon);
      }
      linkIcon.href = branding.favicon_url;
    }
  }, [branding, loading]);

  return (
    <PlatformSettingsContext.Provider value={{ branding, loading, refreshSettings }}>
      {children}
    </PlatformSettingsContext.Provider>
  );
}

export const usePlatformSettings = () => useContext(PlatformSettingsContext);
