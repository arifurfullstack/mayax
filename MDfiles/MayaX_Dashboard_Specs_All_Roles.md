# MAYAX LEAD HUB — DASHBOARD SPECIFICATIONS FOR ALL 4 USER ROLES

---

## ROLE 1: NORMAL USER DASHBOARD

**Route:** `/dashboard`

This is a simple, clean dashboard for an individual lead buyer. They have limited features compared to Dealers, so the dashboard is straightforward.

---

### NAVIGATION (Top Bar)

```
[Car Icon] MAYAX LEAD HUB    Marketplace    Dashboard    $XXX.XX [Add Funds] [Avatar ▾]

Avatar dropdown menu:
  → My Purchases
  → Wallet
  → Settings
  → Logout
```

No "Upgrade Plan" link — Normal Users are locked to Basic tier.

---

### SIDEBAR MENU (Left Side)

```
📊 Dashboard          → /dashboard (active)
🏪 Marketplace        → /marketplace
📦 My Purchases       → /purchases
💰 Wallet             → /wallet
⚙️ Settings           → /settings
```

---

### DASHBOARD PAGE LAYOUT

#### ROW 1 — Summary Metric Cards (4 cards in a row)

**Card 1: Wallet Balance**
- Large number: "$450.00"
- Small text below: "Available Balance"
- Link/button: "Add Funds" (green text link)
- Icon: Wallet icon (top-right of card)

**Card 2: My Plan**
- Large text: "BASIC"
- Small text: "24-hour lead access delay"
- Link: "Become a Dealer for faster access →" (links to a page explaining dealer benefits or contact form)
- Icon: Shield/tier icon
- This card has a subtle muted style since they can't upgrade

**Card 3: Leads Purchased**
- Large number: "12"
- Small text: "Total leads bought"
- Trend indicator: "+3 this month" (green arrow up)
- Icon: Shopping bag icon

**Card 4: Available Leads**
- Large number: "47"
- Small text: "Leads available to you now"
- This counts only leads that are currently unlocked for Basic tier (24h+ old)
- Link: "Browse Marketplace →"
- Icon: Grid/list icon

#### ROW 2 — Recent Purchases (Left) + Spending Overview (Right)

**Left panel: Recent Purchases (60% width)**
- Title: "Recent Purchases"
- Table with last 5 purchases:
  - Lead Reference (e.g. "MLH-1042")
  - Lead Initials (e.g. "MG")
  - Buyer Type badge (Online / In-Store)
  - Price Paid (e.g. "$85.00")
  - Date (e.g. "Mar 28, 2026")
  - Delivery Status badge (Sent = green, Pending = yellow, Failed = red)
- "View All Purchases →" link at bottom → navigates to `/purchases`
- If no purchases yet: empty state — "You haven't purchased any leads yet." with "Browse Marketplace" button

**Right panel: Spending This Month (40% width)**
- Title: "Spending This Month"
- Large number: "$340.00" (total spent on leads this month)
- Small chart: simple bar chart or line chart showing daily/weekly spending for the current month
- Below chart:
  - "Leads bought this month: 4"
  - "Average lead cost: $85.00"

#### ROW 3 — Quick Actions

**3 action cards in a row:**

- **"Browse Marketplace"** — Large icon (search/grid), description "Find and buy verified automotive leads", green CTA button → `/marketplace`
- **"Add Funds to Wallet"** — Large icon (wallet/plus), description "Top up your wallet balance to purchase leads", outlined CTA button → `/wallet`
- **"View Purchase History"** — Large icon (receipt), description "See all leads you've purchased and their delivery status", outlined CTA button → `/purchases`

---

### NORMAL USER — OTHER PAGES

**My Purchases** (`/purchases`):
- Full paginated table: Reference, Initials, Buyer Type, Credit Range, Location, Price Paid, Date, Delivery Status
- Click row → modal with full purchased lead details (name, phone, email, docs), delivery log
- Filter by date range, delivery status
- No "Re-send via Webhook" option (Normal Users get email delivery only)

**Wallet** (`/wallet`):
- Balance display + Add Funds flow (Stripe)
- Transaction history table: Date, Type badge (Top Up / Purchase / Refund), Description, Amount, Balance After
- Filter by type, date range

