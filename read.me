# Meridian Private Dashboard

A private wealth and portfolio intelligence web application built for **Meridian Private** clients, featuring real-time asset allocations, liquidity breakdowns, fee auditing, reading modes, and dedicated financial drill-downs.

---

## Technology Stack Overview

| Layer / Concern | Technology | Version | Key Responsibilities |
| :--- | :--- | :--- | :--- |
| **Core UI Framework** | **React** | `^19.0.1` | Component-based reactive UI architecture, state synchronization, and DOM lifecycle. |
| **Build System & Dev Server** | **Vite** | `^6.2.3` | Instant Hot Module Replacement, Rollup-based tree-shaking, and high-speed compilation. |
| **Type Safety & Language** | **TypeScript** | `~5.8.2` | Static typing for portfolio allocations, financial assets, fees, and application states. |
| **Styling & Design System** | **Tailwind CSS v4** | `^4.1.14` | Utility-first styling, dark/light theme switching, responsive layouts, and striped bar styling. |
| **Motion & Animation** | **Motion (`motion/react`)** | `^12.23.24` | Smooth declarative animations, SVG chart transitions, count-up numbers, and modal enter/exit states. |
| **Icon Systems** | **Iconify & Lucide** | `^6.0.2` / `^0.546.0` | High-fidelity vector iconography (Solar, Tabler, Phosphor, and Lucide icons). |
| **Charts & Visualizations** | **Mathematical SVG & Canvas** | *Native* | High-precision interactive donut charts, segmented arc geometries, and striped progress bars. |
| **Typography** | **Google Fonts (Instrument Sans)** | *Web Font* | Refined geometric sans-serif paired for high legibility in financial contexts. |
| **Client Storage** | **HTML5 Web Storage API** | *Native* | Local persistence for user credentials, theme preferences, and simple/expert reading modes. |

---

## Detailed Tech Stack Rationale: Why These Technologies Were Chosen

### 1. React 19 (`react`, `react-dom`)
* **What it is used for**:
  Powers the entire interactive user interface—from the persistent navigation sidebar and header down to multi-tier financial views (Overview, Liquidity, Fees, Global Stocks, Business Loans, Safer Loans, Cash) and reactive modals (Advisor, Audit, Settings, Onboarding).
* **Why chosen over alternatives**:
  * **vs. Angular**: React's lightweight, un-opinionated component model allows rapid UI assembly without heavy boilerplate, strict decorators, or rigid module configurations.
  * **vs. Vue**: React's TypeScript integration is deeper and more flexible for strongly typed financial data modeling, and has a wider library ecosystem for enterprise fintech applications.
  * **vs. Vanilla JavaScript**: Managing complex nested state (like switching between Simple/Expert mode, toggling dark mode, expandable table rows, and multi-layered breadcrumbs) with pure DOM manipulation would lead to error-prone imperative spaghetti code.

---

### 2. Vite 6 (`vite`, `@vitejs/plugin-react`)
* **What it is used for**:
  Serves the development environment via native ES modules and bundles production assets using Rollup with aggressive code splitting and minification.
* **Why chosen over alternatives**:
  * **vs. Webpack / Create React App (CRA)**: Webpack must re-bundle entire dependency graphs on code changes, causing noticeable lag. Vite utilizes `esbuild` under the hood for near-instant cold starts (<300ms) and HMR. Create React App is also officially deprecated.
  * **vs. Next.js / Remix**: Since the application is configured as a high-performance client-side Single Page Application (SPA) without requiring Node.js SSR infrastructure, Vite provides the fastest build times with zero server runtime overhead.

---

### 3. TypeScript 5.8 (`typescript`)
* **What it is used for**:
  Guarantees type consistency across complex financial structures—such as `HoldingItem`, `AllocationRow`, `DonutSegment`, `SaferLoanItem`, and `CashItem`—ensuring all numerical calculations, formatted currencies, and percentage calculations remain bug-free.
