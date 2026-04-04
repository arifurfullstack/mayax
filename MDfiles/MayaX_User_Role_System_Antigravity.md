# MAYAX LEAD HUB — USER ROLE SYSTEM BUILD PROMPT FOR ANTIGRAVITY

---

## OVERVIEW

Build a complete 4-role user system for MayaX Lead Hub — a two-sided automotive lead marketplace (similar to Fiverr but for car leads). There are two buyer roles who purchase leads, one seller role who lists leads, and one admin role who manages everything.

Tech stack: React + TypeScript, Tailwind CSS, Shadcn/UI, Supabase (auth + database + RLS + edge functions), Stripe (payments).

---

## THE 4 USER ROLES

### ROLE 1: NORMAL USER (Individual Buyer)

**Who they are:**
A single person — freelance car broker, independent sales agent, small operator, or anyone who wants to buy automotive leads but is NOT a registered dealership business.

**Registration flow:**
- Simple sign-up form: full name, email, phone, password
- No business verification required
- Account becomes active immediately after email verification (no admin approval needed)
- Default subscription tier: Basic (24-hour lead access delay)

**What they can do:**
- Browse the lead marketplace
- Apply filters to search leads
- Buy individual leads using wallet balance (single purchase only, NO batch/multi-select purchasing)
- Fund their wallet via Stripe
- View purchase history
- Receive purchased leads via email delivery only (NO webhook/CRM integration)
- Manage profile and notification settings

**What they CANNOT do:**
- Access Pro, Elite, or VIP subscription tiers (locked to Basic only)
- Use batch/multi-lead purchasing (bottom bar batch buy is hidden for this role)
- Configure webhook/CRM delivery (email delivery only)
- List or upload leads
- Access any admin features

**Their navigation:**
```
Top nav: [Logo] MAYAX LEAD HUB    Marketplace    Dashboard    $XXX.XX [Add Funds] [Avatar]
```
No "Upgrade Plan" link in their nav since they are locked to Basic tier.

**Their dashboard shows:**
- Wallet balance
- Current plan: "Basic" (no upgrade option, or show a message: "Upgrade to a Dealer account for faster access")
- Total leads purchased
- Recent purchases

---

### ROLE 2: DEALER (Business Buyer)

**Who they are:**
A registered car dealership — independent, franchise, subprime, or finance-focused dealer. This is the premium buyer role with full platform access.

**Registration flow:**
- Multi-step sign-up form:
  - Step 1: Business info — dealership name, business type (dropdown: Independent, Franchise, Subprime, Finance-Focused), business address, province/state, website
  - Step 2: Contact info — contact person name, email, phone, password
  - Step 3: Delivery preferences (optional) — notification email, webhook URL, webhook secret, delivery preference (email / webhook / both)
  - Step 4: Review and submit
- Account goes into "pending" status after submission
- Admin must review and approve before dealer can access the marketplace
- Dealer receives email notification on approval or rejection

**Approval statuses:**
- `pending` — just registered, waiting for admin review. Can only see pending approval page.
- `approved` — fully active, full marketplace access
- `rejected` — denied by admin. Sees rejection notice with reason. Cannot access platform.
- `suspended` — was approved but later suspended by admin. All features locked.

**What they can do (once approved):**
- Everything a Normal User can do, PLUS:
- Subscribe to any of the 4 tiers: Basic ($99/mo, 24h delay), Pro ($299/mo, 12h delay), Elite ($899/mo, 6h delay), VIP ($2,000/mo, instant access)
- Upgrade or downgrade subscription tier
- Batch/multi-lead purchasing (select multiple leads, buy all at once via bottom bar)
- Configure webhook/CRM delivery (webhook URL + secret + test webhook)
- Choose delivery method: email only, webhook only, or both
- Access full purchase history with delivery logs and re-send capability

**What they CANNOT do:**
- List or upload leads
- Access any admin features
- Access any provider features

**Their navigation:**
```
Top nav: [Logo] MAYAX LEAD HUB    Marketplace    Upgrade Plan    Dashboard    $X,XXX.XX [Add Funds] [Avatar]
```
Matches the UI screenshot exactly. "Upgrade Plan" link is visible for Dealers.

**Their dashboard shows:**
- Wallet balance with "Add Funds" link
- Current subscription tier with "Upgrade" link
- Total leads purchased
- Available leads count for their tier
- Recent purchases with delivery status
- Delivery health (last 5 webhook/email statuses)