**Settings** (`/settings`):
- Profile: Full name, email, phone. Edit and save.
- Notifications: Notification email, purchase confirmation toggle, low balance alert toggle
- Security: Change password, active sessions
- No webhook/CRM tab (not available for Normal Users)

---
---

## ROLE 2: DEALER DASHBOARD

**Route:** `/dashboard`

This is the premium buyer dashboard with full features — subscriptions, batch purchasing history, webhook health, and upgrade prompts.

---

### NAVIGATION (Top Bar — matches UI screenshot)

```
[Car Icon] MAYAX LEAD HUB    Marketplace    Upgrade Plan    Dashboard    $1,725.00 [Add Funds] [Avatar ▾]

Avatar dropdown menu:
  → My Purchases
  → Wallet & Billing
  → Settings
  → Logout
```

---

### SIDEBAR MENU (Left Side)

```
📊 Dashboard          → /dashboard (active)
🏪 Marketplace        → /marketplace
📋 Upgrade Plan       → /upgrade-plan
📦 My Purchases       → /purchases
💰 Wallet & Billing   → /wallet
⚙️ Settings           → /settings
```

---

### DASHBOARD PAGE LAYOUT

#### ROW 1 — Summary Metric Cards (5 cards in a row, scrollable on mobile)

**Card 1: Wallet Balance**
- Large number: "$1,725.00"
- Small text: "Available Balance"
- Link: "Add Funds →" (green)
- Warning state: If balance < $100, show amber border + "Low balance" label
- Icon: Wallet icon

**Card 2: Current Plan**
- Large text with tier badge: "PRO" (blue badge) or "ELITE" (gold badge) etc.
- Small text: "12-hour lead access delay" (based on tier)
- Link: "Upgrade Plan →" → `/upgrade-plan`
- If already VIP: show "⚡ Instant Access" with green checkmark, no upgrade link
- Icon: Crown/shield icon

**Card 3: Leads Purchased**
- Large number: "47"
- Small text: "Total leads bought"
- Trend: "+8 this month" (green arrow up) or "-2 vs last month" (red arrow down)
- Icon: Shopping bag icon

**Card 4: Available Leads**
- Large number: "156"
- Small text: "Available for your tier now"
- This counts leads currently unlocked for the dealer's subscription tier
- Link: "Browse Marketplace →"
- Icon: Grid icon

**Card 5: Leads Unlocking Soon**
- Large number: "23"
- Small text: "Unlocking in next 6 hours"
- This shows leads that are currently locked for the dealer's tier but will unlock within 6 hours
- Creates urgency: "Upgrade to access these now →"
- Icon: Clock/timer icon

#### ROW 2 — Recent Purchases (Left) + Delivery Health (Right)

**Left panel: Recent Purchases (55% width)**
- Title: "Recent Purchases"
- Table with last 8 purchases:
  - Lead Reference ("MLH-1042")
  - Initials ("MG")
  - Buyer Type badge
  - Credit Range ("620-680")
  - Price Paid ("$85.00")
  - Date
  - Delivery Method badge (Email / Webhook / Both)
  - Delivery Status badge (Sent / Pending / Failed)
- "View All →" link → `/purchases`
- Empty state: "No purchases yet. Browse the marketplace to find your first lead."

**Right panel: Delivery Health (45% width)**
- Title: "Delivery Health"
- Summary badges at top:
  - "✅ 42 Delivered" (green)
  - "⏳ 2 Pending" (yellow)
  - "❌ 3 Failed" (red)
- Last 5 delivery attempts listed:
  - Channel icon (email envelope / webhook code bracket)
  - Lead reference
  - Timestamp
  - Status badge
  - If failed: small "Retry" link
- If any failures in last 24h: Alert banner at top: "⚠️ 3 deliveries failed recently. Check your webhook settings." with link to `/settings` (CRM tab)
- "View All Delivery Logs →" link → `/purchases` (filtered to failed)

#### ROW 3 — Spending Analytics + Subscription Info

