import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'normal_user' | 'dealer' | 'provider' | 'admin' | null;

export interface DealerProfile {
  id: string;
  dealership_name: string;
  contact_person: string;
  email: string;
  phone: string;
  approval_status: string;
  subscription_tier: string;
  wallet_balance: number;
  avatar_url: string | null;
  delivery_preference: string;
  notification_email: string | null;
  webhook_url: string | null;
  webhook_secret: string | null;
  business_type: string | null;
  province: string | null;
  business_address: string | null;
  website: string | null;
}

export interface NormalUserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  wallet_balance: number;
  notification_email: string | null;
}

export interface ProviderProfile {
  id: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  business_address: string | null;
  website: string | null;
  lead_source_description: string | null;
  approval_status: string;
  rejection_reason: string | null;
  total_earnings: number;
  pending_payout: number;
  payout_method: string | null;
  commission_rate: number;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  role: UserRole;
  dealer: DealerProfile | null;
  normalUser: NormalUserProfile | null;
  provider: ProviderProfile | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  role: null,
  dealer: null,
  normalUser: null,
  provider: null,
  isAdmin: false,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
});

async function fetchUserRole(userId: string): Promise<UserRole> {
  const { data } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .order('role') // just for determinism
    .limit(1)
    .maybeSingle();
  return (data?.role as UserRole) ?? null;
}

async function fetchDealerProfile(userId: string): Promise<DealerProfile | null> {
  const { data } = await supabase
    .from('dealers')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  return data as DealerProfile | null;
}

async function fetchNormalUserProfile(userId: string): Promise<NormalUserProfile | null> {
  const { data } = await supabase
    .from('normal_user_profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  return data as NormalUserProfile | null;
}

async function fetchProviderProfile(userId: string): Promise<ProviderProfile | null> {
  const { data } = await supabase
    .from('provider_profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  return data as ProviderProfile | null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [dealer, setDealer] = useState<DealerProfile | null>(null);
  const [normalUser, setNormalUser] = useState<NormalUserProfile | null>(null);
  const [provider, setProvider] = useState<ProviderProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const resetUserState = () => {
    setRole(null);
    setDealer(null);
    setNormalUser(null);
    setProvider(null);
    setIsAdmin(false);
  };

  const loadUserData = async (userId: string) => {
    try {
      // DEV MOCK BYPASS
      const mockEmail = localStorage.getItem('mock_user_email');
      if (mockEmail) {
        if (mockEmail === 'normal@mayax.test') {
          setRole('normal_user');
          setIsAdmin(false);
          setNormalUser({ id: userId, full_name: 'Normal Test User', email: mockEmail, wallet_balance: 500 } as NormalUserProfile);
        } else if (mockEmail === 'dealer@mayax.test') {
          setRole('dealer');
          setIsAdmin(false);
          setDealer({ id: userId, email: mockEmail, approval_status: 'approved', subscription_tier: 'pro', wallet_balance: 1000 } as DealerProfile);
        } else if (mockEmail === 'provider@mayax.test') {
          setRole('provider');
          setIsAdmin(false);
          setProvider({ id: userId, email: mockEmail, approval_status: 'approved', total_earnings: 0 } as ProviderProfile);
        } else if (mockEmail === 'admin@mayax.test') {
          setRole('admin');
          setIsAdmin(true);
        }
        return;
      }

      const userRole = await fetchUserRole(userId);
      setRole(userRole);
      setIsAdmin(userRole === 'admin');

      // Reset all profiles
      setDealer(null);
      setNormalUser(null);
      setProvider(null);

      if (userRole === 'dealer') {
        const d = await fetchDealerProfile(userId);
        setDealer(d);
      } else if (userRole === 'normal_user') {
        const n = await fetchNormalUserProfile(userId);
        setNormalUser(n);
      } else if (userRole === 'provider') {
        const p = await fetchProviderProfile(userId);
        setProvider(p);
      }
    } catch (err) {
      console.error('Error loading user profile data:', err);
    }
  };

  const refreshProfile = async () => {
    if (user) await loadUserData(user.id);
  };

  useEffect(() => {
    let alive = true;

    // Fail-safe: Never stay stuck in loading forever (3.5s max)
    const timeoutId = setTimeout(() => {
      if (alive) {
        setLoading((prev) => {
          if (prev) {
            console.warn('Auth initialization timed out after 3.5s - releasing loading screen');
            return false;
          }
          return prev;
        });
      }
    }, 3500);

    const applySession = async (currentSession: Session | null) => {
      if (!alive) return;
      try {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          await loadUserData(currentSession.user.id);
        } else {
          resetUserState();
        }
      } catch (err) {
        console.error('applySession error:', err);
        resetUserState();
      } finally {
        if (alive) setLoading(false);
      }
    };

    supabase.auth.getSession()
      .then(({ data }) => applySession(data.session))
      .catch((err) => {
        console.error('getSession failed:', err);
        if (alive) setLoading(false);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, newSession) => {
      applySession(newSession);
    });

    return () => {
      alive = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      localStorage.removeItem('mock_user_email');
      // Race Supabase signOut with a 1.2s timeout so slow networks never block signout
      await Promise.race([
        supabase.auth.signOut(),
        new Promise((resolve) => setTimeout(resolve, 1200))
      ]);
    } catch (err) {
      console.warn('signOut error:', err);
    } finally {
      // Clear storage and state immediately
      localStorage.clear();
      sessionStorage.clear();
      setSession(null);
      setUser(null);
      resetUserState();
      setLoading(false);
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{
      session, user, role, dealer, normalUser, provider,
      isAdmin, loading, signOut, refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
