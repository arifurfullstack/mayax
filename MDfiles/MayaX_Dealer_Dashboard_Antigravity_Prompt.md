# MAYAX LEAD HUB — DEALER DASHBOARD BUILD PROMPT FOR ANTIGRAVITY

---

## WHAT TO BUILD

Build the complete **Dealer User Dashboard** for MayaX Lead Hub. This is the main interface a dealer sees after logging in. The design must follow a **dark, futuristic, premium automotive theme** with glassmorphism effects, neon glow accents, and smooth animations.

Use GSAP (GreenSock Animation Platform) for page load animations, scroll animations, counter animations, and hover micro-interactions.

---

## GLOBAL DESIGN SYSTEM (APPLY TO EVERY PAGE)

### Theme: Dark Futuristic Automotive

The entire app uses a **dark space/night theme** inspired by a premium car showroom at night — dark backgrounds with neon lighting, glass panels, and cinematic depth.

### Background
- Main background color: `#0a0e1a` (very dark navy/space black)
- Add a subtle background effect: a blurred dark cityscape with rain or car lights (use a dark gradient overlay on top if using a background image, or use a pure CSS gradient)
- CSS gradient fallback: `radial-gradient(ellipse at 20% 50%, rgba(20, 30, 80, 0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(100, 0, 150, 0.15) 0%, transparent 50%), #0a0e1a`
- Subtle animated particles or floating light dots in the background (optional, use GSAP or CSS animation)

### Glassmorphism Cards
Every card, panel, and container uses glassmorphism:
```css
background: rgba(15, 20, 45, 0.6);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid rgba(100, 150, 255, 0.1);
border-radius: 16px;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
```

### Neon Glow Effects
- Cyan glow: `0 0 20px rgba(0, 212, 255, 0.3)` — used for active states, primary buttons, highlights
- Purple glow: `0 0 20px rgba(168, 85, 247, 0.3)` — used for premium/VIP elements
- Gold glow: `0 0 20px rgba(245, 197, 66, 0.3)` — used for VIP badge and gold accents
- Green glow: `0 0 15px rgba(16, 185, 129, 0.3)` — used for success states
- Pink/magenta glow: `0 0 20px rgba(236, 72, 153, 0.3)` — used for alerts or special highlights

### Color Palette
```
Primary background:     #0a0e1a
Card background:         rgba(15, 20, 45, 0.6)
Sidebar background:      rgba(10, 14, 30, 0.95)
Border default:          rgba(100, 150, 255, 0.1)
Border glow (hover):     rgba(0, 212, 255, 0.3)

Text primary:            #e8ecf4 (white-ish)
Text secondary:          #8892a8 (muted gray-blue)
Text muted:              #5a6580 (dim)

Accent cyan:             #00d4ff
Accent purple:           #a855f7
Accent pink:             #ec4899
Accent gold:             #f5c542
Accent green:            #10b981
Accent red:              #ef4444
Accent blue:             #3b82f6

Gradient button:         linear-gradient(135deg, #0077ff 0%, #00d4ff 50%, #00ffb3 100%)
VIP badge gradient:      linear-gradient(135deg, #f5c542, #ff9500)
```

### Typography
- Primary font: `'Outfit', sans-serif` — import from Google Fonts
- Fallback: `'Inter', system-ui, sans-serif`
- Headings: Outfit Bold/SemiBold
- Body text: Outfit Regular/Light
- Numbers/stats: Outfit Bold with slightly larger size for impact
- Load from: `https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap`

### GSAP Animations (Import from CDN)
Import GSAP: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
Import ScrollTrigger: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`

Use GSAP for:
1. **Page load** — Stagger fade-in + slide-up for all cards (0.1s delay between each)
2. **Number counters** — Animate from 0 to final value when cards appear (wallet balance, lead counts, revenue)
3. **Sidebar** — Slide in from left on page load (0.5s, ease: power3.out)
4. **Cards hover** — Scale up slightly (1.02) with enhanced glow border on hover
5. **Chart bars** — Animate height from 0 to value on load
6. **Table rows** — Stagger fade in from left (0.05s between rows)
7. **Progress bars** — Animate width from 0% to target% on load

---

## PAGE STRUCTURE

### TOP NAVIGATION BAR (Full Width, Fixed Top)

Dark semi-transparent bar across the full width of the screen.

```
Background: rgba(10, 14, 30, 0.9)
Backdrop-filter: blur(15px)
Border-bottom: 1px solid rgba(100, 150, 255, 0.08)
Height: ~64px
Padding: 0 24px
Position: fixed top
Z-index: 50
```

**Layout (left to right):**

1. **Logo area (far left):**
   - MayaX logo — the "MX" icon is a stylized interlocking M and X shape with a gradient fill (purple `#a855f7` to cyan `#00d4ff` to teal `#00ffb3`)
   - Next to icon: "MayaX" text — "Maya" in white bold, "X" in cyan bold
   - Use an SVG or styled text. The "X" should pop with cyan color `#00d4ff`