**Left panel: Spending Overview (55% width)**
- Title: "Spending Overview"
- Time period selector: "This Week / This Month / Last 30 Days / All Time"
- Bar chart or area chart showing spending over time (daily or weekly bars)
- Below chart stats:
  - "Total spent: $2,340.00"
  - "Leads purchased: 28"
  - "Average cost per lead: $83.57"
  - "Most purchased quality: A" (shows which grade they buy most)

**Right panel: Subscription Details (45% width)**
- Title: "Your Subscription"
- Current tier card:
  - Tier name with badge: "PRO"
  - Price: "$299/month"
  - Access delay: "12-hour delay"
  - Billing status: "Active — renews Apr 15, 2026"
  - Payment method: "Visa ending 4242"
- "Upgrade Plan →" button (green, prominent) → `/upgrade-plan`
- "Manage Billing →" link → `/wallet`
- If VIP: Show "⚡ You have the fastest access. No upgrade needed." with gold styling

#### ROW 4 — Quick Actions

**4 action cards:**
- **"Browse Marketplace"** → `/marketplace`
- **"Upgrade Plan"** → `/upgrade-plan` (hidden if VIP)
- **"Add Funds"** → `/wallet`
- **"Configure Webhook"** → `/settings` (CRM tab)

---

### DEALER — OTHER PAGES

**My Purchases** (`/purchases`):
- Full paginated table with all purchase details
- Click row → full lead details modal (PII visible since they own it), delivery log, "Re-send Email" button, "Re-send Webhook" button
- Filters: date range, delivery status, delivery method, quality grade
- Export to CSV button

**Wallet & Billing** (`/wallet`):
- Balance + Add Funds (same as Normal User but larger preset amounts: $250, $500, $1,000, $2,500, Custom)
- Transaction history with full filtering
- Subscription billing history (past invoices from Stripe)

**Upgrade Plan** (`/upgrade-plan`):
- 4-tier comparison cards (Basic/Pro/Elite/VIP)
- Current plan highlighted
- Upgrade/downgrade flows via Stripe

**Settings** (`/settings`):
- Tab 1 — Profile: dealership name, contact person, phone, address, website, business type
- Tab 2 — Notifications: notification email, CC emails, toggles for all notification types
- Tab 3 — CRM / Webhook: webhook URL, secret, delivery preference, test webhook button, payload preview
- Tab 4 — Security: change password, sessions

---
---

## ROLE 3: PROVIDER DASHBOARD

**Route:** `/provider`

This is a completely different experience. Providers are sellers — they list leads and track earnings. They never see the marketplace or buy anything. Think Fiverr seller dashboard.

---

### NAVIGATION (Top Bar — Provider branded)

```
[Car Icon] MAYAX LEAD HUB    My Leads    Add Lead    Earnings    [Avatar ▾]

Avatar dropdown menu:
  → Settings
  → Help / Support
  → Logout
```

No wallet, no marketplace, no purchasing links. This is a seller portal.

---

### SIDEBAR MENU (Left Side)

```
📊 Dashboard          → /provider (active)
📄 My Leads           → /provider/leads
➕ Add New Lead       → /provider/leads/new
📦 Bulk Import        → /provider/leads/import
💰 Earnings           → /provider/earnings
📈 Analytics          → /provider/analytics
⚙️ Settings           → /provider/settings
```

---

### DASHBOARD PAGE LAYOUT

#### ROW 1 — Summary Metric Cards (5 cards)

**Card 1: Total Leads Listed**
- Large number: "284"
- Small text: "All time leads submitted"
- Trend: "+18 this month"
- Icon: Document/list icon

**Card 2: Leads Live**
- Large number: "42"
- Small text: "Currently in marketplace"
- These are leads with `review_status = 'approved'` AND `sold_status = 'available'`
- Green indicator dot (pulsing) to show "live"
- Icon: Globe/live icon

**Card 3: Leads Pending Review**
- Large number: "7"
- Small text: "Awaiting admin approval"
- If count > 0: amber/yellow card border to draw attention
- Link: "View Pending →" → `/provider/leads?status=pending_review`
- Icon: Clock icon

**Card 4: Leads Sold**
- Large number: "235"
- Small text: "Total leads sold"
- Trend: "+12 this month" (green arrow)
- Icon: Check/sold icon