---

### ROLE 3: PROVIDER (Lead Seller)

**Who they are:**
Lead generation companies, marketing agencies, independent lead generators, or any business that sources and sells automotive buyer leads. They are the supply side of the marketplace — like a Fiverr seller who lists gigs.

**Registration flow:**
- Provider-specific sign-up form:
  - Company/provider name
  - Contact person name
  - Email, phone, password
  - Business address
  - Website or portfolio URL
  - Description of lead sources / how they generate leads (textarea)
  - Payout method preference (for future: bank transfer, etc.)
- Account goes into "pending" status
- Admin must review and approve before provider can list leads
- Provider receives email notification on approval or rejection

**Approval statuses (same pattern as dealer):**
- `pending` — waiting for admin review
- `approved` — can list leads
- `rejected` — denied
- `suspended` — temporarily locked out

**What they can do (once approved):**

**List leads into the marketplace:**
- Provider has a "My Leads" dashboard where they can create and manage their leads
- "Add New Lead" form with fields:
  - Lead initials (2 letters, e.g. "MG")
  - Buyer type: Online Buyer / In-Store Buyer
  - Credit range min and max
  - Income (optional)
  - City and Province
  - Vehicle preference (optional)
  - Documents: 5 checkboxes (Driver License, Paystubs, Bank Statements, Credit Report, Pre-Approval Cert)
  - Document file uploads (stored in Supabase Storage)
  - AI Score (0-100) — or this may be set/overridden by admin
  - Quality Grade: A+, A, B, C — or this may be set/overridden by admin
  - Price: Provider suggests a price (admin may approve or adjust)
  - Lead PII (hidden from buyers): full name, phone number, email address
- Provider can also bulk import leads via CSV upload

**Lead approval workflow:**
- When a provider submits a lead, it goes into "pending_review" status
- Admin reviews the lead and can: approve (lead goes live in marketplace), reject (with reason), or request changes
- Lead statuses: `pending_review`, `approved` (live in marketplace), `rejected`, `sold`, `expired`
- Only `approved` leads appear in the marketplace for buyers
- Timer/countdown for buyer tiers starts from the moment admin approves the lead (not from when provider submitted it)

**Track their leads and earnings:**
- Provider dashboard shows:
  - Total leads listed
  - Leads pending review
  - Leads approved (live)
  - Leads sold
  - Total earnings
  - Earnings this month
  - Pending payout balance
- Leads table: reference code, status (badge), buyer type, price, date listed, date sold, earnings from sale
- Earnings breakdown per lead: sale price, platform commission, provider payout amount

**Revenue split / earnings model:**
- When a lead is sold, the revenue is split between the platform and the provider
- Example: Lead sells for $100 → Platform keeps 20% ($20) → Provider earns 80% ($80)
- The commission percentage should be configurable by admin in platform settings
- Provider sees their net earnings (after commission) in their dashboard
- Provider can request payouts (manual process for V1 — admin processes payouts)

**What they CANNOT do:**
- Buy leads from the marketplace
- Access any buyer features (marketplace browsing, wallet, purchasing)
- Access admin features
- Set final pricing (admin approves/adjusts the price)
- Override admin decisions on lead quality grade or AI score

**Their navigation (completely different from buyer nav):**
```
Top nav: [Logo] MAYAX LEAD HUB    My Leads    Add Lead    Earnings    Settings    [Avatar]
```

**Their pages:**

1. **My Leads** (`/provider/leads`) — Table of all leads they've submitted: reference code, initials, status (Pending Review / Approved / Rejected / Sold), buyer type, price, date submitted, date sold. Filters by status. Click to view/edit (if still pending).

2. **Add Lead** (`/provider/leads/new`) — Form to submit a new lead with all fields listed above. "Submit for Review" button. Success message: "Lead submitted. It will appear in the marketplace after admin approval."

3. **Bulk Import** (`/provider/leads/import`) — CSV/JSON upload, column mapping, preview, submit batch for review.

4. **Earnings** (`/provider/earnings`) — Summary cards: Total Earnings, This Month, Pending Payout, Leads Sold. Transaction table: date, lead reference, sale price, commission, net payout, status (earned / paid out). Payout request button (for future).

5. **Settings** (`/provider/settings`) — Profile editing, payout preferences, notification settings, password/security.

---

### ROLE 4: ADMIN (Platform Manager)