2. **Center nav links:**
   - 📊 Dashboard
   - 🔍 Leads Marketplace
   - 📦 Orders
   - 💰 Wallet Balance $750.00 ✓ (green checkmark)
   - Each link: icon + text, white text `#e8ecf4`, ~14px, spaced ~32px apart
   - Active link: cyan color `#00d4ff` with subtle underline glow
   - Hover: text color transitions to cyan

3. **Right side:**
   - VIP badge: small rounded pill — gold gradient background, white text "VIP", with a small ⚡ icon
   - Dealer name: "John's Auto Group" in white text
   - Small avatar circle (photo or initials)
   - Dropdown chevron ▾

**GSAP:** Fade in from top on page load (0.3s delay).

---

### LEFT SIDEBAR (Fixed, Below Top Nav)

Fixed left sidebar, full height minus top nav.

```
Width: 240px
Background: rgba(10, 14, 30, 0.95)
Border-right: 1px solid rgba(100, 150, 255, 0.08)
Padding: 24px 16px
Position: fixed left
Top: 64px (below nav)
Height: calc(100vh - 64px)
```

**Sidebar menu items (top to bottom):**

Each item is a row with icon + label:

1. 👤 Account Overview
2. 📊 Dashboard ← **Active item** (highlighted)
3. 🔍 Leads Marketplace
4. 📦 Orders
5. 💰 Wallet
6. ⭐ Subscription
7. ⚙️ Account Settings

**Styling:**
- Default: text `#8892a8`, icon same color, padding 12px 16px, border-radius 10px
- Active item: background `rgba(0, 212, 255, 0.1)`, text `#00d4ff`, left border 3px solid `#00d4ff`, subtle cyan glow
- Hover (non-active): background `rgba(255, 255, 255, 0.03)`, text lightens to `#c0c8d8`
- Transition: all 0.2s ease

**Bottom of sidebar — Wallet Balance section:**
```
Label: "Wallet Balance" (small gray text #8892a8)
Amount: "$ 750.00" (large white bold text, ~24px, Outfit Bold)
Button: "+ Add Funds" — small button, outlined with cyan border, cyan text, rounded
         On hover: filled cyan background, dark text
```

**GSAP:** Sidebar slides in from left (x: -240 → 0, duration: 0.5s, ease: power3.out). Menu items stagger fade in (0.05s between each).

---

### MAIN CONTENT AREA

```
Margin-left: 240px (sidebar width)
Margin-top: 64px (nav height)
Padding: 32px
Min-height: calc(100vh - 64px)
Background: transparent (shows main background)
```

---

## DASHBOARD PAGE CONTENT (`/dashboard`)

### SECTION 1: Welcome Header

**Left-aligned text:**
- "Welcome back, John 👋" — large heading, white, Outfit SemiBold, 28px
- "Here's what's happening with your leads today." — subtitle, gray text `#8892a8`, 16px

**Right side (same row):**
- Today's date: "Saturday, April 5, 2026" — small text, muted

**GSAP:** Fade in + slide up from y: 30, duration 0.6s.

---

### SECTION 2: Summary Metric Cards (4 Cards in a Row)

Four glassmorphism cards in a horizontal row with equal width. Each card has:
- An icon (top-left, inside a small colored circle with glow)
- Label text (small, gray)
- Large number (big, white, bold — animate with GSAP counter from 0)
- Trend indicator (small text with arrow, colored green for up, red for down)

**Card 1: Wallet Balance**
- Icon: 💰 in cyan circle
- Label: "Wallet Balance"
- Number: "$750.00" (animate counting up from $0)
- Sub text: "Last top-up: $250 on Mar 28"
- Border: subtle cyan glow on hover

**Card 2: Leads Purchased**
- Icon: 📦 in green circle
- Label: "Leads Purchased"
- Number: "847" (animate counting up from 0)
- Trend: "↑ +56 this month" (green text)
- Border: subtle green glow on hover