**Card 5: Total Earnings**
- Large number: "$18,800.00"
- Small text: "All time earnings (after commission)"
- Trend: "+$960.00 this month"
- Green styling — this is the most important number for a provider
- Icon: Dollar/money icon

#### ROW 2 — Earnings Overview (Left) + Lead Status Breakdown (Right)

**Left panel: Earnings Overview (55% width)**
- Title: "Earnings Overview"
- Time period selector: "This Week / This Month / Last 30 Days / All Time"
- Area chart or bar chart showing earnings over time
- Below chart stats:
  - "Earnings this month: $960.00"
  - "Leads sold this month: 12"
  - "Average earning per lead: $80.00"
  - "Platform commission rate: 20%"
  - "Pending payout: $480.00" (earnings earned but not yet paid out)
- "Request Payout →" button (if pending payout > $0)

**Right panel: Lead Status Breakdown (45% width)**
- Title: "Lead Status"
- Donut chart or stacked bar showing:
  - Live (green): 42 leads
  - Pending Review (amber): 7 leads
  - Sold (blue): 235 leads
  - Rejected (red): 3 leads
- Below chart: list format of the same data with counts and percentages
- "Manage All Leads →" link → `/provider/leads`

#### ROW 3 — Recent Lead Activity (Left) + Recent Sales (Right)

**Left panel: Recent Lead Activity (50% width)**
- Title: "Recent Activity"
- Timeline/feed showing the last 10 events related to the provider's leads:
  - "MLH-2084 was approved by admin" — green badge — 2 hours ago
  - "MLH-2081 was purchased by a dealer" — blue badge — 5 hours ago
  - "MLH-2079 was rejected: Missing credit range data" — red badge — 1 day ago
  - "MLH-2076 submitted for review" — amber badge — 1 day ago
  - "MLH-2070 was purchased by a dealer" — blue badge — 2 days ago
- Each entry: lead reference, event description, status badge, relative timestamp
- Provider does NOT see which dealer purchased (dealer identity is private)
- "View All Activity →" link

**Right panel: Recent Sales (50% width)**
- Title: "Recent Sales"
- Table with last 5 sold leads:
  - Lead Reference ("MLH-2081")
  - Quality Grade badge (A+/A/B/C)
  - Sale Price ("$100.00")
  - Commission ("$20.00")
  - Your Earning ("$80.00", green text)
  - Sold Date
  - Payout Status badge (Pending / Paid)
- "View All Sales →" link → `/provider/earnings`

#### ROW 4 — Performance Metrics + Quick Actions

**Left panel: Performance Metrics (50% width)**
- Title: "Your Performance"
- Stat cards or a simple list:
  - **Approval Rate:** "96%" — percentage of submitted leads that get approved (green if >90%, amber if 70-90%, red if <70%)
  - **Average Sale Time:** "4.2 hours" — average time from lead going live to being purchased
  - **Top Quality Grade Listed:** "A" — most common grade in their leads
  - **Most Popular Location:** "Toronto, ON" — location with most sales
  - **Repeat Buyer Rate:** "38%" — percentage of sales to dealers who bought from this provider before (if trackable)

**Right panel: Quick Actions (50% width)**
- **"Add New Lead"** — Large icon (plus), description "Submit a new lead for review", green CTA → `/provider/leads/new`
- **"Bulk Import Leads"** — Large icon (upload), description "Upload CSV or JSON file with multiple leads", outlined CTA → `/provider/leads/import`
- **"View Earnings"** — Large icon (dollar), description "Track your sales and request payouts", outlined CTA → `/provider/earnings`
- **"Edit Settings"** — Large icon (gear), description "Update your profile and payout preferences", outlined CTA → `/provider/settings`

---

### PROVIDER — OTHER PAGES

**My Leads** (`/provider/leads`):
- Full paginated table of all their leads:
  - Reference Code, Initials, Buyer Type, Credit Range, Location, Quality Grade, Price, Review Status (badge: Pending Review=amber, Approved=green, Rejected=red, Sold=blue), Date Submitted
