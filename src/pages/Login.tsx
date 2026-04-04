import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Mail, Lock, ArrowRight, ShieldCheck, Zap, Target } from 'lucide-react';

async function getRedirectPath(userId: string): Promise<string> {
  const { data: roleData } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .maybeSingle();

  const role = roleData?.role;

  if (!role || role === 'admin') return '/admin';
  if (role === 'normal_user') return '/marketplace';

  if (role === 'dealer') {
    const { data: dealer } = await supabase
      .from('dealers')
      .select('approval_status')
      .eq('user_id', userId)
      .maybeSingle();
    const status = dealer?.approval_status;
    if (status === 'approved') return '/marketplace';
    if (status === 'rejected') return '/rejected';
    if (status === 'suspended') return '/suspended';
    return '/pending-approval';
  }

  if (role === 'provider') {
    const { data: provider } = await supabase
      .from('provider_profiles')
      .select('approval_status')
      .eq('id', userId)
      .maybeSingle();
    const status = provider?.approval_status;
    if (status === 'approved') return '/provider/leads';
    if (status === 'rejected') return '/provider/rejected';
    if (status === 'suspended') return '/provider/suspended';
    return '/provider/pending-approval';
  }

  return '/marketplace';
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // DEV BYPASS for test users
    const isTestUser = [
      'normal@mayax.test',
      'dealer@mayax.test',
      'provider@mayax.test',
      'admin@mayax.test'
    ].includes(email);

    if (isTestUser) {
      localStorage.setItem('mock_user_email', email);
      let mockId = '';
      if (email === 'normal@mayax.test') mockId = '11111111-1111-1111-1111-111111111111';
      else if (email === 'dealer@mayax.test') mockId = '22222222-2222-2222-2222-222222222222';
      else if (email === 'provider@mayax.test') mockId = '33333333-3333-3333-3333-333333333333';
      else if (email === 'admin@mayax.test') mockId = '44444444-4444-4444-4444-444444444444';
      const path = await getRedirectPath(mockId);
      window.location.href = path;
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    if (data.user) {
      const path = await getRedirectPath(data.user.id);
      navigate(path, { replace: true });
    }
    setLoading(false);
  };

  return (
    <div className="login-page-root">
      {/* Animated background */}
      <div className="login-bg-stars" />
      <div className="login-bg-glow login-bg-glow-1" />
      <div className="login-bg-glow login-bg-glow-2" />
      <div className="login-bg-glow login-bg-glow-3" />

      <div className="login-layout">
        {/* ── LEFT: Branding Panel ── */}
        <div className="login-left">
          {/* Logo mark */}
          <div className="login-logo-wrap">
            <div className="login-logo-icon">
              <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="login-logo-svg">
                <defs>
                  <linearGradient id="lg1" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Left diamond / arrow */}
                <polygon points="8,40 28,10 38,40 28,70" fill="url(#lg1)" filter="url(#glow)" opacity="0.9" />
                {/* Right arrow */}
                <polygon points="42,10 72,10 55,40 72,70 42,70 58,40" fill="url(#lg1)" filter="url(#glow)" opacity="0.85" />
                {/* Center bright line */}
                <line x1="38" y1="40" x2="55" y2="40" stroke="#c084fc" strokeWidth="3" filter="url(#glow)" />
              </svg>
            </div>
            <div className="login-logo-text">
              <span className="login-logo-maya">Maya</span>
              <span className="login-logo-x">X</span>
            </div>
            <div className="login-logo-sub">— LEAD HUB —</div>
          </div>

          {/* Tagline */}
          <h1 className="login-tagline">Buy Verified Auto Leads Instantly</h1>
          <p className="login-sub-tagline">
            AI-verified buyers. Real income. Real intent.<br />
            Delivered directly to your CRM.
          </p>

          {/* Feature badges */}
          <div className="login-badges">
            <div className="login-badge">
              <Target className="login-badge-icon" size={18} />
              <div>
                <div className="login-badge-title">PREMIUM</div>
                <div className="login-badge-desc">Verified Leads</div>
              </div>
            </div>
            <div className="login-badge">
              <Zap className="login-badge-icon login-badge-icon-cyan" size={18} />
              <div>
                <div className="login-badge-title">FAST</div>
                <div className="login-badge-desc">Instant Access</div>
              </div>
            </div>
            <div className="login-badge">
              <ShieldCheck className="login-badge-icon login-badge-icon-purple" size={18} />
              <div>
                <div className="login-badge-title">TRUSTED</div>
                <div className="login-badge-desc">Quality Buyers</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Auth Card ── */}
        <div className="login-right">
          <div className="login-card">
            {/* Card glow border */}
            <div className="login-card-glow" />

            <h2 className="login-card-title">Sign In or Create Account</h2>

            <form onSubmit={handleLogin} className="login-form">
              {/* Email */}
              <div className="login-field">
                <Mail className="login-field-icon" size={16} />
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="login-input"
                />
              </div>

              {/* Password */}
              <div className="login-field">
                <Lock className="login-field-icon" size={16} />
                <input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="login-input"
                />
              </div>

              {/* Forgot password */}
              <div className="login-forgot-row">
                <Link to="/reset-password" className="login-forgot-link">Forgot password?</Link>
              </div>

              {/* Submit */}
              <button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="login-btn-primary"
              >
                {loading ? 'Signing in…' : (
                  <>Login to Dashboard <ArrowRight size={16} className="login-btn-arrow" /></>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="login-divider">
              <span className="login-divider-line" />
              <span className="login-divider-text">OR</span>
              <span className="login-divider-line" />
            </div>

            {/* Create dealer account */}
            <Link to="/register" id="login-create-dealer" className="login-btn-secondary">
              Create Dealer Account
            </Link>

            {/* Trusted badge */}
            <div className="login-trusted">
              <ShieldCheck className="login-trusted-icon" size={22} />
              <div>
                <div className="login-trusted-title">TRUSTED</div>
                <div className="login-trusted-sub">Quality Buyers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Page root ── */
        .login-page-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #060818;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* ── Star-field bg ── */
        .login-bg-stars {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(1px 1px at 15% 20%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 45% 70%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 75% 30%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 60%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 30% 85%, rgba(255,255,255,0.45) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 10%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 5%  50%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 95%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 80% 80%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 25% 45%, rgba(255,255,255,0.45) 0%, transparent 100%);
          pointer-events: none;
        }

        /* ── Ambient glows ── */
        .login-bg-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .login-bg-glow-1 {
          width: 500px; height: 500px;
          top: -100px; left: -100px;
          background: radial-gradient(circle, rgba(88, 28, 235, 0.25) 0%, transparent 70%);
        }
        .login-bg-glow-2 {
          width: 400px; height: 400px;
          bottom: -80px; left: 30%;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%);
        }
        .login-bg-glow-3 {
          width: 350px; height: 350px;
          top: 20%; right: -80px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%);
        }

        /* ── Layout ── */
        .login-layout {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 60px;
          width: 100%;
          max-width: 1100px;
          padding: 40px 24px;
        }

        /* ── LEFT panel ── */
        .login-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
          min-width: 0;
        }

        /* Logo */
        .login-logo-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
        }
        .login-logo-icon {
          margin-bottom: 8px;
        }
        .login-logo-svg {
          width: 120px;
          height: 120px;
          filter: drop-shadow(0 0 24px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 48px rgba(6, 182, 212, 0.3));
        }
        .login-logo-text {
          font-size: 3rem;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .login-logo-maya {
          color: #ffffff;
          text-shadow: 0 0 30px rgba(255,255,255,0.2);
        }
        .login-logo-x {
          background: linear-gradient(135deg, #a855f7 0%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 12px rgba(168,85,247,0.8));
        }
        .login-logo-sub {
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          color: rgba(255,255,255,0.5);
          margin-top: 2px;
        }

        /* Taglines */
        .login-tagline {
          font-size: 1.75rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.25;
          margin: 0;
          text-shadow: 0 0 40px rgba(168,85,247,0.3);
        }
        .login-sub-tagline {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.65;
          margin: 0;
        }

        /* Badges */
        .login-badges {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 8px;
        }
        .login-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.85);
        }
        .login-badge-icon {
          color: #a855f7;
          flex-shrink: 0;
        }
        .login-badge-icon-cyan { color: #06b6d4; }
        .login-badge-icon-purple { color: #8b5cf6; }
        .login-badge-title {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #ffffff;
        }
        .login-badge-desc {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.5);
        }

        /* ── RIGHT card ── */
        .login-right {
          flex-shrink: 0;
          width: 380px;
        }
        .login-card {
          position: relative;
          background: rgba(15, 20, 45, 0.75);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(120, 140, 255, 0.18);
          border-radius: 20px;
          padding: 40px 36px;
          box-shadow:
            0 0 60px rgba(6, 182, 212, 0.12),
            0 0 120px rgba(88, 28, 235, 0.08),
            inset 0 1px 0 rgba(255,255,255,0.06);
          overflow: hidden;
        }

        /* Animated top glow border */
        .login-card-glow {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #a855f7 30%, #06b6d4 70%, transparent 100%);
          border-radius: 20px 20px 0 0;
        }

        /* Card title */
        .login-card-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #ffffff;
          text-align: center;
          margin: 0 0 28px;
        }

        /* Form */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        /* Input field row */
        .login-field {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(120, 140, 255, 0.15);
          border-radius: 10px;
          padding: 12px 16px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .login-field:focus-within {
          border-color: rgba(168, 85, 247, 0.5);
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
        }
        .login-field-icon {
          color: rgba(255,255,255,0.4);
          flex-shrink: 0;
        }
        .login-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-size: 0.9rem;
          font-family: inherit;
        }
        .login-input::placeholder {
          color: rgba(255,255,255,0.35);
        }

        /* Forgot link */
        .login-forgot-row {
          display: flex;
          justify-content: flex-end;
        }
        .login-forgot-link {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.2s;
        }
        .login-forgot-link:hover {
          color: rgba(255,255,255,0.75);
        }

        /* Primary button ── Login to Dashboard */
        .login-btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 14px 20px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #0284c7 100%);
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 0 20px rgba(124, 58, 237, 0.4), 0 4px 15px rgba(0,0,0,0.3);
          letter-spacing: 0.01em;
          margin-top: 4px;
        }
        .login-btn-primary:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 0 30px rgba(124, 58, 237, 0.55), 0 6px 20px rgba(0,0,0,0.35);
        }
        .login-btn-primary:active:not(:disabled) {
          transform: translateY(0);
        }
        .login-btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .login-btn-arrow {
          flex-shrink: 0;
        }

        /* Divider */
        .login-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
        }
        .login-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.1);
        }
        .login-divider-text {
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.1em;
        }

        /* Secondary button ── Create Dealer Account */
        .login-btn-secondary {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 13px 20px;
          border: 1px solid rgba(120, 140, 255, 0.25);
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.8);
          font-size: 0.9rem;
          font-weight: 600;
          font-family: inherit;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          box-sizing: border-box;
        }
        .login-btn-secondary:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(120, 140, 255, 0.4);
          color: #ffffff;
        }

        /* Trusted badge at bottom */
        .login-trusted {
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .login-trusted-icon {
          color: #8b5cf6;
          filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.7));
        }
        .login-trusted-title {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #ffffff;
        }
        .login-trusted-sub {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.45);
        }

        /* ── Responsive ── */
        @media (max-width: 820px) {
          .login-layout {
            flex-direction: column;
            align-items: center;
            gap: 36px;
            padding: 32px 16px;
          }
          .login-left {
            align-items: center;
            text-align: center;
          }
          .login-badges {
            justify-content: center;
          }
          .login-right {
            width: 100%;
            max-width: 420px;
          }
          .login-logo-wrap {
            align-items: center;
          }
          .login-tagline {
            font-size: 1.4rem;
            text-align: center;
          }
          .login-sub-tagline {
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 28px 20px;
          }
        }
      `}</style>
    </div>
  );
}