**Card 3: Available Leads**
- Icon: 🔍 in purple circle
- Label: "Available Leads"
- Number: "156" (animate counting)
- Trend: "23 unlocking in 6h" (amber text, creates urgency)
- Border: subtle purple glow on hover

**Card 4: Subscription Tier**
- Icon: ⚡ in gold circle
- Label: "Current Plan"
- Value: "VIP" in gold text with gold glow, Outfit Bold 24px
- Sub text: "Instant access · 1000 leads/mo"
- Border: gold glow on hover
- Small "Manage →" link in cyan

**Card styling:**
```css
.metric-card {
  background: rgba(15, 20, 45, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(100, 150, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
}
.metric-card:hover {
  border-color: rgba(0, 212, 255, 0.3);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.1);
  transform: translateY(-2px);
}
```

**GSAP:** All 4 cards stagger in from below (y: 40 → 0, opacity: 0 → 1, stagger: 0.1s, duration: 0.6s, ease: power3.out). Number counters animate simultaneously.

---

### SECTION 3: Stats Bar (Matching Marketplace Screenshot)

A single wide glassmorphism bar spanning full content width. Shows 4 inline stats with icons, matching the marketplace screenshot style.

```
Background: rgba(15, 20, 45, 0.5)
Border: 1px solid rgba(100, 150, 255, 0.1)
Border-radius: 12px
Padding: 16px 32px
Display: flex, justify-content: space-around
```

**Stats:**
- 🎯 **Total Leads: 847** — cyan colored number
- ⚡ **New Leads: 56** — green colored number
- 💰 **Average Income: $7,500** — gold colored number
- ✅ **Trusted Buyers: 98%** — green colored number

Each stat: icon + label in gray + number in colored bold text.

**GSAP:** Slide up + fade in, 0.2s after metric cards. Numbers count up.

---

### SECTION 4: Two-Column Layout — Spending Chart (Left) + Delivery Health (Right)

Two panels side by side (60% / 40% split).

#### LEFT: Weekly Spending Chart (60%)

Glassmorphism card.

**Header row:**
- Title: "Spending Overview" — white, Outfit SemiBold, 18px
- Right side: Period selector pills — "7D" / "30D" / "90D" — small pills, active one has cyan background

**Chart area:**
- Vertical bar chart showing 7 days (Mon-Sun)
- Bars are rounded-top rectangles
- Bar fill: gradient from `#0077ff` (bottom) to `#00d4ff` (top)
- On hover: bar brightens, shows tooltip with exact amount
- Y-axis labels on left (dollar amounts, gray text)
- X-axis labels at bottom (day names, gray text)
- Grid lines: very subtle `rgba(255,255,255,0.03)` horizontal lines

**Build the chart with pure HTML/CSS divs** (no chart library needed for a simple bar chart):
```
Each bar: a div with height proportional to value, max-height ~200px
Bar container: display flex, align-items: flex-end, gap: 12px
```

**Below chart — summary stats row:**
- "Total spent: $3,480.00" — white text
- "Avg per lead: $8.65" — gray text
- "Most active: Thursday" — gray text

**GSAP:** Bar heights animate from 0 to target (duration: 0.8s, stagger: 0.1s, ease: power2.out). Card fades in.

#### RIGHT: Delivery Health Panel (40%)

Glassmorphism card.

**Header:** "Delivery Health" — white, 18px

**Status summary — 3 badges in a row:**
- "✅ 142 Delivered" — green badge background `rgba(16, 185, 129, 0.15)`, green text
- "⏳ 3 Pending" — amber badge
- "❌ 2 Failed" — red badge

**Circular progress ring (centered):**
- Large circular SVG ring showing delivery success rate
- 97% — large white number in center
- Ring color: gradient cyan to green
- Unfilled portion: dark `rgba(255,255,255,0.05)`
- Label below ring: "Delivery Success Rate"

**GSAP:** Ring animates stroke-dashoffset from full to target (simulating the ring filling up). Duration: 1.2s, ease: power2.out.

**Below ring — last 3 delivery statuses:**
- "MLH-2084 → Email → ✅ Delivered — 7 min ago"
- "MLH-2081 → Webhook → ✅ Delivered — 5 min ago"
- "MLH-2079 → Webhook → ❌ Failed — 7 min ago" (red text)
- Each: small row with reference, channel icon, status badge, time

**If any failures:** Show small alert bar at bottom: "⚠️ 2 deliveries failed. Check webhook settings →" — amber background, link to settings.