- Filters: Review Status, Quality Grade, Date Range
- Search by reference code
- Click row → lead detail view:
  - All lead fields (editable if status is `pending_review` or `rejected`)
  - If rejected: show admin's rejection reason + "Edit & Resubmit" button
  - If approved: show approved date, read-only (provider cannot edit live leads)
  - If sold: show sale date, sale price, provider earning, payout status
- Provider CANNOT see buyer/dealer identity on sold leads

**Add New Lead** (`/provider/leads/new`):
- Form with all lead fields:
  - Initials (2 letters)
  - Buyer type radio: Online / In-Store
  - Credit range min and max (number inputs)
  - Income (optional number)
  - City + Province
  - Vehicle preference (optional)
  - Documents: 5 checkboxes + file uploads per document
  - AI Score suggestion (0-100) — admin may override
  - Quality Grade suggestion (A+/A/B/C) — admin may override
  - Suggested Price — admin may adjust
  - Full name, phone, email (the PII)
- "Submit for Review" button
- Success: "Lead submitted! It will appear in the marketplace after admin approval. You'll be notified when it's reviewed."

**Bulk Import** (`/provider/leads/import`):
- File upload (CSV or JSON)
- Column mapping interface
- Preview first 5-10 rows
- "Submit X Leads for Review" button
- Results: X submitted, X failed with row-level errors
- All bulk-imported leads go into `pending_review` status

**Earnings** (`/provider/earnings`):
- Top cards:
  - Total Earnings (all time)
  - Earnings This Month
  - Pending Payout (earned but not yet paid)
  - Paid Out (total payouts received)
- Sales table (paginated):
  - Date Sold, Lead Reference, Quality Grade, Sale Price, Commission (%), Commission Amount, Your Earning, Payout Status (Pending / Paid)
- Filter by: date range, payout status, quality grade
- Export to CSV
- "Request Payout" button → modal confirming amount, submits payout request to admin

**Analytics** (`/provider/analytics`):
- Charts and insights:
  - Leads submitted per month (bar chart)
  - Approval rate trend (line chart)
  - Sales by quality grade (pie chart)
  - Average time to sell by grade (bar chart)
  - Top performing locations (horizontal bar chart)
  - Earnings trend (area chart over months)
- This page helps providers understand what types of leads sell best so they can optimize

**Settings** (`/provider/settings`):
- Tab 1 — Profile: company name, contact person, phone, address, website, lead source description
- Tab 2 — Payout Preferences: payout method (bank transfer / PayPal / other for future), payout email, minimum payout threshold
- Tab 3 — Notifications: toggles for — lead approved, lead rejected, lead sold, payout processed, weekly summary email
- Tab 4 — Security: change password, active sessions

---
---

## ROLE 4: ADMIN DASHBOARD

**Route:** `/admin`

The admin sees everything across the entire platform — all users, all leads, all money, all deliveries. This is the command center.

---

### NAVIGATION (Sidebar — No Top Nav Links)

Admin uses a left sidebar navigation, not the top bar links. The top bar only shows:

```
Top bar: [Logo] MAYAX LEAD HUB                          [Notifications Bell 🔔] [Admin Avatar ▾]

Avatar dropdown: Profile, Logout
```

### SIDEBAR MENU (Left Side)

```
📊 Dashboard              → /admin (active)
👥 User Management        → /admin/users
   ├─ Normal Users        → /admin/users?role=normal_user
   ├─ Dealers             → /admin/users?role=dealer
   └─ Providers           → /admin/users?role=provider
📄 Lead Management
   ├─ Lead Review Queue   → /admin/leads/review
   ├─ All Leads           → /admin/leads
   └─ Add Lead            → /admin/leads/new
💳 Financial
   ├─ Transactions        → /admin/transactions
   ├─ Subscriptions       → /admin/subscriptions
   └─ Provider Payouts    → /admin/payouts
📬 Delivery Logs          → /admin/delivery-logs
⚙️ Platform Settings      → /admin/settings
```

---

### DASHBOARD PAGE LAYOUT

#### ROW 1 — Key Platform Metrics (6 cards, 3 per row on desktop)

**Card 1: Total Users**
- Large number: "342"
- Breakdown below: "Normal: 180 | Dealers: 120 | Providers: 42"
- Trend: "+15 this week"
- Icon: People icon