**Who they are:**
Internal platform operators who manage the entire marketplace — both the supply side (providers and leads) and the demand side (buyers/dealers).

**What they can do:**

**User management:**
- View all users across all roles (Normal Users, Dealers, Providers)
- Approve / reject / suspend any user account
- View detailed profile for any user
- For Dealers: see subscription, wallet, purchases, delivery logs
- For Providers: see listed leads, earnings, payout history
- For Normal Users: see purchases, wallet history
- Issue wallet credits or refunds to any buyer
- Change a user's role if needed

**Lead management:**
- View all leads from all providers + admin-created leads
- Review pending leads submitted by providers: approve, reject with reason, request changes, adjust price, adjust quality grade, adjust AI score
- Create leads directly (admin can also act as a provider — listing leads without going through approval)
- Edit any lead (price, quality, score, status)
- Bulk import leads
- Mark leads as sold/unsold (admin override)
- Delete leads

**Financial oversight:**
- View all wallet transactions across all buyers
- View all purchases
- Revenue dashboard: total revenue, subscription revenue, lead purchase revenue, platform commission earned, provider payouts due
- Process provider payouts (mark earnings as paid)
- Issue refunds and wallet adjustments

**Delivery monitoring:**
- View all delivery logs (email + webhook)
- See failed deliveries, re-trigger delivery
- Monitor delivery health

**Platform configuration:**
- Set subscription tier pricing and delay hours
- Set platform commission percentage (for provider revenue split)
- Set default lead price ranges
- Configure email templates
- Manage admin notification settings

**Admin can also list leads directly:**
- Admin has the same "Add Lead" capability as providers
- But admin-created leads skip the approval step — they go live immediately
- Admin-created leads are marked as `listed_by: "admin"` vs provider leads marked as `listed_by: provider_id`

**Their navigation (sidebar):**
```
📊 Dashboard          → /admin
👥 Users              → /admin/users (all roles in one view with role filter)
📄 Lead Review        → /admin/leads/review (pending provider leads)
📄 All Leads          → /admin/leads
➕ Add Lead           → /admin/leads/new
💳 Transactions       → /admin/transactions
💰 Provider Payouts   → /admin/payouts
📬 Delivery Logs      → /admin/delivery-logs
⚙️ Settings           → /admin/settings
```

---

## DATABASE CHANGES FOR 4-ROLE SYSTEM

### users (extends Supabase auth.users)

Create a `profiles` table that extends Supabase auth:

```
profiles table:
  id (uuid, primary key, references auth.users.id)
  role (text, required) — "normal_user", "dealer", "provider", "admin"
  display_name (text)
  email (text)
  phone (text)
  avatar_url (text, nullable)
  approval_status (text, default "pending") — "pending", "approved", "rejected", "suspended"
  rejection_reason (text, nullable)
  created_at (timestamptz)
  updated_at (timestamptz)
```

### dealer_profiles (only for role = "dealer")
```
  id (uuid, primary key, references profiles.id)
  dealership_name (text, required)
  business_type (text)
  business_address (text)
  province (text)
  website (text)
  subscription_tier (text, default "basic")
  wallet_balance (numeric, default 0.00)
  notification_email (text)
  webhook_url (text, nullable)
  webhook_secret (text, nullable)
  delivery_preference (text, default "email")
```

### normal_user_profiles (only for role = "normal_user")
```
  id (uuid, primary key, references profiles.id)
  full_name (text, required)
  wallet_balance (numeric, default 0.00)
  notification_email (text)
```

### provider_profiles (only for role = "provider")
```
  id (uuid, primary key, references profiles.id)
  company_name (text, required)
  contact_person (text, required)
  business_address (text)
  website (text)
  lead_source_description (text)
  total_earnings (numeric, default 0.00)
  pending_payout (numeric, default 0.00)
  payout_method (text, nullable)
  commission_rate (numeric, default 0.20) — platform takes 20% by default, admin can adjust per provider
```

### leads table (updated)
```
  ... (all existing fields) ...
  listed_by_role (text) — "provider" or "admin"
  listed_by_id (uuid, references profiles.id) — the provider or admin who created it
  review_status (text, default "approved") — "pending_review", "approved", "rejected"
  review_notes (text, nullable) — admin feedback on rejection or changes needed
  reviewed_by (uuid, nullable) — admin who approved/rejected
  reviewed_at (timestamptz, nullable)
  provider_payout_amount (numeric, nullable) — what the provider earns from this lead sale
  provider_payout_status (text, default "pending") — "pending", "paid"
  approved_at (timestamptz, nullable) — when admin approved (this is when tier timers START)
```

