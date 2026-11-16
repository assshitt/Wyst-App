# WYST

Swap. Earn. Repeat. A points-based clothing swap for campus communities.

Built with Next.js (App Router) and plain CSS. No UI framework: the whole design
system lives in `src/app/globals.css`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (run this before you push)
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Landing page with the moving light background |
| `/browse` | Marketplace with search, filters and sorting |
| `/listing/[id]` | Item detail and swap request |
| `/upload` | Four-step listing flow |
| `/dashboard` | Overview |
| `/dashboard/wallet` | Points balance and history |
| `/dashboard/listings` | Your items |
| `/dashboard/swaps` | Incoming, outgoing and past swaps |
| `/dashboard/wishlist` | Saved items |
| `/dashboard/settings` | Profile and preferences |
| `/messages` | Chat |
| `/notifications` | Activity |
| `/how-it-works`, `/help`, `/about` | Guides, FAQ, trust and safety |
| `/terms`, `/privacy` | Legal |
| `/login`, `/signup` | Account |

On phones the same pages run as an app: a bottom tab bar with a raised
"list an item" button, sheet-style filters and a full-screen chat.

## Where things live

- `src/app/globals.css` — colours, type, components, responsive rules
- `src/components/` — shared UI (`SiteHeader`, `TabBar`, `ListingCard`, `Icon`, ...)
- `src/lib/listings.ts` — sample catalogue
- `src/lib/demo.ts` — sample activity for the demo account, points rules, FAQ
- `src/store/userStore.ts` — account, points, swaps, wishlist (saved in the browser)
- `public/hero/` — landing background video and its poster frame

## Preview build

Accounts are stored in the browser on the visitor's device. Nothing is sent to a
server yet, so any email and password will log in. Replace the store actions with
real API calls (for example Supabase) to go live.