* **Why chosen over alternatives**:
  * **vs. Plain JavaScript**: In a wealth management platform, accidental `undefined` access or string/number type mismatches can corrupt critical account balances and percentage weights. TypeScript catches these errors at compile-time.
  * **vs. Flow / JSDoc**: TypeScript is the universal industry standard with first-class IDE autocompletion, refactoring safety, and seamless integration with Vite.

---

### 4. Tailwind CSS v4 (`tailwindcss`, `@tailwindcss/vite`)
* **What it is used for**:
  Styles all application surfaces, spacing rhythms, micro-interactions, responsive grid layouts, and color tokens for both **Light Mode** and **Dark Mode** (`bg-slate-950`, `text-white`, `border-slate-800`).
* **Why chosen over alternatives**:
  * **vs. Component Libraries (MUI, Ant Design, Bootstrap)**: Heavy UI kits impose rigid default styling and bloated bundles that fight custom mockups. Tailwind enables 100% pixel-perfect adherence to custom design references.
  * **vs. CSS Modules / BEM**: Writing separate `.module.css` files results in context switching, duplicated rules, and bloated CSS files. Tailwind compiles only the classes actively referenced in the code, resulting in minimal CSS output.
  * **vs. CSS-in-JS (Styled-Components, Emotion)**: CSS-in-JS adds runtime JavaScript overhead and hydration costs on every render. Tailwind v4 generates pure, optimized static CSS at build-time.

---

### 5. Motion (`motion/react` v12)
* **What it is used for**:
  Orchestrates fluid layout transitions, animated SVG circular pie paths, striped allocation progress bars with ease-out timing curves, modal overlays, and number counting animations.
* **Why chosen over alternatives**:
  * **vs. GSAP**: GSAP requires manual DOM selection and imperative lifecycle management (`useEffect` cleanup). Motion natively integrates with React's component tree via `<motion.div>` and `<motion.path>`.
  * **vs. Plain CSS Animations**: Pure CSS cannot dynamically interpolate reactive values (such as changing percentages or pie arc dimensions) without verbose inline style computations.

---

### 6. Vector Iconography: Iconify & Lucide React
* **What it is used for**:
  Provides specialized financial icons (Solar Linear download icons, Phosphor, Tabler, and Lucide utility icons for chevrons, clocks, search, and advisory tools).
* **Why chosen over alternatives**:
  * **vs. FontAwesome / Glyphicons**: Web font icon sets require downloading entire multi-megabyte font files and can cause render-blocking or layout shifts.
  * **vs. Raw inline SVGs**: Hand-coding dozens of raw SVG paths clutters JSX and increases file sizes. Iconify loads SVG paths on-demand and bundles only the used glyphs.

---

### 7. Custom Mathematical SVG & Canvas for Charts
* **What it is used for**:
  The interactive 4-segment Donut/Pie Chart on the Liquidity view, customized with arc padding, hover radius expansion (`rOuter: 93` vs `88`), and center cutout circles.
* **Why chosen over alternatives**:
  * **vs. Chart.js / Recharts / Highcharts**: Off-the-shelf chart libraries often bring heavy bundle payloads (100kB+) and impose canvas clipping or rigid tooltip overlays that make exact visual alignment difficult. Custom trigonometric SVG functions (`Math.cos`, `Math.sin`, SVG `path` commands) give full control over geometry, stroke offsets, and theme responsiveness with zero external dependencies.

---

### 8. Native HTML5 Web Storage (`localStorage`)
* **What it is used for**:
  Persisting user session details, theme preference (`light` / `dark`), reading mode (`simple` / `expert`), and modal onboarding flags across page reloads.
* **Why chosen over alternatives**:
  * **vs. Cookies**: Cookies are automatically sent in every HTTP request header, increasing network overhead. LocalStorage stays purely client-side.
  * **vs. IndexedDB**: IndexedDB is asynchronous and overly complex for small configuration settings. LocalStorage provides synchronous, immediate availability during the very first React render.
