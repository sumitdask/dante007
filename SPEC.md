# SPEC.md — 3 Portfolio Case Studies Implementation Specification

## Status: FINALIZED

---

## 1. Executive Summary & Objective
Extend the existing portfolio with 3 comprehensive, high-conversion case studies built strictly from the source material in `Content/` and styled with pixel-perfection to match `Case study Page Design for Google Ads.html`.

The three projects are:
1. **Smart MOT (Stoke-on-Trent, UK)**: Type A • Fresh Account Setup. 2,211 Phone Calls in 7 Months, slashing cost per call from £7 to under £4.
2. **Sillett Tyres (Aberdeen, UK)**: Type A • Fresh Account Setup & Scale. 552 Phone Calls in a month from £40/day start, growing daily budget to £161 across 5 campaigns with cost per conversion falling to £4.39.
3. **Xpress Tyres (Manchester, UK)**: Type B • Existing Account Scaled. 665 Conversions in September 2026 across 4 campaigns with daily budget scaled to £150.

---

## 2. Source Repositories & Reference Documents
- **Portfolio Root**: `C:\Users\sumit\OneDrive\Documents\New-Sumit-Project\Resume-portfolio`
- **Main Portfolio File**: `index.html`, `style.css`, `script.js`
- **Design System Benchmark**: `Case study Page Design for Google Ads.html` (identical content/structure benchmark to Smart MOT)
- **Source Folders**:
  - `Content/Smart MOT`
  - `Content/Sillet tyres`
  - `Content/Xpress tyres`

---

## 3. Design System & Component Guidelines
Matching `Case study Page Design for Google Ads.html`:
- **Typography**: Google Font `Plus Jakarta Sans` (weights 300 to 900), sans-serif.
- **Color Palette**:
  - Brand Orange: `#FF5722`
  - Brand Orange Hover: `#E64A19`
  - Brand Peach: `#FFF5EE`
  - Brand Peach Card: `#FEF7F2`
  - Brand Peach Border: `#FEE4D7`
  - Brand Dark: `#111827`
  - Muted: `#6B7280`
  - Success / Green: `#059669` / `text-emerald-600` / `bg-emerald-50`
- **Styling Architecture**:
  - Tailwind CSS CDN (`<script src="https://cdn.tailwindcss.com"></script>`) with matching inline config.
  - Page-specific custom styles: `.headline-bar`, `.gallery-slider-viewport`, `.gallery-slider-track`, `.gallery-slide`, `.card-preview-area`, `.zoom-proof-badge`, `.filter-pill`, `.slider-dot`, `.fallback-canvas`.
- **Page Structure Hierarchy**:
  1. Header / Sticky Top Navigation (`SKD.` logo, anchor links, "Let's Talk" CTA)
  2. Breadcrumb ("← Back to Selected Work" -> `index.html#work`)
  3. Case Study Title Block (Badge, H1 with orange accent, Lede paragraph)
  4. 01 Snapshot (Card container, metadata table, 3 Big Numbers)
  5. 02 Starting Point (Day 0) & 03 Goal (Two-column layout / table)
  6. 04 Research and Strategy (Grid of 4 cards)
  7. 05 Setup and Build (Structured cards: architecture, tracking, landing page, capital allocation)
  8. 06 Launch and Learning Phase (3 cards: observation, pivot, stabilization)
  9. 07 Results (Comparison table, campaign breakdown table, dark theme live performance dashboard)
  10. 08 Key Learnings (What worked, what did not, what to do next)
  11. 09 Tools Used (Grid of tool badges with logos/text)
  12. 10 Visual Proof & Campaign Gallery (Filterable category pills, responsive carousel slider [1 mobile / 2 tablet / 3 desktop], zoom proof badge, image fallback canvas)
  13. 11 Next Steps & Call to Action (Peach background, direct mailto and back-to-work CTAs)
  14. Lightbox / Proof Modal (High-res asset preview, zoom, description, mailto CTA)
  15. Footer (Contact details, social links, copyright)
  16. Standalone JavaScript (Slider state, touch swipe support, category filtering, lightbox modal)

---

## 4. Content Mapping & Strict No-Fabrication Policy
- All metrics (calls, spend, CPA, CPC, conversion rate, campaign names, dates, geolocations) must be 100% faithful to the source HTML/tables in `Content/`.
- No manufactured claims, no hypothetical tools, no fake statistics.
- Genuine images from each project folder to be copied to dedicated directories under `assets/images/`:
  - `assets/images/case-study-mot/`
  - `assets/images/case-study-sillet/`
  - `assets/images/case-study-xpress/`

---

## 5. Output File Architecture
1. `google-ads-mot-garage-stoke-on-trent.html` (Case Study 1: Smart MOT)
2. `google-ads-sillet-tyres-aberdeen.html` (Case Study 2: Sillett Tyres)
3. `google-ads-xpress-tyres-manchester.html` (Case Study 3: Xpress Tyres)
4. Portfolio integration in `index.html`:
   - Card 1: Sillett Tyres (or Xpress Tyres) -> links to case study
   - Card 2: Smart MOT -> links to `google-ads-mot-garage-stoke-on-trent.html`
   - Card 3: Xpress Tyres (or Sillett Tyres) -> links to case study
   - "View All Projects" / cross-links updated cleanly.

---

## 6. Verification & QA Standards
- Multi-device responsive verification (Desktop 1280px+, Tablet 768px, Mobile 375px/414px).
- Functional verification: No console errors, active modal lightbox, working filters, responsive sliders, working touch swipes.
- Link audit: Zero broken internal/external links, correct relative paths.
- Content audit: 100% correspondence with source content.