---

### SECTION 5: Recent Purchases Table (Full Width)

Full-width glassmorphism card.

**Header row:**
- Title: "Recent Purchases" — white, 18px
- Right: "View All →" link in cyan
- Right: tabs/pills — "All" / "Delivered" / "Pending" / "Failed"

**Table styling (matching the marketplace screenshot):**
```css
Table background: transparent
Header row: text #5a6580, uppercase, small (12px), letter-spacing 1px
Body rows: background rgba(15, 20, 45, 0.3), border-bottom 1px solid rgba(100, 150, 255, 0.05)
Row hover: background rgba(0, 212, 255, 0.05), border-left 2px solid #00d4ff
Text: #e8ecf4
```

**Columns:**
| Type of Lead | Contact Information | Vehicle | Price | Time | Status | Action |
|---|---|---|---|---|---|---|

**For each row:**
- **Type of Lead:** Green badge "Verified · Auto Loan" (matching marketplace screenshot badge style — green background, white text, rounded)
- **Contact Information:** Name (bold white), phone number (gray, with 📞 icon), email (gray, with ✉️ icon) — stacked vertically
- **Vehicle:** Vehicle name (white), below it: mileage · income · credit score (small gray text with icons)
- **Price:** "$8.75" in white bold with green checkmark ✓
- **Time:** "7 minutes ago" in gray text
- **Status:** Badge — "Delivered" (green), "Pending" (amber), "Failed" (red)
- **Action:** "View Details" button — small outlined cyan button

**Pagination at bottom:**
- "< 1 2 3 4 ... 25 >" — page numbers, active page has cyan background
- "1-25 of 647" text on left
- "Filter: page: 25 ▾" dropdown on right

**GSAP:** Table rows stagger in from left (x: -20 → 0, opacity: 0 → 1, stagger: 0.05s, duration: 0.4s).

---

### SECTION 6: Two-Column — Subscription Info (Left) + Quick Actions (Right)

#### LEFT: Subscription Card (50%)

Glassmorphism card with a special **gold/amber glow border** (since dealer is VIP).

**Content:**
- Top badge: "MOST POPULAR" — small gold badge (matching subscription page screenshot)
- Tier name: "VIP" — large gold text with gold glow, Outfit Bold 36px
- ⚡ "Instant access" — gold text with lightning icon
- Price: "$1,799/mo" — large white text
- Features list (with cyan checkmarks ✓):
  - ✓ Instant access to leads
  - ✓ Priority placement
  - ✓ 1000 Leads / mo
  - ✓ Webhook + Email delivery
  - ✓ Priority support
- "Manage Subscription →" button — outlined gold border, gold text
- Bottom text: "Renews Apr 15, 2026 · Visa ending 4242" (small gray)

**Card border:** Animated gradient border — gold to amber, subtle pulse glow animation.

```css
border: 1px solid rgba(245, 197, 66, 0.3);
box-shadow: 0 0 30px rgba(245, 197, 66, 0.1), inset 0 0 30px rgba(245, 197, 66, 0.03);
```

#### RIGHT: Quick Actions Grid (50%)

Glassmorphism card.

**Title:** "Quick Actions" — white, 18px

**2x2 grid of action buttons:**

Each action is a small glassmorphism card with:
- Icon (large, colored)
- Label (white, bold, 14px)
- Description (gray, 12px)
- Full card is clickable with hover glow

1. **🔍 Browse Marketplace** — "Find and buy verified leads" — cyan icon glow
2. **💰 Add Funds** — "Top up your wallet balance" — green icon glow
3. **📦 View Orders** — "Track your purchased leads" — purple icon glow
4. **⚙️ Webhook Settings** — "Configure CRM delivery" — amber icon glow

**On hover:** Card scales up 1.03, border glows with the respective icon color.

**GSAP:** Grid items stagger in (0.1s each), scale from 0.9 → 1 + fade.

---

### SECTION 7: Leads Unlocking Soon (Full Width)

Glassmorphism card creating urgency.

**Header:**
- Title: "🔥 Leads Unlocking Soon" — white, 18px
- Sub: "These leads will become available for your tier shortly" — gray

**Horizontal scrollable row of 4-5 small lead preview cards:**

Each mini-card:
```
Background: rgba(15, 20, 45, 0.5)
Border: 1px solid rgba(245, 197, 66, 0.15)
Border-radius: 12px
Padding: 16px
Width: ~220px
```