**Card 2: Pending Approvals**
- Large number: "8"
- Breakdown: "Dealers: 3 | Providers: 5"
- If count > 0: RED border + pulsing dot to draw immediate attention
- Link: "Review Now →" → `/admin/users?status=pending`
- Icon: Clock icon with alert

**Card 3: Leads in Marketplace**
- Large number: "156"
- Breakdown: "Available: 156 | Pending Review: 12"
- Link: "Manage Leads →"
- Icon: Grid icon

**Card 4: Leads Sold This Month**
- Large number: "89"
- Trend: "+12% vs last month" (green) or "-5% vs last month" (red)
- Icon: Check/sale icon

**Card 5: Revenue This Month**
- Large number: "$8,940.00"
- Breakdown:
  - "Subscriptions: $5,200.00"
  - "Lead purchases: $3,740.00"
- Trend: "+18% vs last month"
- Icon: Dollar icon
- Green card styling — this is the most important admin metric

**Card 6: Platform Commission Earned**
- Large number: "$748.00"
- Small text: "From provider lead sales this month"
- This is the platform's cut from provider-listed lead sales
- Breakdown: "Provider payouts due: $2,992.00"
- Icon: Percentage icon

#### ROW 2 — Pending Actions Panel (Full Width Alert Section)

This is a full-width alert/action section that only appears when there are items needing admin attention. If nothing is pending, this row collapses/hides.

**Alert cards (horizontal, scrollable if many):**

- **"3 Dealers Pending Approval"** — amber card — "Review dealer applications" — "Review →" button → `/admin/users?role=dealer&status=pending`
- **"5 Providers Pending Approval"** — amber card — "Review provider applications" — "Review →" button → `/admin/users?role=provider&status=pending`
- **"12 Leads Pending Review"** — amber card — "Provider-submitted leads awaiting your review" — "Review →" button → `/admin/leads/review`
- **"4 Failed Deliveries"** — red card — "Lead deliveries that failed in the last 24h" — "View →" button → `/admin/delivery-logs?status=failed`
- **"2 Payout Requests"** — blue card — "Providers requesting payout" — "Process →" button → `/admin/payouts?status=pending`

Each card has an icon, count, description, and action button. If count is 0 for any category, that card does not appear.

#### ROW 3 — Revenue Chart (Left) + User Growth (Right)

**Left panel: Revenue Overview (55% width)**
- Title: "Revenue Overview"
- Time period selector: "7 Days / 30 Days / 90 Days / 12 Months"
- Stacked area chart or grouped bar chart showing:
  - Subscription revenue (one color, e.g. blue)
  - Lead purchase revenue (another color, e.g. green)
  - Platform commission from providers (third color, e.g. purple)
- Below chart totals for selected period:
  - "Total Revenue: $XX,XXX"
  - "Subscriptions: $X,XXX"
  - "Lead Sales: $X,XXX"
  - "Commission: $X,XXX"

**Right panel: User Growth (45% width)**
- Title: "User Growth"
- Line chart with 3 lines: Normal Users, Dealers, Providers over time
- Current totals below:
  - "Normal Users: 180 (5 new this week)"
  - "Dealers: 120 (2 new this week)"
  - "Providers: 42 (1 new this week)"
- "View All Users →" link

#### ROW 4 — Recent Activity Feed (Left) + Lead Pipeline (Right)

**Left panel: Recent Activity Feed (50% width)**
- Title: "Recent Activity"
- Real-time feed of the last 15-20 platform events, newest first:
  - "Dealer 'Toronto Auto Group' was approved" — green badge — Admin Name — 10 min ago
  - "Lead MLH-2084 was purchased by 'Hamilton Motors'" — blue badge — 25 min ago
  - "Provider 'LeadGen Pro' submitted 5 new leads" — amber badge — 1 hour ago
  - "Dealer 'Ottawa Cars Inc' funded wallet: +$500" — green badge — 2 hours ago
  - "Webhook delivery failed for Lead MLH-2080 → Hamilton Motors" — red badge — 3 hours ago
  - "Lead MLH-2079 rejected: incomplete data" — red badge — 4 hours ago
  - "Provider 'QuickLeads' requested payout: $640" — blue badge — 5 hours ago