For leads created by admin: `review_status` is set to "approved" immediately and `approved_at` is set to `created_at`.

For leads created by providers: `review_status` starts as "pending_review". Tier countdown timers start from `approved_at`, NOT `created_at`.

### provider_payouts (new table)
```
  id (uuid, primary key)
  provider_id (uuid, references profiles.id)
  amount (numeric)
  leads_count (integer) — how many lead sales included
  status (text) — "pending", "processing", "paid", "failed"
  requested_at (timestamptz)
  processed_at (timestamptz, nullable)
  processed_by (uuid, nullable) — admin who processed it
  notes (text, nullable)
```

---

## ROW LEVEL SECURITY (RLS) RULES

### profiles table
- Users can read and update their own profile only
- Admin can read and update all profiles

### dealer_profiles / normal_user_profiles / provider_profiles
- Users can read and update their own role-specific profile only
- Admin can read and update all

### leads table
- Normal Users and Dealers can SELECT leads where `review_status = 'approved'` AND `sold_status = 'available'`
- Normal Users and Dealers CANNOT read: full_name, phone, lead_email, documents (use a Supabase view that excludes these columns)
- Providers can SELECT leads where `listed_by_id = their own id` (they see all their own leads regardless of status)
- Providers CANNOT read PII of OTHER providers' leads
- Admin can read all leads

### purchases table
- Normal Users and Dealers can read their own purchases only
- Admin can read all purchases

### wallet_transactions table
- Normal Users and Dealers can read their own transactions only
- Admin can read all transactions

### provider_payouts table
- Providers can read their own payouts only
- Admin can read and update all payouts

### delivery_logs table
- Normal Users and Dealers can read logs linked to their own purchases
- Admin can read all logs

---

## REGISTRATION FLOW ROUTING

On the sign-up page (`/register`), show a role selector FIRST before the form:

**"I want to..."**
- **"Buy Leads (Individual)"** → Normal User registration flow (simple form, auto-approved)
- **"Buy Leads (Dealership)"** → Dealer registration flow (multi-step business form, requires admin approval)
- **"Sell Leads (Provider)"** → Provider registration flow (company form, requires admin approval)

Use 3 cards or buttons with icons and descriptions:
- Card 1: Person icon — "Individual Buyer" — "I'm a freelance broker or independent agent looking to buy automotive leads" → Normal User
- Card 2: Building icon — "Dealership" — "I represent a car dealership and want full marketplace access with priority tiers" → Dealer
- Card 3: Upload icon — "Lead Provider" — "I generate automotive leads and want to sell them on the marketplace" → Provider

After selection, show the appropriate registration form for that role.

---

## LOGIN ROUTING LOGIC

After successful login, check the user's `role` and `approval_status` to determine where to redirect:

```
IF role = "normal_user":
  → /marketplace (always, no approval needed)

IF role = "dealer":
  IF approval_status = "pending" → /pending-approval
  IF approval_status = "approved" → /marketplace
  IF approval_status = "rejected" → /rejected (show reason)
  IF approval_status = "suspended" → /suspended

IF role = "provider":
  IF approval_status = "pending" → /provider/pending-approval
  IF approval_status = "approved" → /provider/leads
  IF approval_status = "rejected" → /provider/rejected
  IF approval_status = "suspended" → /provider/suspended

IF role = "admin":
  → /admin
```

---

## NAVIGATION BARS PER ROLE

Each role sees a completely different navigation:

**Normal User nav:**
```
[Logo] MAYAX LEAD HUB    Marketplace    Dashboard    $XXX.XX [Add Funds] [Avatar ▾]
Avatar dropdown: Profile, Settings, Logout
```

**Dealer nav:**
```
[Logo] MAYAX LEAD HUB    Marketplace    Upgrade Plan    Dashboard    $X,XXX.XX [Add Funds] [Avatar ▾]
Avatar dropdown: Wallet, Purchases, Settings, Logout
```

**Provider nav:**
```
[Logo] MAYAX LEAD HUB    My Leads    Add Lead    Earnings    [Avatar ▾]
Avatar dropdown: Settings, Logout
```

