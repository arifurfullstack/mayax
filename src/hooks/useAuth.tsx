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

  const loadUserData = async (userId: string) => {
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
    // admin: no extra profile table needed
  };

  const refreshProfile = async () => {
    if (user) await loadUserData(user.id);
  };

  useEffect(() => {
    let alive = true;

    const applySession = async (session: Session | null) => {
      // DEV BYPASS: Check if we have a mocked user
      const mockEmail = localStorage.getItem('mock_user_email');
      if (mockEmail && alive) {
        // Map mock email to predefined UUIDs
        let mockId = '';
        if (mockEmail === 'normal@mayax.test') mockId = '11111111-1111-1111-1111-111111111111';
        else if (mockEmail === 'dealer@mayax.test') mockId = '22222222-2222-2222-2222-222222222222';
        else if (mockEmail === 'provider@mayax.test') mockId = '33333333-3333-3333-3333-333333333333';
        else if (mockEmail === 'admin@mayax.test') mockId = '44444444-4444-4444-4444-444444444444';
        
        if (mockId) {
          const fakeUser = { id: mockId, email: mockEmail } as User;
          setSession({ user: fakeUser } as Session);
          setUser(fakeUser);
          await loadUserData(fakeUser.id);
          setLoading(false);
          return;
        }
      }

      if (!alive) return;
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await loadUserData(session.user.id);
      } else {
        setRole(null);
        setDealer(null);
        setNormalUser(null);
        setProvider(null);
        setIsAdmin(false);
      }

      if (alive) setLoading(false);
    };

    supabase.auth.getSession().then(({ data }) => applySession(data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => applySession(session));

    return () => {
      alive = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    localStorage.removeItem('mock_user_email');
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setRole(null);
    setDealer(null);
    setNormalUser(null);
    setProvider(null);
    setIsAdmin(false);
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