- Each entry: icon, description, badge, actor (if relevant), relative timestamp
- "View Full Activity Log →" link
- Auto-refresh every 30 seconds or use Supabase Realtime

**Right panel: Lead Pipeline (50% width)**
- Title: "Lead Pipeline"
- Visual funnel or status breakdown:
  - "Pending Review: 12 leads" (amber bar)
  - "Live in Marketplace: 156 leads" (green bar)
  - "Sold This Month: 89 leads" (blue bar)
  - "Rejected This Month: 4 leads" (red bar, small)
- Horizontal stacked bar or vertical bars showing proportions
- "Review Pending Leads →" link → `/admin/leads/review`

#### ROW 5 — Top Performers

**Left panel: Top Providers (50% width)**
- Title: "Top Providers This Month"
- Ranked list (top 5):
  - Rank #, Provider company name, Leads Sold count, Revenue Generated, Approval Rate %
  - e.g. "#1 LeadGen Pro — 34 sold — $2,720 — 98% approval"
- "View All Providers →" link

**Right panel: Top Buyers (50% width)**
- Title: "Top Buyers This Month"
- Ranked list (top 5):
  - Rank #, Buyer name (dealer name or user name), Leads Purchased count, Total Spent, Tier badge
  - e.g. "#1 Toronto Auto Group — 18 leads — $1,530 — ELITE"
- "View All Users →" link

#### ROW 6 — Quick Admin Actions

**Action cards:**
- **"Review Pending Users"** → `/admin/users?status=pending`
- **"Review Pending Leads"** → `/admin/leads/review`
- **"Add Lead Manually"** → `/admin/leads/new`
- **"Process Payouts"** → `/admin/payouts`
- **"View Failed Deliveries"** → `/admin/delivery-logs?status=failed`
- **"Platform Settings"** → `/admin/settings`

---

### ADMIN — OTHER PAGES (Summary)

**User Management** (`/admin/users`):
- Tabbed view or role filter: All Users / Normal Users / Dealers / Providers
- Table: Name/Company, Email, Role badge, Status badge, Tier (buyers only), Wallet Balance (buyers only), Total Leads Listed (providers only), Joined Date
- Search + filter by role, status
- Click user → full detail page with role-specific info:
  - Normal User: profile, purchases, wallet history
  - Dealer: profile, subscription, purchases, wallet, delivery logs, webhook config
  - Provider: profile, leads listed, earnings, payout history, commission rate
- Action buttons per role per status (approve/reject/suspend/reactivate)
- Admin can adjust commission rate per provider
- Admin can issue wallet credits/refunds to any buyer

**Lead Review Queue** (`/admin/leads/review`):
- Table of all leads with `review_status = 'pending_review'`
- Columns: Reference, Provider Name, Initials, Buyer Type, Credit Range, AI Score, Quality Grade (suggested), Price (suggested), Submitted Date
- Click lead → full lead detail view:
  - All lead data submitted by provider
  - Document previews/downloads
  - Admin can: adjust price, adjust quality grade, adjust AI score, add review notes
  - Action buttons: "Approve" (green), "Reject" (red, opens reason input), "Request Changes" (amber, opens notes input)
- On approve: lead goes live, `approved_at = now()`, tier timers start, provider notified
- On reject: provider notified with reason, can edit and resubmit

**All Leads** (`/admin/leads`):
- All leads across all providers + admin-created leads
- Full CRUD: create, edit, delete, mark sold/unsold
- Shows who listed each lead (provider name or "Admin")
- Filter by: provider, status, quality, location, date

**Add Lead** (`/admin/leads/new`):
- Same form as provider, but admin-created leads skip review — go live immediately
- `listed_by_role = "admin"`, `review_status = "approved"`, `approved_at = now()`

**Transactions** (`/admin/transactions`):
- All wallet transactions across all buyers
- Summary cards: total top-ups, total purchases, total refunds this month
- Full table with dealer/user name, type, amount, description, date
- Export CSV

**Subscriptions** (`/admin/subscriptions`):
- All active subscriptions
- Columns: Dealer Name, Tier, Price, Status, Start Date, Next Billing, Auto-Renew
- Admin can cancel or change tier for any dealer