Content per mini-card:
- Quality badge: "A+" in gold or "A" in blue (top-left)
- Initials: "MG" in a small colored circle
- Buyer type: "Online Buyer" — small gray text
- Credit range: "684-710"
- Price: "$8.75"
- Timer: "⏰ Unlocks in 2h 15m" — amber text, countdown animation
- Since dealer is VIP they have instant access, so for VIP show: "✅ Available Now" instead

**GSAP:** Cards slide in from right (x: 40 → 0, stagger: 0.1s). Timer numbers pulse subtly.

---

## SIDEBAR WALLET SECTION — SPECIAL TREATMENT

At the bottom of the left sidebar, the wallet section should be a mini glassmorphism card:

```
Background: rgba(0, 212, 255, 0.05)
Border: 1px solid rgba(0, 212, 255, 0.15)
Border-radius: 12px
Padding: 16px
Margin: 16px
```

- "Wallet Balance" label — small gray text, 12px
- "$750.00" — large white bold, 22px, Outfit Bold
- Subtle green dot or checkmark next to balance (indicating active/funded)
- "+ Add Funds" button — small, full width, outlined cyan border, cyan text, rounded 8px, hover fills with cyan

This wallet section ALSO appears at the very bottom of the sidebar below the settings link, matching the screenshot.

---

## RESPONSIVE BEHAVIOR

**Desktop (>1280px):** Full sidebar + full top nav + 4-column metric cards
**Tablet (768-1280px):** Sidebar collapses to icons only (60px width), metric cards become 2 columns
**Mobile (<768px):** Sidebar becomes a bottom tab bar or hamburger drawer, metric cards stack single column, table becomes horizontally scrollable

---

## GSAP ANIMATION SUMMARY

On page load, animate in this sequence:

1. **0.0s** — Top nav fades in from top (y: -20 → 0, opacity)
2. **0.2s** — Sidebar slides in from left (x: -240 → 0)
3. **0.3s** — Sidebar menu items stagger in (0.05s each)
4. **0.4s** — Welcome header fades in (y: 30 → 0)
5. **0.5s** — 4 metric cards stagger up (y: 40 → 0, 0.1s stagger)
6. **0.6s** — Number counters start counting up (duration 1.5s)
7. **0.8s** — Stats bar slides up
8. **0.9s** — Chart + Delivery panels fade in side by side
9. **1.0s** — Chart bars animate height (0.8s, 0.1s stagger)
10. **1.0s** — Delivery ring animates fill (1.2s)
11. **1.2s** — Recent purchases table rows stagger in (0.05s each)
12. **1.5s** — Subscription card + Quick actions stagger in
13. **1.7s** — Unlocking soon cards slide in from right

**Hover animations (always active):**
- Cards: translateY(-2px), border glow enhancement, shadow increase (0.3s ease)
- Buttons: background fill transition, subtle scale(1.02) (0.2s ease)
- Table rows: background highlight, left border appears (0.2s ease)
- Sidebar items: background and text color transition (0.2s ease)

**GSAP implementation hint:**
```javascript
// Page load orchestration
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

tl.from(".top-nav", { y: -20, opacity: 0, duration: 0.5 })
  .from(".sidebar", { x: -240, opacity: 0, duration: 0.5 }, 0.2)
  .from(".sidebar-item", { x: -20, opacity: 0, stagger: 0.05, duration: 0.3 }, 0.3)
  .from(".welcome-header", { y: 30, opacity: 0, duration: 0.5 }, 0.4)
  .from(".metric-card", { y: 40, opacity: 0, stagger: 0.1, duration: 0.6 }, 0.5)
  .from(".stats-bar", { y: 20, opacity: 0, duration: 0.5 }, 0.8)
  .from(".chart-panel", { y: 30, opacity: 0, duration: 0.6 }, 0.9)
  .from(".delivery-panel", { y: 30, opacity: 0, duration: 0.6 }, 0.9)
  .from(".chart-bar", { scaleY: 0, stagger: 0.1, duration: 0.8, transformOrigin: "bottom" }, 1.0)
  .from(".table-row", { x: -20, opacity: 0, stagger: 0.05, duration: 0.4 }, 1.2)
  .from(".subscription-card", { y: 30, opacity: 0, duration: 0.6 }, 1.5)
  .from(".quick-action", { scale: 0.9, opacity: 0, stagger: 0.1, duration: 0.5 }, 1.5)
  .from(".unlock-card", { x: 40, opacity: 0, stagger: 0.1, duration: 0.5 }, 1.7);

// Counter animation
gsap.utils.toArray(".counter-number").forEach(el => {
  const target = parseFloat(el.dataset.target);
  gsap.from(el, {
    textContent: 0,
    duration: 1.5,
    delay: 0.6,
    ease: "power2.out",
    snap: { textContent: el.dataset.decimal ? 0.01 : 1 },
  });
});
```