**Admin nav (sidebar, not top bar):**
```
Sidebar:
📊 Dashboard
👥 Users
📄 Lead Review
📄 All Leads
➕ Add Lead
💳 Transactions
💰 Provider Payouts
📬 Delivery Logs
⚙️ Settings
```

---

## MARKETPLACE BEHAVIOR DIFFERENCES BY BUYER ROLE

The marketplace page (`/marketplace`) is shared by Normal Users and Dealers, but with these differences:

| Feature | Normal User | Dealer |
|---|---|---|
| Browse leads | ✅ | ✅ |
| Apply filters | ✅ | ✅ |
| Subscription tier | Basic only (24h delay) | Any tier (Basic/Pro/Elite/VIP) |
| See "Upgrade Plan" nav link | ❌ Hidden | ✅ Visible |
| See "Upgrade to Unlock" on locked leads | Shows "Available in Xh" (no upgrade CTA) | Shows "Upgrade to Unlock" with tier suggestion |
| Single lead purchase | ✅ | ✅ |
| Multi-lead batch purchase (bottom bar) | ❌ Hidden | ✅ Visible |
| Delivery method | Email only | Email, Webhook, or Both |
| Webhook/CRM settings | ❌ Not available | ✅ Full webhook config |

---

## PROVIDER EARNINGS FLOW

When a lead listed by a provider is sold:

```
1. Buyer purchases lead for $100
2. System calculates split:
   - Platform commission: $100 × 20% = $20
   - Provider payout: $100 × 80% = $80
3. Provider's total_earnings increments by $80
4. Provider's pending_payout increments by $80
5. Lead's provider_payout_amount = $80, provider_payout_status = "pending"
6. Provider sees the earned amount in their Earnings dashboard
7. When admin processes payout:
   - Create provider_payouts record
   - Decrement provider's pending_payout
   - Update lead's provider_payout_status = "paid"
```

Commission rate is configurable per provider (default 20%, admin can adjust).

---

## LEAD LIFECYCLE (UPDATED FOR PROVIDER FLOW)

```
Provider submits lead
    ↓
review_status = "pending_review"
    ↓
Admin reviews lead
    ↓
  ┌─── APPROVED ──────────────────────────────────┐
  │ review_status = "approved"                     │
  │ approved_at = now()                            │
  │ Tier countdown timers START from approved_at   │
  │ Lead appears in marketplace                    │
  │     ↓                                          │
  │ VIP sees immediately                           │
  │ ELITE sees after 6h                            │
  │ PRO sees after 12h                             │
  │ BASIC / Normal User sees after 24h             │
  │     ↓                                          │
  │ Buyer purchases lead                           │
  │     ↓                                          │
  │ sold_status = "sold"                           │
  │ Lead removed from marketplace                  │
  │ Provider earns payout                          │
  │ Lead delivered to buyer                        │
  └────────────────────────────────────────────────┘
  │
  ├─── REJECTED ──→ Provider notified with reason, can edit and resubmit
  │
  └─── CHANGES REQUESTED ──→ Provider edits and resubmits
```

For admin-created leads: skip the review step, goes live immediately.

---

## SUMMARY OF WHAT TO BUILD

1. **Shared auth system** with role selector on registration
2. **4 separate registration forms** (Normal User, Dealer, Provider, Admin created manually)
3. **Login routing** based on role + approval_status
4. **4 different navigation bars** per role
5. **Marketplace page** shared by Normal User and Dealer with feature differences
6. **Provider portal** (My Leads, Add Lead, Bulk Import, Earnings, Settings)
7. **Admin panel** (Users, Lead Review, All Leads, Add Lead, Transactions, Provider Payouts, Delivery Logs, Settings)
8. **Lead review/approval workflow** for provider-submitted leads
9. **Provider earnings + payout system** with configurable commission
10. **RLS policies** enforcing role-based data access across all tables

Build these in this order:
1. Auth + registration flows + role routing
2. Database tables + RLS policies
3. Admin panel: user management (approve/reject all roles)
4. Provider portal: add lead + my leads
5. Admin: lead review/approval
6. Dealer: subscription tiers + Stripe
7. Normal User + Dealer: wallet system
8. Marketplace page with role-based feature toggling
9. Purchase flow (single + batch)
10. Lead delivery (email + webhook)
11. Provider earnings dashboard + admin payout processing
12. All remaining pages (dashboard, settings, history, delivery logs)