**Provider Payouts** (`/admin/payouts`):
- Pending payout requests from providers
- Table: Provider Name, Amount Requested, Leads Included, Requested Date, Status (Pending/Processing/Paid)
- Click → detail with line-item breakdown (which leads are included)
- Action buttons: "Approve & Process" (marks as paid, decrements provider's pending_payout), "Reject" (with reason)
- Payout history tab: all past payouts with dates and amounts

**Delivery Logs** (`/admin/delivery-logs`):
- All delivery attempts across all purchases
- Table: Date, Purchase Ref, Buyer Name, Channel badge, Endpoint, Response Code, Status badge, Error Details
- Filter by: channel, status, buyer, date
- "Re-trigger Delivery" button on failed entries
- Alert banner for recent failures

**Platform Settings** (`/admin/settings`):
- **Subscription Tiers:** editable table — tier name, price, delay hours, description
- **Commission:** default platform commission rate (applies to new providers), ability to override per provider
- **Lead Settings:** default price range, reference code prefix ("MLH"), auto-increment number
- **Email Templates:** preview and customize templates for: welcome, approval, rejection, lead delivery, purchase confirmation, payout processed
- **Notifications:** admin notification email addresses, what events trigger admin emails
- **Platform Maintenance:** ability to toggle marketplace on/off (maintenance mode)

---
---

## ROLE-BASED ACCESS MATRIX (SUMMARY)

| Feature / Page | Normal User | Dealer | Provider | Admin |
|---|---|---|---|---|
| Registration | Simple form, auto-approved | Multi-step, needs approval | Company form, needs approval | Created manually |
| Marketplace (browse leads) | ✅ Basic tier only | ✅ Any tier | ❌ | ✅ (view only, for monitoring) |
| Buy single lead | ✅ | ✅ | ❌ | ❌ |
| Buy batch leads | ❌ | ✅ | ❌ | ❌ |
| Wallet / Add Funds | ✅ | ✅ | ❌ | ❌ (but can adjust others) |
| Subscription tiers | Basic only | All 4 tiers | ❌ | Manages for dealers |
| Upgrade Plan page | ❌ | ✅ | ❌ | ❌ |
| Purchase history | ✅ (own) | ✅ (own) | ❌ | ✅ (all) |
| Webhook / CRM config | ❌ | ✅ | ❌ | ❌ |
| Lead delivery via webhook | ❌ (email only) | ✅ | ❌ | ❌ |
| List / create leads | ❌ | ❌ | ✅ (with review) | ✅ (no review needed) |
| Bulk import leads | ❌ | ❌ | ✅ | ✅ |
| View own lead status | ❌ | ❌ | ✅ | ✅ (all) |
| Earnings / payouts | ❌ | ❌ | ✅ (own) | ✅ (all, process payouts) |
| Analytics | ❌ | ❌ | ✅ (own leads) | ✅ (platform-wide) |
| Approve/reject users | ❌ | ❌ | ❌ | ✅ |
| Approve/reject leads | ❌ | ❌ | ❌ | ✅ |
| Manage subscriptions | ❌ | Own only | ❌ | ✅ (all) |
| Platform settings | ❌ | ❌ | ❌ | ✅ |

---

## BUILD ORDER FOR DASHBOARDS

1. **Profiles table + role field + auth routing** — foundation for all dashboards
2. **Admin dashboard + admin sidebar nav** — build admin first so you can manage test data
3. **Admin user management** — approve/reject test users
4. **Provider dashboard + provider nav** — sellers need to list leads
5. **Provider "Add Lead" + "My Leads" pages** — lead supply pipeline
6. **Admin lead review queue** — approval workflow for provider leads
7. **Dealer dashboard + dealer nav** — premium buyer experience
8. **Normal User dashboard + simplified nav** — basic buyer experience
9. **Role-based marketplace feature toggling** — batch buy, upgrade CTAs, webhook config differences
10. **Provider earnings + admin payouts** — financial tracking
11. **Admin financial dashboards** — revenue, transactions, subscriptions
12. **Provider analytics page** — performance insights
13. **All settings pages per role** — profile, notifications, security, payouts