---

## IMPORTANT NOTES FOR ANTIGRAVITY

1. **This is the DEALER role dashboard only.** Normal Users, Providers, and Admins have completely different dashboards (to be built separately).

2. **Dark theme is mandatory.** There is no light mode. The entire app uses the dark space/automotive theme described above.

3. **GSAP must be loaded from CDN** — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`

4. **The sidebar wallet section appears twice** in the screenshots — once in the sidebar body and once fixed at the very bottom of the sidebar. Build both.

5. **All data shown is mock/sample data** for the dashboard. In production, this will come from Supabase queries, but for now hardcode the values shown above.

6. **The subscription tier pricing** from the screenshots is: Basic $249/mo, Pro $499/mo, Elite $999/mo, VIP $1799/mo. Use these exact prices.

7. **The subscription cards** on the subscription page have neon-colored glowing borders: Basic = green glow, Pro = purple glow, Elite = pink/magenta glow, VIP = gold glow. Each card has a different colored neon border effect.

8. **The top nav shows wallet balance** with a green checkmark: "Wallet Balance $750.00 ✓"

9. **VIP badge** in the top nav right side is a small gold pill with ⚡ icon and "VIP" text.

10. **The dealer name** "John's Auto Group" appears next to the VIP badge in the top nav with a small avatar circle and dropdown chevron.

11. **The marketplace** (from screenshot) uses a **table/list view** for leads — NOT card grid. Each row shows: lead type badge, full contact info (name, phone, email), vehicle + specs, price, time ago, and "Buy Lead" button. This is different from the earlier card-based design and should be built as an alternative marketplace view on the marketplace page.

12. **Font: Outfit** must be loaded from Google Fonts. It's used throughout the entire UI.

---

## FILE/COMPONENT STRUCTURE (Suggested)

```
src/
├── components/
│   ├── layout/
│   │   ├── TopNav.tsx           — Fixed top navigation bar
│   │   ├── Sidebar.tsx          — Left sidebar with menu + wallet
│   │   └── DashboardLayout.tsx  — Wraps TopNav + Sidebar + content area
│   ├── dashboard/
│   │   ├── WelcomeHeader.tsx    — Greeting + date
│   │   ├── MetricCards.tsx      — 4 summary cards with counters
│   │   ├── StatsBar.tsx         — Inline stats strip
│   │   ├── SpendingChart.tsx    — Weekly bar chart
│   │   ├── DeliveryHealth.tsx   — Ring chart + status list
│   │   ├── RecentPurchases.tsx  — Table with lead rows
│   │   ├── SubscriptionCard.tsx — Current plan card
│   │   ├── QuickActions.tsx     — 2x2 action grid
│   │   └── UnlockingSoon.tsx    — Horizontal scroll lead cards
│   └── shared/
│       ├── GlassCard.tsx        — Reusable glassmorphism container
│       ├── Badge.tsx            — Reusable colored badge (status, tier, type)
│       ├── GlowButton.tsx       — Button with gradient + glow
│       └── CounterNumber.tsx    — GSAP animated number component
├── hooks/
│   └── useGsapAnimation.ts     — Custom hook for GSAP page load timeline
├── styles/
│   └── globals.css              — CSS variables, base styles, glassmorphism utilities
└── pages/
    └── DealerDashboard.tsx      — Main dashboard page composing all sections
```

---

## BUILD THIS IN ORDER

1. Global styles (CSS variables, fonts, background, glassmorphism utility classes)
2. TopNav component
3. Sidebar component (with wallet section)
4. DashboardLayout (TopNav + Sidebar wrapper)
5. MetricCards with GSAP counter animations
6. StatsBar
7. SpendingChart (pure CSS/div bar chart with GSAP bar animations)
8. DeliveryHealth (SVG ring + status list)
9. RecentPurchases table (with GSAP row stagger)
10. SubscriptionCard (gold glow border for VIP)
11. QuickActions grid
12. UnlockingSoon horizontal scroll cards
13. WelcomeHeader
14. GSAP master timeline orchestrating all animations on page load
15. Responsive breakpoints
